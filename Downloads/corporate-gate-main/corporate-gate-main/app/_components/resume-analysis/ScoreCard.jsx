"use client";
import React from "react";
import { TrendingUp, TrendingDown, CheckCircle, AlertCircle } from "lucide-react";

/**
 * ScoreCard Component
 * Displays a score with visual indicators and status
 */
export const ScoreCard = ({ title, score, maxScore = 100, trend, description, icon: Icon }) => {
  // Calculate percentage
  const percentage = Math.round((score / maxScore) * 100);

  // Determine color based on score
  const getColorClass = () => {
    if (percentage >= 90) return "text-green-600 bg-green-50 border-green-200";
    if (percentage >= 75) return "text-blue-600 bg-blue-50 border-blue-200";
    if (percentage >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getRingColor = () => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 75) return "text-blue-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusIcon = () => {
    if (percentage >= 75) return <CheckCircle className="h-5 w-5 text-green-500" />;
    return <AlertCircle className="h-5 w-5 text-yellow-500" />;
  };

  return (
    <div className={`relative overflow-hidden rounded-xl border-2 ${getColorClass()} p-6 transition-all hover:shadow-lg`}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/20"></div>
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-700 mb-1">{title}</h3>
            <div className="flex items-center gap-2">
              {Icon && <Icon className="h-4 w-4" />}
              <span className="text-3xl font-bold">{score}</span>
              <span className="text-lg text-gray-500">/ {maxScore}</span>
            </div>
          </div>
          
          {/* Status Icon */}
          <div>{getStatusIcon()}</div>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="h-2.5 w-full bg-white/50 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percentage >= 90 ? "bg-green-500" :
                percentage >= 75 ? "bg-blue-500" :
                percentage >= 60 ? "bg-yellow-500" : "bg-red-500"
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        )}

        {/* Trend Indicator */}
        {trend && (
          <div className="mt-3 flex items-center gap-1 text-xs">
            {trend > 0 ? (
              <>
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-green-600">+{trend}% from average</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-4 w-4 text-red-500" />
                <span className="text-red-600">{trend}% from average</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * CircularScoreCard Component
 * Displays score in circular progress format
 */
export const CircularScoreCard = ({ title, score, maxScore = 100, description }) => {
  const percentage = Math.round((score / maxScore) * 100);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 90) return "#10B981"; // green
    if (percentage >= 75) return "#3B82F6"; // blue
    if (percentage >= 60) return "#F59E0B"; // yellow
    return "#EF4444"; // red
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
      <div className="flex flex-col items-center">
        {/* Circular Progress */}
        <div className="relative w-32 h-32 mb-4">
          <svg className="transform -rotate-90 w-32 h-32">
            {/* Background circle */}
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke={getColor()}
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          {/* Score text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold" style={{ color: getColor() }}>
              {score}
            </span>
            <span className="text-xs text-gray-500">/ {maxScore}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        
        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 text-center">{description}</p>
        )}

        {/* Percentage */}
        <div className="mt-3 px-3 py-1 bg-gray-100 rounded-full">
          <span className="text-sm font-medium text-gray-700">{percentage}%</span>
        </div>
      </div>
    </div>
  );
};

