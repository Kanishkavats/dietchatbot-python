"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  FileText,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Sparkles,
  TrendingUp,
  Shield,
} from "lucide-react";
import { useResumeAnalysis } from "../_hooks/useResumeAnalysis";
import { ScoreCard, CircularScoreCard } from "../_components/resume-analysis/ScoreCard";
import { IssueList, BadgeList, ActionItemList } from "../_components/resume-analysis/IssueList";
import { SectionProgress } from "../_components/resume-analysis/SectionProgress";
import { ATSReport } from "../_components/resume-analysis/ATSReport";
import {
  ScoreCardSkeleton,
  CircularScoreSkeleton,
  SectionProgressSkeleton,
  ATSReportSkeleton,
  IssueListSkeleton,
} from "../_components/resume-analysis/SkeletonLoaders";

export default function ResumeAnalysisPage() {
  const router = useRouter();
  const { loading, error, analysis, analyzeResume, reset } = useResumeAnalysis();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        handleAnalyze(file);
      } else {
        alert("Please upload a PDF file");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      handleAnalyze(file);
    }
  };

  const handleAnalyze = async (file) => {
    const result = await analyzeResume(file);
    if (!result.success) {
      alert(result.error);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <Sparkles className="h-8 w-8 text-indigo-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Resume Analysis</h1>
                <p className="text-xs text-gray-600 hidden sm:block">
                  AI-powered resume feedback
                </p>
              </div>
            </div>

            {analysis && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Analyze Another</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!loading && !analysis && (
          <div className="max-w-2xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                <FileText className="h-8 w-8 text-indigo-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Get Instant Resume Feedback
              </h2>
              <p className="text-lg text-gray-600">
                Upload your resume and receive detailed AI-powered analysis with
                actionable suggestions
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Detailed Scores</h3>
                <p className="text-sm text-gray-600">
                  Get scores for each section of your resume
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">ATS Compatible</h3>
                <p className="text-sm text-gray-600">
                  Check ATS compatibility and formatting
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Actionable Tips</h3>
                <p className="text-sm text-gray-600">
                  Receive specific suggestions to improve
                </p>
              </div>
            </div>

            {/* Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                dragActive
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-300 bg-white hover:border-indigo-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                  <Upload className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Upload Your Resume
                </h3>
                <p className="text-gray-600 mb-4">
                  Drag and drop your PDF here, or click to browse
                </p>
                <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                  Choose File
                </button>
                <p className="text-xs text-gray-500 mt-3">
                  Only PDF files • Max 5MB
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-6 bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-red-900 mb-1">Analysis Failed</h4>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4 animate-pulse">
                <Sparkles className="h-8 w-8 text-indigo-600 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Analyzing Your Resume...
              </h2>
              <p className="text-gray-600">
                Our AI is reviewing your resume. This may take a few moments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <CircularScoreSkeleton />
              <CircularScoreSkeleton />
              <CircularScoreSkeleton />
            </div>

            <SectionProgressSkeleton />
          </div>
        )}

        {/* Analysis Results */}
        {!loading && analysis && (
          <div className="space-y-8 animate-fade-in">
            {/* Summary Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="h-8 w-8" />
                <h2 className="text-2xl font-bold">Analysis Complete!</h2>
              </div>
              <p className="text-indigo-100 text-lg mb-4">{analysis.summary}</p>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4" />
                <span>
                  Analyzed: {selectedFile?.name || "Resume.pdf"}
                </span>
              </div>
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
                  description="Based on industry standards and best practices"
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

            {/* CTA Footer */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200 p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Ready to improve your resume?
              </h3>
              <p className="text-gray-600 mb-6">
                Use our resume builder to apply these suggestions and create an
                ATS-optimized resume
              </p>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => router.push("/editor")}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                >
                  Go to Resume Builder
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-semibold"
                >
                  Analyze Another Resume
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

