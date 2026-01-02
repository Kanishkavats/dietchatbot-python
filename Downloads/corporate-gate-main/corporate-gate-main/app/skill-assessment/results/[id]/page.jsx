"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AssessmentResultsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Try to get actual data from localStorage
    try {
      const storedData = localStorage.getItem("cg_result");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setData(parsedData);
      } else {
        // Fallback to demo data if not found
        const badgeId = `CG-${id?.slice(-6)}`;
        const demo = {
          score: 78,
          percentile: 86,
          feedback: [
            {
              questionId: "q1",
              correct: true,
              analysis: "Strong fundamentals and problem solving.",
            },
            {
              questionId: "q2",
              correct: false,
              analysis:
                "Improve on framework internals and performance patterns.",
            },
            {
              questionId: "q3",
              correct: true,
              analysis: "Revise testing and accessibility best practices.",
            },
          ],
          badge: {
            id: badgeId,
            title: "Skill Certified",
            level: "Gold",
            shareUrl: `${
              typeof window !== "undefined" ? window.location.origin : ""
            }/skill-assessment/results/${id}`,
          },
        };
        setData(demo);
      }
    } catch (error) {
      console.error("Error parsing result data:", error);
    }
  }, [id]);

  const ringColor = useMemo(
    () =>
      (data?.score ?? 0) >= 80
        ? "#10B981"
        : (data?.score ?? 0) >= 60
        ? "#F59E0B"
        : "#EF4444",
    [data]
  );

  const correctCount = useMemo(() => {
    if (!data?.feedback) return 0;
    return data.feedback.filter((f) => f.correct).length;
  }, [data?.feedback]);

  const totalQuestions = data?.totalQuestions || data?.feedback?.length || 0;
  const percentile = useMemo(() => {
    if (!data?.score) return 0;
    // Simple percentile calculation
    return Math.max(50, Math.min(99, 50 + Math.floor(data.score * 0.6)));
  }, [data?.score]);

  const saveBadge = () => {
    if (!data?.badge) return;
    const existing = JSON.parse(localStorage.getItem("cg_badges") || "[]");
    localStorage.setItem(
      "cg_badges",
      JSON.stringify([...existing, data.badge])
    );
  };

  if (!data) return null;

  return (
    <div className="w-full bg-[#fafafa]">
      <div className="w-full bg-white mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
          <div>
            <div className="text-sm text-gray-500">Result ID: {id}</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Your Assessment Report
            </h1>
          </div>
          <button
            onClick={() => router.push("/skill-assessment")}
            className="px-4 py-2 rounded-full border border-gray-400 hover:border-gray-500 cursor-pointer text-gray-700 w-full sm:w-auto"
          >
            New Test
          </button>
        </div>

        <div className="mt-6 sm:mx-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-custom p-6">
            <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-col sm:flex-row">
              <div className="relative">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    stroke="#E5E7EB"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    stroke={ringColor}
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${(data.score / 100) * 326} 326`}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">
                      {data.score}
                    </div>
                    <div className="text-xs text-gray-500">Overall</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Correct Answers</div>
                <div className="text-2xl font-semibold text-gray-900">
                  {correctCount} / {totalQuestions}
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  Percentile: Top {percentile}%
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  AI‑evaluated across correctness and reasoning.
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold text-gray-900 mb-3">
                Question Analysis
              </div>
              <div className="space-y-4">
                {data.feedback?.map((fb, idx) => (
                  <div
                    key={fb.questionId || idx}
                    className={`p-5 rounded-xl border ${
                      fb.correct
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          fb.correct ? "bg-emerald-500" : "bg-red-500"
                        }`}
                      ></div>
                      <span className="text-sm font-semibold text-gray-900">
                        Question {idx + 1}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          fb.correct
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {fb.correct ? "Correct" : "Incorrect"}
                      </span>
                    </div>

                    <div className="mb-3">
                      <div className="text-xs font-medium text-gray-500 mb-1">
                        Question
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {fb.question}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div
                        className={`p-3 rounded-lg border-2 ${
                          fb.correct
                            ? "border-emerald-300 bg-emerald-100"
                            : "border-red-300 bg-red-100"
                        }`}
                      >
                        <div className="text-xs font-semibold text-gray-700 mb-1">
                          Your Answer
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {fb.userAnswer || "Not attempted"}
                        </div>
                      </div>

                      <div className="p-3 rounded-lg border-2 border-gray-300 bg-white">
                        <div className="text-xs font-semibold text-gray-700 mb-1">
                          Correct Answer
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {fb.correctAnswer}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="text-xs font-medium text-gray-500 mb-1">
                        Analysis
                      </div>
                      <div className="text-sm text-gray-700">{fb.analysis}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#F5F7F9] rounded-2xl p-6 border border-gray-100">
            <div className="text-base font-semibold text-gray-900">
              Your Badge
            </div>
            <div className="mt-3 p-5 bg-white border border-gray-200 rounded-xl">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                Corporate Gate
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-xl bg-[#F5F7F9] border border-gray-200">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                  >
                    <path
                      d="M12 3l8 3v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-3z"
                      fill="#e8eff6"
                      stroke="#345773"
                      strokeWidth="1.25"
                    />
                    <path
                      d="M9 12l2 2 4-4"
                      stroke="#10B981"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="text-xl font-bold text-gray-900">
                  {data.badge.title}
                </div>
              </div>
              <div className="mt-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#e8eff6] text-[#345773]">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3.5 w-3.5 text-[#345773]"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.922-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.196-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {data.badge.level}
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500 text-center">
                {data.badge.id}
              </div>
            </div>
            {/* <button
              onClick={saveBadge}
              className="mt-4 w-full px-6 py-3 rounded-full bg-[#345773] text-white font-semibold hover:bg-[#2a4560] cursor-pointer"
            >
              Save to Dashboard
            </button>
            <button
              onClick={() => router.push("/skill-assessment/badges")}
              className="mt-3 w-full px-6 py-3 rounded-full border border-gray-300 hover:border-gray-400 cursor-pointer text-gray-700"
            >
              See Badges
            </button>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                data.badge.shareUrl
              )}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block w-full text-center px-6 py-3 rounded-full border border-gray-400 hover:border-gray-500 cursor-pointer text-gray-700"
            >
              Share on LinkedIn
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}
