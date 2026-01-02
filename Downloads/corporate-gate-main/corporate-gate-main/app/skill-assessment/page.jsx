"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SkillAssessmentLanding() {
  const router = useRouter();
  const [domain, setDomain] = useState("");
  const [experience, setExperience] = useState("junior");
  const [numQuestions, setNumQuestions] = useState(15);

  const startTest = () => {
    if (!domain) return;
    const params = new URLSearchParams({
      domain,
      experience,
      q: String(numQuestions),
      c: String(0),
    });
    router.push(`/skill-assessment/test?${params.toString()}`);
  };

  const domains = [
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "fullstack", name: "Full‑Stack" },
    { id: "datastructures", name: "DSA" },
    { id: "devops", name: "DevOps" },
    { id: "data", name: "Data/ML" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#fafafa]">
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-10 bg-white">
        <div className="mb-8">
          <div className="inline-block px-3 py-1.5 border border-gray-200 shadow-sm rounded-full">
            <span className="text-sm font-medium text-gray-700">
              <span className="text-[#345773]">AI</span> Skill Assessment
            </span>
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Assess your <span className="text-[#345773]">skills</span>
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Pick a domain and difficulty. You will get timed MCQs. Submit to get
            AI‑evaluated analytics and a badge.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-28">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-custom p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Choose a domain
            </h2>

            {/* Custom Domain Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or enter a custom domain
              </label>
              <input
                type="text"
                placeholder="e.g., React, Python, Machine Learning..."
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#345773] text-gray-900"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {domains.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDomain(d.id)}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    domain === d.id
                      ? "border-[#345773] bg-[#064c1319]"
                      : "border-gray-200 hover:border-[#345773]/60"
                  }`}
                >
                  <div className="text-base font-semibold text-gray-900">
                    {d.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    Curated MCQ questions
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 py-4 w-full flex flex-col sm:flex-row gap-6 sm:gap-12">
              <div className="">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience level
                </label>
                <div className="flex gap-2">
                  {[
                    { id: "junior", label: "Junior" },
                    { id: "mid", label: "Mid" },
                    { id: "senior", label: "Senior" },
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      onClick={() => setExperience(lvl.id)}
                      className={`px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer ${
                        experience === lvl.id
                          ? "bg-[#345773] text-white border-[#345773]"
                          : "border-gray-200 text-gray-700 hover:border-[#345773]/60"
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full sm:mx-10 mt-4 sm:mt-0">
                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of MCQs
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    step={1}
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(Number(e.target.value))}
                    className="w-full cursor-pointer"
                    style={{ accentColor: "#345773" }}
                  />
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      min={5}
                      max={30}
                      value={numQuestions}
                      onChange={(e) =>
                        setNumQuestions(
                          Math.max(5, Math.min(30, Number(e.target.value) || 5))
                        )
                      }
                      className="w-16 px-2 text-center py-1 border border-gray-200 rounded-lg text-sm text-gray-700"
                    />
                    <span className="text-sm text-gray-700">MCQs</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={startTest}
              disabled={!domain}
              className={`mt-4 w-full px-6 py-3 rounded-full font-semibold transition-colors block sm:hidden ${
                domain
                  ? "bg-[#345773] text-white hover:bg-[#2a4560] cursor-pointer"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Start Test
            </button>
          </div>

          <div className="bg-[#F5F7F9] rounded-2xl p-5 border border-gray-100">
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Test overview
            </h3>
            <ul className="text-sm text-gray-700 space-y-2 list-disc ml-5">
              <li>MCQs with single correct answer</li>
              <li>Timer enforced; auto submit on expiry</li>
              <li>AI evaluated with topic‑wise analytics</li>
            </ul>
            <button
              onClick={startTest}
              disabled={!domain}
              className={`mt-4 w-full px-6 py-3 rounded-full font-semibold transition-colors hidden sm:block ${
                domain
                  ? "bg-[#345773] text-white hover:bg-[#2a4560] cursor-pointer"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Start Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
