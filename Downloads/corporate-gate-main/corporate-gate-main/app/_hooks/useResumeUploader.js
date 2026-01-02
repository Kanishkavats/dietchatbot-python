"use client";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  updatePersonal,
  updateSummary,
  updateSkills,
  updateExperience,
  updateEducation,
  updateProjects,
  updateCertifications,
  updateLanguages,
  updateInterests,
} from "../../store/slices/resumeSlice";

/**
 * Hook for uploading and extracting resume data
 * Automatically fills Redux store with extracted data
 */
export const useResumeUploader = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [extractedData, setExtractedData] = useState(null);

  const uploadAndExtract = async (file) => {
    setLoading(true);
    setError(null);
    setExtractedData(null);

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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/resume/extract`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 60000, // 60 seconds timeout
        }
      );

      if (response.data.success) {
        const data = response.data.data;
        setExtractedData(data);

        // Track which fields were successfully filled
        const filledFields = [];
        const emptyFields = [];

        // Update Redux store with extracted data
        if (data.personal && Object.keys(data.personal).length > 0) {
          // Add IDs to experience, education, projects, certifications, languages
          const processedData = {
            ...data,
            experience: data.experience?.map((exp, idx) => ({
              ...exp,
              id: `exp${Date.now()}_${idx}`,
            })) || [],
            education: data.education?.map((edu, idx) => ({
              ...edu,
              id: `edu${Date.now()}_${idx}`,
            })) || [],
            projects: data.projects?.map((proj, idx) => ({
              ...proj,
              id: `proj${Date.now()}_${idx}`,
            })) || [],
            certifications: data.certifications?.map((cert, idx) => ({
              ...cert,
              id: `cert${Date.now()}_${idx}`,
            })) || [],
            languages: data.languages?.map((lang, idx) => ({
              ...lang,
              id: `lang${Date.now()}_${idx}`,
            })) || [],
          };

          // Dispatch updates to Redux store
          if (processedData.personal.fullName) {
            dispatch(updatePersonal(processedData.personal));
            filledFields.push("Personal Info");
          } else {
            emptyFields.push("Personal Info");
          }

          if (processedData.summary && processedData.summary.trim()) {
            dispatch(updateSummary(processedData.summary));
            filledFields.push("Summary");
          } else {
            emptyFields.push("Summary");
          }

          if (processedData.skills && processedData.skills.length > 0) {
            dispatch(updateSkills(processedData.skills));
            filledFields.push("Skills");
          } else {
            emptyFields.push("Skills");
          }

          if (processedData.experience && processedData.experience.length > 0) {
            dispatch(updateExperience(processedData.experience));
            filledFields.push("Experience");
          } else {
            emptyFields.push("Experience");
          }

          if (processedData.education && processedData.education.length > 0) {
            dispatch(updateEducation(processedData.education));
            filledFields.push("Education");
          } else {
            emptyFields.push("Education");
          }

          if (processedData.projects && processedData.projects.length > 0) {
            dispatch(updateProjects(processedData.projects));
            filledFields.push("Projects");
          } else {
            emptyFields.push("Projects");
          }

          if (processedData.certifications && processedData.certifications.length > 0) {
            dispatch(updateCertifications(processedData.certifications));
            filledFields.push("Certifications");
          } else {
            emptyFields.push("Certifications");
          }

          if (processedData.languages && processedData.languages.length > 0) {
            dispatch(updateLanguages(processedData.languages));
            filledFields.push("Languages");
          } else {
            emptyFields.push("Languages");
          }

          if (processedData.interests && processedData.interests.length > 0) {
            dispatch(updateInterests(processedData.interests));
            filledFields.push("Interests");
          } else {
            emptyFields.push("Interests");
          }
        }

        return {
          success: true,
          data: data,
          filledFields,
          emptyFields,
        };
      } else {
        throw new Error(response.data.error || "Extraction failed");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        "Failed to extract resume data. Please try again.";
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
    setExtractedData(null);
    setError(null);
    setLoading(false);
  };

  return {
    loading,
    error,
    extractedData,
    uploadAndExtract,
    reset,
  };
};

