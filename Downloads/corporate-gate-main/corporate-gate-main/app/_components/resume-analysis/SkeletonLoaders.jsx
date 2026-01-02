"use client";
import React from "react";

/**
 * Skeleton loader components for resume analysis
 */

export const ScoreCardSkeleton = () => (
  <div className="bg-gray-100 rounded-xl border border-gray-200 p-6 animate-pulse">
    <div className="space-y-3">
      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      <div className="h-8 bg-gray-300 rounded w-1/2"></div>
      <div className="h-2.5 bg-gray-300 rounded w-full"></div>
      <div className="h-3 bg-gray-300 rounded w-2/3"></div>
    </div>
  </div>
);

export const CircularScoreSkeleton = () => (
  <div className="bg-gray-100 rounded-xl border border-gray-200 p-6 animate-pulse">
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 bg-gray-300 rounded-full mb-4"></div>
      <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-40"></div>
    </div>
  </div>
);

export const SectionProgressSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className="bg-gray-100 rounded-xl border border-gray-200 p-5 animate-pulse"
      >
        <div className="space-y-3">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-2.5 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    ))}
  </div>
);

export const ATSReportSkeleton = () => (
  <div className="bg-gray-100 rounded-xl border border-gray-200 overflow-hidden animate-pulse">
    <div className="bg-gray-300 p-6">
      <div className="h-6 bg-gray-400 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-400 rounded w-3/4"></div>
    </div>
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-200 rounded-lg p-4">
            <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const IssueListSkeleton = () => (
  <div className="space-y-2">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="bg-gray-100 rounded-lg border border-gray-200 p-4 animate-pulse"
      >
        <div className="h-4 bg-gray-300 rounded"></div>
      </div>
    ))}
  </div>
);

