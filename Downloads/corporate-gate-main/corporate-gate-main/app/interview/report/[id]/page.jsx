"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Download, ArrowLeft, Loader2 } from "lucide-react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export default function InterviewReportPage() {
  const params = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchReport();
    }
  }, [params.id]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BACKEND_URL}/api/interview/session/${params.id}`
      );

      if (response.ok) {
        const data = await response.json();

        // If evaluation doesn't exist, trigger it
        if (!data.evaluation) {
          await triggerEvaluation();
        } else {
          setReport(formatReport(data));
        }
      } else {
        setError("Failed to load interview report");
      }
    } catch (err) {
      console.error("Error fetching report:", err);
      setError("Error loading report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const triggerEvaluation = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/interview/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: params.id }),
      });

      if (response.ok) {
        const data = await response.json();
        const sessionResponse = await fetch(
          `${BACKEND_URL}/api/interview/session/${params.id}`
        );
        const sessionData = await sessionResponse.json();
        setReport(formatReport(sessionData));
      } else {
        setError("Failed to generate evaluation");
      }
    } catch (err) {
      console.error("Error triggering evaluation:", err);
      setError("Error generating evaluation");
    }
  };

  const formatReport = (data) => {
    const evaluation = data.evaluation || {};

    return {
      id: data._id,
      company: data.company,
      role: data.role,
      mode: data.mode,
      tone: data.tone,
      difficulty: data.difficulty,
      summary: {
        overall: evaluation.overallScore || 0,
        dimensions: {
          communication: evaluation.dimensions?.communication || 0,
          technical: evaluation.dimensions?.technical || 0,
          problemSolving: evaluation.dimensions?.problemSolving || 0,
          culture: evaluation.dimensions?.cultureFit || 0,
        },
      },
      strengths: evaluation.strengths || [],
      weaknesses: evaluation.weaknesses || [],
      summaryText: evaluation.summary || "No evaluation available",
      breakdown: (data.answers || []).map((ans) => ({
        q: ans.question,
        transcript: ans.answer,
        feedback: ans.feedback || "No feedback",
        score: ans.score || 0,
      })),
    };
  };

  const generateHTML = () => {
    if (!report) return "";

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      font-family: 'Poppins', sans-serif;
      background: white;
    }
    .print\\:p-0 { padding: 0 !important; }
  </style>
</head>
<body>
  <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
    <div style="margin-bottom: 2rem;">
      <h1 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">CorporateGate AI Interview</h1>
      <p style="font-size: 0.875rem; color: #6b7280;">
        ${report.company} - ${report.role}
      </p>
      <p style="font-size: 0.75rem; color: #9ca3af;">
        Mode: ${report.mode} | Difficulty: ${report.difficulty} | Tone: ${
      report.tone
    }
      </p>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
      <div>
        <h2 style="font-size: 1.25rem; font-weight: 600;">Interview Report</h2>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 3rem; font-weight: bold; color: ${getScoreColor(
          report.summary.overall
        )};">
          ${report.summary.overall}
        </div>
        <div style="font-size: 0.75rem; color: #6b7280;">Overall Score</div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem;">
      <div style="border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1rem; text-align: center;">
        <div style="font-size: 1.25rem; font-weight: 600; color: ${getScoreColor(
          report.summary.dimensions.communication
        )};">
          ${report.summary.dimensions.communication}
        </div>
        <div style="font-size: 0.75rem; color: #6b7280;">Communication</div>
      </div>
      <div style="border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1rem; text-align: center;">
        <div style="font-size: 1.25rem; font-weight: 600; color: ${getScoreColor(
          report.summary.dimensions.technical
        )};">
          ${report.summary.dimensions.technical}
        </div>
        <div style="font-size: 0.75rem; color: #6b7280;">Technical</div>
      </div>
      <div style="border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1rem; text-align: center;">
        <div style="font-size: 1.25rem; font-weight: 600; color: ${getScoreColor(
          report.summary.dimensions.problemSolving
        )};">
          ${report.summary.dimensions.problemSolving}
        </div>
        <div style="font-size: 0.75rem; color: #6b7280;">Problem Solving</div>
      </div>
      <div style="border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1rem; text-align: center;">
        <div style="font-size: 1.25rem; font-weight: 600; color: ${getScoreColor(
          report.summary.dimensions.culture
        )};">
          ${report.summary.dimensions.culture}
        </div>
        <div style="font-size: 0.75rem; color: #6b7280;">Culture Fit</div>
      </div>
    </div>

    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 0.5rem; padding: 1rem; margin-bottom: 1rem;">
      <h3 style="font-weight: 600; font-size: 0.875rem; margin-bottom: 0.5rem;">Summary</h3>
      <p style="font-size: 0.875rem; color: #374151;">${report.summaryText}</p>
    </div>

    ${
      report.strengths.length > 0
        ? `
    <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 0.5rem; padding: 1rem; margin-bottom: 1rem;">
      <h3 style="font-weight: 600; font-size: 0.875rem; margin-bottom: 0.5rem;">Strengths</h3>
      <ul style="list-style: disc; list-style-position: inside;">
        ${report.strengths
          .map(
            (s) =>
              `<li style="font-size: 0.875rem; color: #374151; margin-bottom: 0.25rem;">${s}</li>`
          )
          .join("")}
      </ul>
    </div>
    `
        : ""
    }

    ${
      report.weaknesses.length > 0
        ? `
    <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 0.5rem; padding: 1rem; margin-bottom: 1rem;">
      <h3 style="font-weight: 600; font-size: 0.875rem; margin-bottom: 0.5rem;">Areas for Improvement</h3>
      <ul style="list-style: disc; list-style-position: inside;">
        ${report.weaknesses
          .map(
            (w) =>
              `<li style="font-size: 0.875rem; color: #374151; margin-bottom: 0.25rem;">${w}</li>`
          )
          .join("")}
      </ul>
    </div>
    `
        : ""
    }

    ${
      report.breakdown.length > 0
        ? `
    <div style="margin-top: 2rem;">
      <h3 style="font-weight: 600; font-size: 1rem; margin-bottom: 1rem;">Question-by-Question Breakdown</h3>
      ${report.breakdown
        .map(
          (item, idx) => `
        <div style="border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1rem; background: #f9fafb; margin-bottom: 1rem;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
            <h4 style="font-weight: 500; font-size: 0.875rem;">Q${idx + 1}. ${
            item.q
          }</h4>
            <span style="padding: 0.25rem 0.5rem; font-size: 0.75rem; border-radius: 0.25rem; ${getScoreBadgeStyle(
              item.score
            )}">
              Score: ${item.score}/10
            </span>
          </div>
          <div style="margin-top: 0.5rem;">
            <div style="font-size: 0.875rem; color: #6b7280; font-weight: 500;">Your Answer:</div>
            <p style="font-size: 0.875rem; margin-top: 0.25rem; color: #374151;">${
              item.transcript
            }</p>
          </div>
          <div style="margin-top: 0.5rem;">
            <div style="font-size: 0.875rem; color: #6b7280; font-weight: 500;">Feedback:</div>
            <p style="font-size: 0.875rem; margin-top: 0.25rem; color: #374151;">${
              item.feedback
            }</p>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
    `
        : ""
    }
  </div>
</body>
</html>
    `;
  };

  const download = async () => {
    try {
      if (!report) {
        alert("Report content not found. Please try again.");
        return;
      }

      setDownloading(true);
      console.log("Generating PDF...");

      const html = generateHTML();

      const response = await fetch(`${BACKEND_URL}/api/interview/export-pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `interview-report-${report.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log("PDF downloaded successfully");
    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download PDF: " + err.message);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen text-gray-800 bg-[#fafafa] font-poppins flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4" size={32} />
          <p className="text-gray-500">Loading your interview report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-gray-800 bg-[#fafafa] font-poppins flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link
            href="/interview"
            className="px-4 py-2 rounded-lg border btn-hover inline-flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            <span>Back to Interview Setup</span>
          </Link>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen text-gray-800 bg-[#fafafa] font-poppins flex items-center justify-center">
        <p className="text-gray-500">No report data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-800 bg-[#fafafa] font-poppins">
      <main className="w-full max-w-4xl mx-auto px-4 py-8 text-xs md:text-base">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
          <h1 className="text-xl md:text-3xl font-semibold">
            Interview Report
          </h1>
          <div className="flex gap-4 mt-2 md:mt-0">
            <button
              onClick={download}
              disabled={downloading}
              className="px-4 py-2 rounded-lg text-white gradient-bg btn-hover inline-flex items-center gap-2 cursor-pointer text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {downloading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download size={16} />
                  <span>Download PDF</span>
                </>
              )}
            </button>
            <Link
              href="/"
              className="px-4 py-2 rounded-lg border btn-hover inline-flex items-center gap-2 cursor-pointer text-xs md:text-sm"
            >
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>

        <div className="bg-white/80 border rounded-xl p-6 shadow-custom print:p-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold">
                CorporateGate AI Interview
              </h2>
              <p className="text-xs md:text-sm text-gray-500">
                {report.company} - {report.role}
              </p>
              <p className="text-xs text-gray-400">
                Mode: {report.mode} | Difficulty: {report.difficulty} | Tone:{" "}
                {report.tone}
              </p>
            </div>
            <div className="text-right">
              <div
                className="text-3xl font-bold"
                style={{ color: getScoreColor(report.summary.overall) }}
              >
                {report.summary.overall}
              </div>
              <div className="text-xs text-gray-500">Overall Score</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            <ScoreBadge
              label="Communication"
              value={report.summary.dimensions.communication}
            />
            <ScoreBadge
              label="Technical"
              value={report.summary.dimensions.technical}
            />
            <ScoreBadge
              label="Problem Solving"
              value={report.summary.dimensions.problemSolving}
            />
            <ScoreBadge
              label="Culture Fit"
              value={report.summary.dimensions.culture}
            />
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-sm md:text-base mb-2">Summary</h3>
            <p className="text-xs md:text-sm text-gray-700">
              {report.summaryText}
            </p>
          </div>

          {report.strengths.length > 0 && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-sm md:text-base mb-2">
                Strengths
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {report.strengths.map((strength, idx) => (
                  <li key={idx} className="text-xs md:text-sm text-gray-700">
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {report.weaknesses.length > 0 && (
            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h3 className="font-semibold text-sm md:text-base mb-2">
                Areas for Improvement
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {report.weaknesses.map((weakness, idx) => (
                  <li key={idx} className="text-xs md:text-sm text-gray-700">
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {report.breakdown.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-base md:text-lg mb-3">
                Question-by-Question Breakdown
              </h3>
              <div className="space-y-4">
                {report.breakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg px-3 py-4 bg-gray-50 text-xs md:text-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-xs md:text-sm flex-1">
                        Q{idx + 1}. {item.q}
                      </h4>
                      <span
                        className={`px-2 py-1 text-xs rounded whitespace-nowrap ${getScoreBadgeClass(
                          item.score
                        )}`}
                      >
                        Score: {item.score}/10
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="text-xs md:text-sm text-gray-500 font-medium">
                        Your Answer:
                      </div>
                      <p className="text-xs md:text-sm mt-1 text-gray-700">
                        {item.transcript}
                      </p>
                    </div>
                    <div className="mt-2">
                      <div className="text-xs md:text-sm text-gray-500 font-medium">
                        Feedback:
                      </div>
                      <p className="text-xs md:text-sm mt-1 text-gray-700">
                        {item.feedback}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function ScoreBadge({ label, value }) {
  return (
    <div className="border rounded-lg p-3 text-center text-xs md:text-sm">
      <div
        className="text-lg md:text-xl font-semibold"
        style={{ color: getScoreColor(value) }}
      >
        {value}
      </div>
      <div className="text-xs md:text-sm text-gray-500">{label}</div>
    </div>
  );
}

function getScoreColor(score) {
  if (score >= 80) return "#10b981"; // green
  if (score >= 60) return "#f59e0b"; // orange
  return "#ef4444"; // red
}

function getScoreBadgeClass(score) {
  if (score >= 8) return "bg-green-100 text-green-700";
  if (score >= 6) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
}

function getScoreBadgeStyle(score) {
  if (score >= 8) return "background: #dcfce7; color: #15803d;";
  if (score >= 6) return "background: #fef3c7; color: #92400e;";
  return "background: #fee2e2; color: #991b1b;";
}
