"use client";
import React from "react";
import { 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  TrendingUp,
  FileSearch,
  Zap
} from "lucide-react";

/**
 * ATSReport Component
 * Displays ATS (Applicant Tracking System) compatibility analysis
 */
export const ATSReport = ({ atsAnalysis }) => {
  if (!atsAnalysis) {
    return null;
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case "excellent":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
        };
      case "good":
        return {
          icon: CheckCircle,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
        };
      case "fair":
        return {
          icon: AlertCircle,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
        };
      case "poor":
        return {
          icon: XCircle,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
        };
      default:
        return {
          icon: AlertCircle,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
        };
    }
  };

  const criteriaList = [
    {
      label: "Keyword Density",
      value: atsAnalysis.keywordDensity,
      icon: FileSearch,
    },
    {
      label: "Formatting",
      value: atsAnalysis.formatting,
      icon: FileText,
    },
    {
      label: "Readability",
      value: atsAnalysis.readability,
      icon: Zap,
    },
    {
      label: "Length",
      value: atsAnalysis.length,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="h-6 w-6" />
          <h3 className="text-xl font-bold">ATS Compatibility Report</h3>
        </div>
        <p className="text-indigo-100 text-sm">
          Analysis of how well your resume works with Applicant Tracking Systems
        </p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Criteria Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {criteriaList.map((criteria, index) => {
            const config = getStatusConfig(criteria.value);
            const Icon = criteria.icon;
            const StatusIcon = config.icon;

            return (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${config.bgColor} ${config.borderColor}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${config.color}`} />
                    <span className="font-semibold text-gray-900">
                      {criteria.label}
                    </span>
                  </div>
                  <StatusIcon className={`h-5 w-5 ${config.color}`} />
                </div>
                <p className={`text-sm font-medium capitalize ${config.color}`}>
                  {criteria.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Issues Section */}
        {atsAnalysis.issues && atsAnalysis.issues.length > 0 && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Issues Found
            </h4>
            <ul className="space-y-2">
              {atsAnalysis.issues.map((issue, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-red-700">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                  <span className="flex-1">{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations Section */}
        {atsAnalysis.recommendations && atsAnalysis.recommendations.length > 0 && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Recommendations
            </h4>
            <ul className="space-y-2">
              {atsAnalysis.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-blue-700">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                  <span className="flex-1">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Summary Box */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-semibold">Summary:</span> ATS systems scan
            resumes for keywords, formatting, and readability. Optimizing your
            resume for ATS increases your chances of getting past initial
            screening and reaching human recruiters.
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * CompactATSReport Component
 * A simpler version of the ATS report
 */
export const CompactATSReport = ({ atsAnalysis }) => {
  if (!atsAnalysis) {
    return null;
  }

  const criteriaList = [
    { label: "Keyword Density", value: atsAnalysis.keywordDensity },
    { label: "Formatting", value: atsAnalysis.formatting },
    { label: "Readability", value: atsAnalysis.readability },
    { label: "Length", value: atsAnalysis.length },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <FileText className="h-5 w-5 text-indigo-600" />
        ATS Compatibility
      </h4>
      
      <div className="space-y-2">
        {criteriaList.map((criteria, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{criteria.label}</span>
            <span className="font-medium text-gray-900 capitalize">
              {criteria.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

