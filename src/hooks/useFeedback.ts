// src/hooks/useFeedback.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  fetchFeedbacks,
  fetchFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} from "@/src/services/feedbackApi";
import { FeedbackFormValues } from "../utils/validations/FormValidation";

// ======================= Fetch All Feedbacks ======================= //

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

export const useCreateFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FeedbackFormValues) => createFeedback(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      toast.success("Feedback created successfully");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create feedback");
    },
  });
};

// ======================= Update Feedback ======================= //

export const useUpdateFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: Partial<FeedbackFormValues> }) =>
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
