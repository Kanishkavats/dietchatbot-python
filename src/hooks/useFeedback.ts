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
} from "@/src/services/feedbackApi";
import { FeedbackFormValues } from "../utils/validations/FormValidation";

// ======================= Fetch All Feedbacks (Admin) ======================= //

export const useFetchFeedbacks = (
  page: number,
  limit: number,
  status: string | null = null
) => {
  return useQuery({
    queryKey: ["feedbacks", page, limit, status],
    queryFn: () => fetchFeedbacks(page, limit, status),
  });
};

export const useFetchApprovedFeedbacks = (
  page: number,
  limit: number,
  status: string | null = null
) => {
  return useQuery({
    queryKey: ["feedbacks", page, limit, status],
    queryFn: () => fetchApprovedFeedbacks(page, limit, status),
  });
};

// ======================= Fetch Feedback by ID ======================= //

export const useFetchFeedbackById = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["feedback", id],
    queryFn: () => fetchFeedbackById(id),
    retry: 0,
    enabled,
    select: (data) => data || null,
  });
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
      toast.success("Feedback deleted successfully");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to delete feedback");
    },
  });
};
