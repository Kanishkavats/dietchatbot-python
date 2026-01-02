// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useState, useEffect } from "react";
// import { Download, ArrowLeft, Loader2 } from "lucide-react";

// // Assuming we are talking to the same backend 4000 for report
// const BACKEND_URL = "http://localhost:4000";

// export default function InterviewReportPage() {
//     const params = useParams();
//     const [report, setReport] = useState<any>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [downloading, setDownloading] = useState(false);

//     useEffect(() => {
//         if (params.id) {
//             fetchReport();
//         }
//     }, [params.id]);

//     const fetchReport = async () => {
//         try {
//             setLoading(true);
//             const response = await fetch(
//                 `${BACKEND_URL}/api/interviews/sessions/${params.id}`
//             );

//             if (response.ok) {
//                 const data = await response.json();
//                 setReport(formatReport(data));
//             } else {
//                 setError("Failed to load interview report");
//             }
//         } catch (err) {
//             console.error("Error fetching report:", err);
//             setError("Error loading report. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const formatReport = (data: any) => {
//         const evaluation = data.evaluation || {};

//         return {
//             id: data._id || data.id,
//             company: data.company,
//             role: data.role,
//             mode: data.mode,
//             tone: data.tone,
//             difficulty: data.difficulty,
//             summary: {
//                 overall: evaluation.overallScore || 0,
//                 dimensions: {
//                     communication: evaluation.dimensions?.communication || 0,
//                     technical: evaluation.dimensions?.technical || 0,
//                     problemSolving: evaluation.dimensions?.problemSolving || 0,
//                     culture: evaluation.dimensions?.cultureFit || 0,
//                 },
//             },
//             strengths: evaluation.strengths || [],
//             weaknesses: evaluation.weaknesses || [],
//             summaryText: evaluation.summary || "No evaluation available",
//             breakdown: (data.answers || []).map((ans: any) => ({
//                 q: ans.question,
//                 transcript: ans.answer,
//                 feedback: ans.feedback || "No feedback",
//                 score: ans.score || 0,
//             })),
//         };
//     };

//     const getScoreColor = (score: number) => {
//         if (score >= 80) return "#10b981"; // green
//         if (score >= 60) return "#f59e0b"; // orange
//         return "#ef4444"; // red
//     }

//     const getScoreBadgeClass = (score: number) => {
//         if (score >= 8) return "bg-green-100 text-green-700";
//         if (score >= 6) return "bg-yellow-100 text-yellow-700";
//         return "bg-red-100 text-red-700";
//     }


//     const generateHTML = () => {
//         return ""; // Simplified for now
//     };

