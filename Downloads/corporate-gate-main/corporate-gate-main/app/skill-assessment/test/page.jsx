"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function useCountdown(seconds) {
  const [remaining, setRemaining] = useState(seconds);
  const intervalRef = useRef(null);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRemaining((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);
  return remaining;
}

export default function TestRunnerPage() {
  const params = useSearchParams();
  const router = useRouter();
  const domain = params.get("domain") || "frontend";
  const experience = params.get("experience") || "junior";
  const q = Number(params.get("q") || 15);
  const c = Math.max(0, Number(params.get("c") || 1));

  const totalSeconds = useMemo(() => {
    const mcqSeconds = q * 60;
    const factor =
      experience === "senior" ? 1.1 : experience === "mid" ? 1.0 : 0.9;
    return Math.round(mcqSeconds * factor);
  }, [q, experience]);

  const remaining = useCountdown(totalSeconds);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch questions from API
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/skill-assessment/generate-questions`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              domain,
              experience,
              mcqCount: q,
            }),
          }
        );
        const data = await res.json();

        if (data.questions) {
          setQuestions(data.questions);
        }
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        // Fallback to hardcoded questions
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [domain, experience, q, c]);

  const current = questions[currentIndex];
  const total = questions.length;

  useEffect(() => {
    if (remaining === 0 && questions.length > 0) {
      handleSubmit(true);
    }
  }, [remaining, questions.length]);

  const handleSelect = (qid, option) => {
    setAnswers((prev) => ({ ...prev, [qid]: option }));
  };

  const next = () => setCurrentIndex((i) => Math.min(i + 1, total - 1));
  const prev = () => setCurrentIndex((i) => Math.max(i - 1, 0));

  const handleSubmit = async (auto = false) => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/skill-assessment/evaluate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questions,
            answers,
            codes: {},
          }),
        }
      );
      const data = await res.json();

      const id = `${Date.now()}`;
      const badge = {
        id: `CG-${id.slice(-6)}`,
        title: "Skill Certified",
        level:
          data.score >= 85 ? "Platinum" : data.score >= 75 ? "Gold" : "Silver",
        shareUrl: `/skill-assessment/results/${id}`,
        domain,
        experience,
        createdAt: new Date().toISOString(),
      };

      // Store result data
      localStorage.setItem(
        "cg_result",
        JSON.stringify({
          ...data,
          domain,
          experience,
          badge,
        })
      );

      // Save badge
      const existing = JSON.parse(localStorage.getItem("cg_badges") || "[]");
      localStorage.setItem("cg_badges", JSON.stringify([...existing, badge]));

      router.replace(`/skill-assessment/results/${id}`);
    } catch (error) {
      console.error("Failed to submit:", error);
      setSubmitting(false);
    }
  };

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  if (loading) {
    return (
      <div className="w-full bg-[#fafafa] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-2">
            Loading Questions...
          </div>
          <div className="text-gray-600">
            Generating AI-powered questions for you
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#fafafa]">
      <div className="flex items-start sm:items-center bg-white justify-between px-4 sm:px-6 lg:px-12 pt-6 sm:pt-8 flex-col sm:flex-row gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Timed Assessment</h1>
          <div className="text-sm text-gray-500 capitalize ml-1">
            {domain} · {experience}
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <div className="px-4 py-2 rounded-full bg-[#F5F7F9] border border-gray-200 text-gray-900 font-semibold text-center w-1/2 sm:w-auto">
            {mm}:{ss}
          </div>
          <button
            onClick={() => handleSubmit(false)}
            disabled={submitting}
            className="px-5 py-2.5 rounded-full bg-[#345773] text-white font-semibold hover:bg-[#2a4560] cursor-pointer w-1/2 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>

      <div className="w-full bg-white px-4 sm:px-6 lg:px-12 pt-2 pb-16">
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-custom p-5">
            <div>
              <div className="text-sm text-gray-500">
                Question {currentIndex + 1} of {total}
              </div>
              <div className="mt-2 text-lg font-semibold text-gray-900">
                {current.question}
              </div>
              <div className="mt-4 grid gap-3">
                {current.options?.map((opt) => {
                  const selected = answers[current.id] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelect(current.id, opt)}
                      className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                        selected
                          ? "border-[#345773] bg-[#ecf1f7]"
                          : "border-gray-200 hover:border-[#345773]/60"
                      }`}
                    >
                      <span className="font-medium text-gray-800">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {currentIndex > 0 ? (
                <button
                  onClick={prev}
                  className="px-4 py-2 rounded-full border border-gray-200 text-gray-700 hover:border-[#345773]/60 cursor-pointer w-full sm:w-auto"
                >
                  Previous
                </button>
              ) : (
                <div className="hidden sm:block" />
              )}
              <div className="text-sm text-gray-600 text-center">
                {currentIndex + 1} / {total}
              </div>
              {currentIndex < total - 1 ? (
                <button
                  onClick={next}
                  className="px-4 py-2 rounded-full bg-[#345773] text-white hover:bg-[#2a4560] cursor-pointer w-full sm:w-auto"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={() => handleSubmit(false)}
                  className="px-4 py-2 rounded-full bg-[#345773] text-white hover:bg-[#2a4560] cursor-pointer w-full sm:w-auto"
                >
                  Submit
                </button>
              )}
            </div>
          </div>

          <div className="bg-[#F5F7F9] rounded-2xl p-5 border border-gray-100">
            <div className="text-sm font-semibold text-gray-900 mb-3">
              Question Navigator
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-6 gap-2">
              {questions.map((qItem, idx) => {
                const answered = Boolean(answers[qItem.id]);
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={qItem.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg border text-sm text-gray-700 font-medium cursor-pointer ${
                      isCurrent
                        ? "border-[#345773] bg-white"
                        : answered
                        ? "border-emerald-400 bg-emerald-50"
                        : "border-gray-200 bg-white hover:border-[#345773]/60"
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 text-xs text-gray-500">
              Auto submit when the timer ends.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
