"use client";
import { useState } from "react";
import axios from "axios";

/**
 * Hook for analyzing resumes with GPT
 * Returns analysis data including scores, feedback, and suggestions
 */
export const useResumeAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const analyzeResume = async (file) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      // Validate file
      if (!file) {
        throw new Error("No file provided");
      }

      // Check file type
      const allowedTypes = ["application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        throw new Error("Only PDF files are supported");
      }

      // Check file size (5MB max)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error("File size must be less than 5MB");
      }

      // Create form data
      const formData = new FormData();
      formData.append("resume", file);

      // Send to backend
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/resume/analyze`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 60000, // 60 seconds timeout
        }
      );

      if (response.data.success) {
        setAnalysis(response.data.analysis);
        return {
          success: true,
          data: response.data.analysis,
        };
      } else {
        throw new Error(response.data.error || "Analysis failed");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        "Failed to analyze resume. Please try again.";
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setAnalysis(null);
    setError(null);
    setLoading(false);
  };

  return {
    loading,
    error,
    analysis,
    analyzeResume,
    reset,
  };
};