//     const download = async () => {
//         // Simplified for now
//         alert("Download ID: " + report.id);
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen text-gray-800 bg-[#fafafa] font-poppins flex items-center justify-center">
//                 <div className="text-center">
//                     <Loader2 className="animate-spin mx-auto mb-4" size={32} />
//                     <p className="text-gray-500">Loading your interview report...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="min-h-screen text-gray-800 bg-[#fafafa] font-poppins flex items-center justify-center">
//                 <div className="text-center">
//                     <p className="text-red-600 mb-4">{error}</p>
//                     <Link
//                         href="/interviews/setup"
//                         className="px-4 py-2 rounded-lg border hover:bg-gray-50 inline-flex items-center gap-2"
//                     >
//                         <ArrowLeft size={16} />
//                         <span>Back to Interview Setup</span>
//                     </Link>
//                 </div>
//             </div>
//         );
//     }

//     if (!report) {
//         return (
//             <div className="min-h-screen text-gray-800 bg-[#fafafa] font-poppins flex items-center justify-center">
//                 <p className="text-gray-500">No report data available</p>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen text-gray-800 bg-[#fafafa] font-poppins">
//             <main className="w-full max-w-4xl mx-auto px-4 py-8 text-xs md:text-base">
//                 <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
//                     <h1 className="text-xl md:text-3xl font-semibold">
//                         Interview Report
//                     </h1>
//                     <div className="flex gap-4 mt-2 md:mt-0">
//                         <button
//                             onClick={download}
//                             disabled={downloading}
//                             className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 inline-flex items-center gap-2 cursor-pointer text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             <Download size={16} />
//                             <span>Download PDF</span>
//                         </button>
//                         <Link
//                             href="/"
//                             className="px-4 py-2 rounded-lg border hover:bg-gray-50 inline-flex items-center gap-2 cursor-pointer text-xs md:text-sm"
//                         >
//                             <ArrowLeft size={16} />
//                             <span>Back to Home</span>
//                         </Link>
//                     </div>
//                 </div>

//                 <div className="bg-white/80 border rounded-xl p-6 shadow-custom print:p-0">
//                     <div className="flex items-center justify-between mb-4">
//                         <div>
//                             <h2 className="text-lg md:text-xl font-semibold">
//                                 CorporateGate AI Interview
//                             </h2>
//                             <p className="text-xs md:text-sm text-gray-500">
//                                 {report.company} - {report.role}
//                             </p>
//                             <p className="text-xs text-gray-400">
//                                 Mode: {report.mode} | Difficulty: {report.difficulty} | Tone:{" "}
//                                 {report.tone}
//                             </p>
//                         </div>
//                         <div className="text-right">
//                             <div
//                                 className="text-3xl font-bold"
//                                 style={{ color: getScoreColor(report.summary.overall) }}
//                             >
//                                 {report.summary.overall}
//                             </div>
//                             <div className="text-xs text-gray-500">Overall Score</div>
//                         </div>
//                     </div>

//                     <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//                         <h3 className="font-semibold text-sm md:text-base mb-2">Summary</h3>
//                         <p className="text-xs md:text-sm text-gray-700">
//                             {report.summaryText}
//                         </p>
//                     </div>

//                     {report.strengths.length > 0 && (
//                         <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
//                             <h3 className="font-semibold text-sm md:text-base mb-2">
//                                 Strengths
//                             </h3>
//                             <ul className="list-disc list-inside space-y-1">
//                                 {report.strengths.map((strength: string, idx: number) => (
//                                     <li key={idx} className="text-xs md:text-sm text-gray-700">
//                                         {strength}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}

//                     {report.weaknesses.length > 0 && (
//                         <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
//                             <h3 className="font-semibold text-sm md:text-base mb-2">
//                                 Areas for Improvement
//                             </h3>
//                             <ul className="list-disc list-inside space-y-1">
//                                 {report.weaknesses.map((weakness: string, idx: number) => (
//                                     <li key={idx} className="text-xs md:text-sm text-gray-700">
//                                         {weakness}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}

//                     {report.breakdown.length > 0 && (
//                         <div className="mt-6">
//                             <h3 className="font-semibold text-base md:text-lg mb-3">
//                                 Question-by-Question Breakdown
//                             </h3>
//                             <div className="space-y-4">
//                                 {report.breakdown.map((item: any, idx: number) => (
//                                     <div
//                                         key={idx}
//                                         className="border rounded-lg px-3 py-4 bg-gray-50 text-xs md:text-sm"
//                                     >
//                                         <div className="flex items-start justify-between gap-2">
//                                             <h4 className="font-medium text-xs md:text-sm flex-1">
//                                                 Q{idx + 1}. {item.q}
//                                             </h4>
//                                             <span
//                                                 className={`px-2 py-1 text-xs rounded whitespace-nowrap ${getScoreBadgeClass(
//                                                     item.score
//                                                 )}`}
//                                             >
//                                                 Score: {item.score}/10
//                                             </span>
//                                         </div>
//                                         <div className="mt-2">
//                                             <div className="text-xs md:text-sm text-gray-500 font-medium">
//                                                 Your Answer:
//                                             </div>
//                                             <p className="text-xs md:text-sm mt-1 text-gray-700">
//                                                 {item.transcript}
//                                             </p>
//                                         </div>
//                                         <div className="mt-2">
//                                             <div className="text-xs md:text-sm text-gray-500 font-medium">
//                                                 Feedback:
//                                             </div>
//                                             <p className="text-xs md:text-sm mt-1 text-gray-700">
//                                                 {item.feedback}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </main>
//         </div>
//     );
// }








/* eslint-disable no-unused-vars */
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Download, ArrowLeft, Loader2 } from "lucide-react";

// Backend URL
const BACKEND_URL = "http://localhost:4000";

export default function InterviewReportPage() {
  const params = useParams();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (params?.id) {
      fetchReport();
    }
  }, [params?.id]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BACKEND_URL}/api/interviews/sessions/${params.id}`
      );

      if (response.ok) {
        const data = await response.json();
        setReport(formatReport(data));
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

  const formatReport = (data) => {
    const evaluation = data.evaluation || {};

    return {
      id: data._id || data.id,
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

  const getScoreColor = (score) => {
    if (score >= 80) return "#10b981";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  const getScoreBadgeClass = (score) => {
    if (score >= 8) return "bg-green-100 text-green-700";
    if (score >= 6) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const download = async () => {
    alert("Download ID: " + report.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4" size={32} />
          <p className="text-gray-500">Loading your interview report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link
            href="/interviews/setup"
            className="px-4 py-2 rounded-lg border hover:bg-gray-50 inline-flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Interview Setup
          </Link>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <p className="text-gray-500">No report data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Interview Report</h1>
          <div className="flex gap-3">
            <button
              onClick={download}
              disabled={downloading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Download size={16} />
              Download PDF
            </button>
            <Link
              href="/"
              className="border px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50"
            >
              <ArrowLeft size={16} />
              Back
            </Link>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <div className="flex justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">
                {report.company} – {report.role}
              </h2>
              <p className="text-sm text-gray-500">
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
              <div className="text-sm text-gray-500">Overall Score</div>
            </div>
          </div>

          <div className="bg-blue-50 border p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Summary</h3>
            <p className="text-sm">{report.summaryText}</p>
          </div>

          {report.breakdown.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-3">
                Question-by-Question Breakdown
              </h3>
              <div className="space-y-4">
                {report.breakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium">
                        Q{idx + 1}. {item.q}
                      </h4>
                      <span
                        className={`px-2 py-1 text-xs rounded ${getScoreBadgeClass(
                          item.score
                        )}`}
                      >
                        {item.score}/10
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-700">
                      <strong>Your Answer:</strong> {item.transcript}
                    </p>

                    <p className="mt-2 text-sm text-gray-700">
                      <strong>Feedback:</strong> {item.feedback}
                    </p>
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
