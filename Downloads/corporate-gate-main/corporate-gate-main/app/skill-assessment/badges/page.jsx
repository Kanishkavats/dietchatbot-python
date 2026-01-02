"use client";

import { useMemo } from "react";
import Header from "../../_components/Header";

export default function BadgesPage() {
  const badges = useMemo(() => ([
    { id: "CG-PLT123", title: "Skill Certified", level: "Platinum" },
    { id: "CG-GLD456", title: "Skill Certified", level: "Gold" },
    { id: "CG-SLV789", title: "Skill Certified", level: "Silver" },
    { id: "CG-GLD321", title: "Skill Certified", level: "Gold" },
    { id: "CG-PLT987", title: "Skill Certified", level: "Platinum" },
    { id: "CG-SLV789", title: "Skill Certified", level: "Silver" },
    { id: "CG-GLD123", title: "Skill Certified", level: "Gold" },
  ]), []);

  return (
    <div className="w-full bg-[#fafafa]">
      <div className="w-full bg-white mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Badges</h1>
            <p className="mt-1 text-sm text-gray-500">{badges.length} {badges.length === 1 ? 'badge' : 'badges'}</p>
          </div>
          <a href="/skill-assessment" className="px-4 py-2 rounded-full border border-gray-200 hover:border-[#345773]/60 text-sm text-gray-700 cursor-pointer">Take another assessment</a>
        </div>

        {badges.length > 0 ? (
          <div className="mt-6 sm:mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {badges.map((b, idx) => (
              <div key={`${b.id}-${idx}`} className="p-5 rounded-2xl bg-[#F5F7F9] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  Corporate Gate
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-xl border border-gray-200">
                    {/* shield icon */}
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                      <path d="M12 3l8 3v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-3z" fill="#e8eff6" stroke="#345773" strokeWidth="1.25"/>
                      <path d="M9 12l2 2 4-4" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <div>
                  </div>

                    <div className="text-lg font-semibold text-gray-900">{b.title}</div>
                    </div>

                    <div className="mt-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#e8eff6] text-[#345773]">
                        {/* star icon */}
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-[#345773]"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.922-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.196-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        {b.level}
                      </span>
                    </div>
                <div className="mt-3 text-xs text-gray-500">{b.id}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 sm:mt-10 rounded-2xl border border-dashed border-gray-300 bg-[#F9FAFB] p-6 sm:p-10 text-center">
            <div className="text-lg font-semibold text-gray-900">No badges yet</div>
            <p className="mt-2 text-sm text-gray-600">Complete a skill assessment to earn your first badge.</p>
            <a href="/skill-assessment" className="mt-4 inline-block w-full sm:w-auto px-6 py-3 rounded-full bg-[#345773] text-white font-semibold hover:bg-[#2a4560] cursor-pointer">Start Assessment</a>
          </div>
        )}
      </div>
    </div>
  );
}
