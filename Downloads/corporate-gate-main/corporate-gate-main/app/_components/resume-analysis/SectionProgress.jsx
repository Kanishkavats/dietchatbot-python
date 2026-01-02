"use client";
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

/**
 * SectionProgress Component
 * Displays progress for individual resume sections with collapsible feedback
 */
export const SectionProgress = ({ sections = [] }) => {
  const [expandedSections, setExpandedSections] = React.useState({});

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "excellent":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-700",
          badge: "bg-green-500",
          progress: "bg-green-500",
        };
      case "good":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-700",
          badge: "bg-blue-500",
          progress: "bg-blue-500",
        };
      case "needs-improvement":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          text: "text-yellow-700",
          badge: "bg-yellow-500",
          progress: "bg-yellow-500",
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          text: "text-gray-700",
          badge: "bg-gray-500",
          progress: "bg-gray-500",
        };
    }
  };

  if (!sections || sections.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-500 text-sm">No sections to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sections.map((section, index) => {
        const colors = getStatusColor(section.status);
        const isExpanded = expandedSections[index];

        return (
          <div
            key={index}
            className={`rounded-xl border-2 ${colors.border} ${colors.bg} overflow-hidden transition-all hover:shadow-md`}
          >
            {/* Header - Always Visible */}
            <button
              onClick={() => toggleSection(index)}
              className="w-full p-5 flex items-center justify-between hover:bg-white/50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                {/* Section Name & Status Badge */}
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{section.name}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${colors.badge}`}>
                      {section.status.replace("-", " ")}
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full max-w-md">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2.5 bg-white rounded-full overflow-hidden">
                        <div
                          className={`h-full ${colors.progress} transition-all duration-500`}
                          style={{ width: `${section.score}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-semibold ${colors.text} min-w-[3rem] text-right`}>
                        {section.score}/100
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expand/Collapse Icon */}
                <div className={`${colors.text}`}>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </div>
            </button>

            {/* Expandable Content */}
            {isExpanded && (
              <div className="px-5 pb-5 space-y-4 border-t border-gray-200 pt-4">
                {/* Feedback */}
                <div>
                  <h5 className="text-sm font-semibold text-gray-900 mb-2">Feedback</h5>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {section.feedback}
                  </p>
                </div>

                {/* Suggestions */}
                {section.suggestions && section.suggestions.length > 0 && (
                  <div>
                    <h5 className="text-sm font-semibold text-gray-900 mb-2">Suggestions</h5>
                    <ul className="space-y-2">
                      {section.suggestions.map((suggestion, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <span className={`inline-block w-1.5 h-1.5 rounded-full ${colors.badge} mt-1.5 flex-shrink-0`}></span>
                          <span className="flex-1">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/**
 * SimpleSectionProgress Component
 * A more compact version without collapsible details
 */
export const SimpleSectionProgress = ({ sections = [] }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "excellent":
        return "bg-green-500";
      case "good":
        return "bg-blue-500";
      case "needs-improvement":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-3">
      {sections.map((section, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900">{section.name}</span>
            <span className="text-sm font-semibold text-gray-700">{section.score}/100</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${getStatusColor(section.status)} transition-all duration-500`}
              style={{ width: `${section.score}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

