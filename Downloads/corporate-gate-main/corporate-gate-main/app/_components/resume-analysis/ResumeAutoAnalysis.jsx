"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Sparkles, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { ScoreCard, CircularScoreCard } from "./ScoreCard";
import { IssueList } from "./IssueList";
import { SectionProgress } from "./SectionProgress";
import { ATSReport, CompactATSReport } from "./ATSReport";
import {
  ScoreCardSkeleton,
  CircularScoreSkeleton,
  SectionProgressSkeleton,
  ATSReportSkeleton,
} from "./SkeletonLoaders";

/**
 * ResumeAutoAnalysis Component
 * Auto-analyzes resume from Redux state (no file upload needed)
 * Shows in editor preview mode
 */
export const ResumeAutoAnalysis = ({ compact = false }) => {
  const resumeData = useSelector((state) => state.resume);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [expanded, setExpanded] = useState(true);

  const analyzeCurrentResume = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/resume/analyze-json`,
        { resumeData },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 60000,
        }
      );

      if (response.data.success) {
        setAnalysis(response.data.analysis);
      } else {
        throw new Error(response.data.error || "Analysis failed");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        "Failed to analyze resume. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Auto-analyze on mount
  useEffect(() => {
    analyzeCurrentResume();
  }, []);

  if (compact) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Resume Analysis
          </h3>
          <button
            onClick={analyzeCurrentResume}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            title="Refresh analysis"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {loading && <CircularScoreSkeleton />}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && analysis && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">
                  {analysis.overallScore}
                </div>
                <div className="text-xs text-gray-600">Overall Score</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {analysis.atsScore}
                </div>
                <div className="text-xs text-gray-600">ATS Score</div>
              </div>
            </div>
            <CompactATSReport atsAnalysis={analysis.atsAnalysis} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="h-7 w-7" />
            <div>
              <h2 className="text-xl font-bold">AI Resume Analysis</h2>
              <p className="text-purple-100 text-sm">
                Real-time feedback on your resume
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={analyzeCurrentResume}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors disabled:opacity-50 text-sm font-medium"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              {expanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {expanded && (
        <div className="p-6">
          {loading && (
            <div className="space-y-6">
              <div className="text-center text-gray-600 mb-4">
                Analyzing your resume...
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CircularScoreSkeleton />
                <CircularScoreSkeleton />
                <CircularScoreSkeleton />
              </div>
              <SectionProgressSkeleton />
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-red-700">
              <p className="font-semibold mb-1">Analysis Failed</p>
              <p className="text-sm">{error}</p>
              <button
                onClick={analyzeCurrentResume}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && analysis && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
              </div>

              {/* Scores */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CircularScoreCard
                  title="Overall Score"
                  score={analysis.overallScore}
                  description="Combined assessment"
                />
                <CircularScoreCard
                  title="ATS Score"
                  score={analysis.atsScore}
                  description="ATS compatibility"
                />
                <ScoreCard
                  title="Quality"
                  score={analysis.overallScore}
                  description="Industry standards"
                />
              </div>

              {/* Section Breakdown */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Section Analysis
                </h3>
                <SectionProgress sections={analysis.sections} />
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Strengths
                  </h3>
                  <IssueList
                    items={analysis.strengths}
                    type="success"
                    emptyMessage="No strengths identified"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Areas to Improve
                  </h3>
                  <IssueList
                    items={analysis.weaknesses}
                    type="warning"
                    emptyMessage="No weaknesses identified"
                  />
                </div>
              </div>

              {/* ATS Analysis */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  ATS Compatibility
                </h3>
                <ATSReport atsAnalysis={analysis.atsAnalysis} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

