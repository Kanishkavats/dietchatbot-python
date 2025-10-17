// src/hooks/useFeedback.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  fetchFeedbacks,
  fetchFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
  fetchApprovedFeedbacks,
} from "@/src/components/Admin/services/feedbackApi";
import { FeedbackFormValues } from "../../../utils/validations/FormValidation";
import { useLanguageAwareQuery } from "../../../hooks/useLanguageAwareQuery";

// ======================= Fetch All Feedbacks (Admin) ======================= //

export const useFetchFeedbacks = (
  page: number,
  limit: number,
  searchField: string,
  search:string
) => {
  return useLanguageAwareQuery(
    ["feedbacks", page, limit, searchField,search],
    () => fetchFeedbacks(page, limit, searchField,search),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

export const useFetchApprovedFeedbacks = (
  page: number,
  limit: number,
  status: string | null = null
) => {
  return useLanguageAwareQuery(
    ["approved-feedbacks", page, limit, status],
    () => fetchApprovedFeedbacks(page, limit, status),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

// ======================= Fetch Feedback by ID ======================= //

export const useFetchFeedbackById = (id: string, enabled: boolean = true) => {
  return useLanguageAwareQuery(
    ["feedback", id],
    () => fetchFeedbackById(id),
    {
      enabled,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

// ======================= Create Feedback ======================= //

// ✅ Convert values to FormData
const buildFeedbackFormData = (values: FeedbackFormValues) => {
  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("designation", values.designation);
  formData.append("feedback", values.feedback);
  formData.append("rating", values.rating.toString());

  // Handle image
  if (values.image && values.image instanceof File) {
    formData.append("image", values.image);
  }


  for (let [key, value] of formData.entries()) {
    console.log(`  ${key}:`, value);
  }

  return formData;
};

// ✅ Handle feedback create
const handleCreateFeedback = (
  values: FeedbackFormValues,
  createMutation: any,
  resetForm: () => void,
  setSubmitting: (isSubmitting: boolean) => void,
  onClose: () => void
) => {
 
  
  toast.dismiss();
  toast.loading("Submitting feedback...");
  const formData = buildFeedbackFormData(values);

  console.log('🌐 Sending API request to backend...');
  createMutation.mutate(formData, {
    onSuccess: (response: any) => {
      
     
      toast.dismiss();
      toast.success("Feedback submitted successfully");
      resetForm();
      setSubmitting(false);
      onClose();
    },
    onError: (err: any) => {
      console.log('❌ FEEDBACK SUBMISSION FAILED!');
     
     
      toast.dismiss();
      toast.error(err?.response?.data?.message || "Failed to submit feedback");
      setSubmitting(false);
    },
  });
};

export const useCreateFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createFeedback(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
    },
    onError: (err: any) => {
      // Error handling is done in handleCreateFeedback
    },
  });
};

// ✅ Unified feedback form submit
export const submitFeedbackForm = (
  values: FeedbackFormValues,
  createMutation: any,
  resetForm: () => void,
  setSubmitting: (isSubmitting: boolean) => void,
  onClose: () => void
) => {
  handleCreateFeedback(values, createMutation, resetForm, setSubmitting, onClose);
};

// ======================= Update Feedback ======================= //

export const useUpdateFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: { approved?: boolean; status?: "approved" | "rejected" } }) =>
      updateFeedback(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      toast.success("Feedback updated successfully");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update feedback");
    },
  });
};

// ======================= Delete Feedback ======================= //

export const useDeleteFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      toast.dismiss();
      toast.success("Feedback deleted successfully");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to delete feedback");
    },
  });
};
