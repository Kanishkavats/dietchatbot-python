// "use client";

// import Footer from "../../_components/Footer";
// import Link from "next/link";
// import { useState } from "react";
// import { Play, Save } from "lucide-react";

// export default function InterviewSetupPage() {
//     const [form, setForm] = useState({
//         company: "",
//         role: "",
//         mode: "Voice",
//         tone: "HR",
//         difficulty: "Medium",
//         jd: "",
//     });

//     const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

//     return (
//         <div className="min-h-screen bg-[#fafafa] font-poppins flex flex-col">
//             <main className="w-full text-gray-800 max-w-5xl mx-auto px-4 py-8 text-xs md:text-base flex-1">
//                 <div className="mb-8">
//                     <h1 className="text-xl md:text-3xl font-semibold">AI Interview</h1>
//                     <p className="text-xs md:text-base text-gray-500 mt-1">Setup your session and start a 30-minute AI-driven interview.</p>
//                 </div>

//                 <div className="bg-white/80 border rounded-xl p-4 md:p-6 shadow-custom">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//                         <div>
//                             <label className="block text-xs md:text-sm font-medium">Company</label>
//                             <input
//                                 value={form.company}
//                                 onChange={(e) => update("company", e.target.value)}
//                                 placeholder="e.g., Google"
//                                 className="mt-1 w-full text-xs md:text-sm border rounded-lg px-3 py-2 focus:outline-none"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-xs md:text-sm font-medium">Role</label>
//                             <input
//                                 value={form.role}
//                                 onChange={(e) => update("role", e.target.value)}
//                                 placeholder="e.g., Frontend Engineer"
//                                 className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-xs md:text-sm font-medium">Mode</label>
//                             <select
//                                 value={form.mode}
//                                 onChange={(e) => update("mode", e.target.value)}
//                                 className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none"
//                             >
//                                 <option>Voice</option>
//                                 <option>Text</option>
//                             </select>
//                         </div>

//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-xs md:text-sm font-medium">Tone</label>
//                                 <select
//                                     value={form.tone}
//                                     onChange={(e) => update("tone", e.target.value)}
//                                     className="mt-1 w-full text-xs md:text-sm border rounded-lg px-3 py-2 focus:outline-none"
//                                 >
//                                     <option>HR</option>
//                                     <option>Technical</option>
//                                     <option>Neutral</option>
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="block text-xs md:text-sm font-medium">Difficulty</label>
//                                 <select
//                                     value={form.difficulty}
//                                     onChange={(e) => update("difficulty", e.target.value)}
//                                     className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none"
//                                 >
//                                     <option>Easy</option>
//                                     <option>Medium</option>
//                                     <option>Hard</option>
//                                 </select>
//                             </div>
//                         </div>

//                         <div className="md:col-span-2">
//                             <label className="block text-xs md:text-sm font-medium">Job Description</label>
//                             <textarea
//                                 value={form.jd}
//                                 onChange={(e) => update("jd", e.target.value)}
//                                 placeholder="Paste the JD here (min 30 characters)"
//                                 rows={6}
//                                 className="mt-1 w-full text-xs md:text-sm border rounded-lg px-3 py-2 focus:outline-none"
//                             />
//                         </div>
//                     </div>

//                     <div className="flex flex-col md:flex-row gap-3 mt-6">
//                         <Link
//                             href={{ pathname: "/interviews/lobby", query: { preset: JSON.stringify(form) } }}
//                             className={`px-5 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 text-center inline-flex items-center gap-2 cursor-pointer transition-colors`}
//                         >
//                             <Play size={16} />
//                             <span>Proceed to Interview</span>
//                         </Link>

//                         <button
//                             type="button"
//                             onClick={() => localStorage.setItem("interviewSetupDraft", JSON.stringify(form))}
//                             className="px-5 py-2 rounded-lg border hover:bg-gray-50 inline-flex items-center gap-2 cursor-pointer transition-colors"
//                         >
//                             <Save size={16} />
//                             <span>Save Draft</span>
//                         </button>
//                     </div>
//                 </div>
//             </main>
//             <Footer />
//         </div>
//     );
// }




"use client";

import Footer from "../../_components/Footer";
import Link from "next/link";
import { useState } from "react";
import { Play, Save } from "lucide-react";

export default function InterviewSetupPage() {
  const [form, setForm] = useState({
    company: "",
    role: "",
    mode: "Voice",
    tone: "HR",
    difficulty: "Medium",
    jd: "",
  });

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-poppins flex flex-col">
      <main className="w-full text-gray-800 max-w-5xl mx-auto px-4 py-8 text-xs md:text-base flex-1">
        <div className="mb-8">
          <h1 className="text-xl md:text-3xl font-semibold">AI Interview</h1>
          <p className="text-xs md:text-base text-gray-500 mt-1">
            Setup your session and start a 30-minute AI-driven interview.
          </p>
        </div>

        <div className="bg-white/80 border rounded-xl p-4 md:p-6 shadow-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-xs md:text-sm font-medium">
                Company
              </label>
              <input
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                placeholder="e.g., Google"
                className="mt-1 w-full text-xs md:text-sm border rounded-lg px-3 py-2 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium">
                Role
              </label>
              <input
                value={form.role}
                onChange={(e) => update("role", e.target.value)}
                placeholder="e.g., Frontend Engineer"
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium">
                Mode
              </label>
              <select
                value={form.mode}
                onChange={(e) => update("mode", e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none"
              >
                <option>Voice</option>
                <option>Text</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs md:text-sm font-medium">
                  Tone
                </label>
                <select
                  value={form.tone}
                  onChange={(e) => update("tone", e.target.value)}
                  className="mt-1 w-full text-xs md:text-sm border rounded-lg px-3 py-2 focus:outline-none"
                >
                  <option>HR</option>
                  <option>Technical</option>
                  <option>Neutral</option>
                </select>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium">
                  Difficulty
                </label>
                <select
                  value={form.difficulty}
                  onChange={(e) =>
                    update("difficulty", e.target.value)
                  }
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs md:text-sm font-medium">
                Job Description
              </label>
              <textarea
                value={form.jd}
                onChange={(e) => update("jd", e.target.value)}
                placeholder="Paste the JD here (min 30 characters)"
                rows={6}
                className="mt-1 w-full text-xs md:text-sm border rounded-lg px-3 py-2 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 mt-6">
            <Link
              href={{
                pathname: "/interviews/lobby",
                query: { preset: JSON.stringify(form) },
              }}
              className="px-5 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 text-center inline-flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Play size={16} />
              <span>Proceed to Interview</span>
            </Link>

            <button
              type="button"
              onClick={() =>
                localStorage.setItem(
                  "interviewSetupDraft",
                  JSON.stringify(form)
                )
              }
              className="px-5 py-2 rounded-lg border hover:bg-gray-50 inline-flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Save size={16} />
              <span>Save Draft</span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
