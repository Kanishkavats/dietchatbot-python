"use client";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  X,
  Sparkles,
  TrendingUp,
  Loader2
} from "lucide-react";
import { ScoreCard, CircularScoreCard } from "./ScoreCard";
import { IssueList, ActionItemList } from "./IssueList";
import { SectionProgress } from "./SectionProgress";
import { ATSReport } from "./ATSReport";
import {
  CircularScoreSkeleton,
  SectionProgressSkeleton,
} from "./SkeletonLoaders";

/**
 * ResumeAnalysisModal Component
 * Shows analysis in a modal with manual trigger
 */
export const ResumeAnalysisModal = ({ isOpen, onClose }) => {
  const resumeData = useSelector((state) => state.resume);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null);

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

  // Auto-analyze when modal opens
  React.useEffect(() => {
    if (isOpen && !analysis && !loading) {
      analyzeCurrentResume();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-7 w-7" />
                  <div>
                    <h2 className="text-2xl font-bold">AI Resume Analysis</h2>
                    <p className="text-purple-100 text-sm">
                      Get instant feedback on your resume
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!loading && analysis && (
                    <button
                      onClick={analyzeCurrentResume}
                      disabled={loading}
                      className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Re-analyze with current changes"
                    >
                      <Sparkles className="h-5 w-5" />
                      <span className="text-sm font-semibold">Re-analyze</span>
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-6">
              {loading && (
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                      <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Analyzing Your Resume...
                    </h3>
                    <p className="text-gray-600">
                      Our AI is reviewing your resume. This may take a few moments.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <CircularScoreSkeleton />
                    <CircularScoreSkeleton />
                    <CircularScoreSkeleton />
                  </div>

                  <SectionProgressSkeleton />
                </div>
              )}

              {error && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                    <X className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Analysis Failed
                  </h3>
                  <p className="text-gray-600 mb-6">{error}</p>
                  <button
                    onClick={analyzeCurrentResume}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {!loading && !error && analysis && (
                <div className="space-y-8 animate-fade-in">
                  {/* Summary */}
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
                    <p className="text-lg leading-relaxed">{analysis.summary}</p>
                  </div>

                  {/* Overall Scores */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Overall Scores
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <CircularScoreCard
                        title="Overall Score"
                        score={analysis.overallScore}
                        description="Combined assessment of all sections"
                      />
                      <CircularScoreCard
                        title="ATS Score"
                        score={analysis.atsScore}
                        description="Applicant Tracking System compatibility"
                      />
                      <ScoreCard
                        title="Resume Quality"
                        score={analysis.overallScore}
                        description="Based on industry standards"
                        icon={TrendingUp}
                      />
                    </div>
                  </div>

                  {/* Section Breakdown */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Section Analysis
                    </h3>
                    <SectionProgress sections={analysis.sections} />
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Strengths
                      </h3>
                      <IssueList
                        items={analysis.strengths}
                        type="success"
                        emptyMessage="No strengths identified"
                      />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Areas for Improvement
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      ATS Compatibility Report
                    </h3>
                    <ATSReport atsAnalysis={analysis.atsAnalysis} />
                  </div>

                  {/* Action Items */}
                  {analysis.actionItems && analysis.actionItems.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Action Items
                      </h3>
                      <ActionItemList items={analysis.actionItems} />
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-center gap-4 pt-4">
                    <button
                      onClick={analyzeCurrentResume}
                      disabled={loading}
                      className="px-8 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Sparkles className="h-5 w-5" />
                      Re-analyze Resume
                    </button>
                    <button
                      onClick={onClose}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors font-semibold shadow-lg"
                    >
                      Close Analysis
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </>
  );
};

