"use client";
import React from "react";
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  XCircle,
  Lightbulb,
  ArrowRight 
} from "lucide-react";

/**
 * IssueList Component
 * Displays a list of issues, suggestions, or recommendations with badges
 */
export const IssueList = ({ 
  items = [], 
  type = "suggestion", 
  title,
  emptyMessage = "No items to display"
}) => {
  // Determine icon and color based on type
  const getTypeConfig = () => {
    switch (type) {
      case "error":
        return {
          icon: XCircle,
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          textColor: "text-red-700",
          iconColor: "text-red-500",
        };
      case "warning":
        return {
          icon: AlertTriangle,
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          textColor: "text-yellow-800",
          iconColor: "text-yellow-500",
        };
      case "success":
        return {
          icon: CheckCircle,
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-700",
          iconColor: "text-green-500",
        };
      case "suggestion":
        return {
          icon: Lightbulb,
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          textColor: "text-blue-700",
          iconColor: "text-blue-500",
        };
      default:
        return {
          icon: Info,
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          textColor: "text-gray-700",
          iconColor: "text-gray-500",
        };
    }
  };

  const config = getTypeConfig();
  const Icon = config.icon;

  if (!items || items.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-500 text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {title && (
        <h4 className="text-sm font-semibold text-gray-900 mb-3">{title}</h4>
      )}
      
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className={`flex items-start gap-3 p-4 rounded-lg border ${config.bgColor} ${config.borderColor} transition-all hover:shadow-sm`}
          >
            <Icon className={`h-5 w-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
            <span className={`text-sm ${config.textColor} flex-1`}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * BadgeList Component
 * Displays items as badges/pills
 */
export const BadgeList = ({ items = [], color = "blue", title }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    green: "bg-green-100 text-green-700 border-green-200",
    yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
    red: "bg-red-100 text-red-700 border-red-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
    gray: "bg-gray-100 text-gray-700 border-gray-200",
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {title && (
        <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
      )}
      
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${
              colorClasses[color] || colorClasses.blue
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

/**
 * ActionItemList Component
 * Displays action items with priority indicators
 */
export const ActionItemList = ({ items = [] }) => {
  const getPriorityConfig = (priority) => {
    switch (priority) {
      case "high":
        return {
          label: "High Priority",
          bgColor: "bg-red-50",
          borderColor: "border-red-300",
          badgeColor: "bg-red-500",
          textColor: "text-red-700",
        };
      case "medium":
        return {
          label: "Medium Priority",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-300",
          badgeColor: "bg-yellow-500",
          textColor: "text-yellow-700",
        };
      case "low":
        return {
          label: "Low Priority",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-300",
          badgeColor: "bg-blue-500",
          textColor: "text-blue-700",
        };
      default:
        return {
          label: "Priority",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-300",
          badgeColor: "bg-gray-500",
          textColor: "text-gray-700",
        };
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-500 text-sm">No action items</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const config = getPriorityConfig(item.priority);
        
        return (
          <div
            key={index}
            className={`relative p-4 rounded-lg border-2 ${config.bgColor} ${config.borderColor} transition-all hover:shadow-md`}
          >
            {/* Priority Badge */}
            <div className="absolute top-3 right-3">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${config.badgeColor}`}>
                {config.label}
              </span>
            </div>

            {/* Content */}
            <div className="pr-32">
              <h5 className={`font-semibold ${config.textColor} mb-2`}>
                {item.title}
              </h5>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Arrow indicator */}
            <div className="absolute bottom-3 right-3">
              <ArrowRight className={`h-4 w-4 ${config.textColor}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

