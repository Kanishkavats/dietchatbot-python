// src/hooks/useComment.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
  fetchCommentsById,
} from "../services/commentsApi";

// ======================= Fetch all Comments ======================= //
export const useFetchComments = () => {
  return useQuery({
    queryKey: ["comments"],
    queryFn: fetchComments,
  });
};

// ======================= Fetch single Comment ======================= //

export const useFetchCommentById = (id: string, enabled: boolean = true) => {
  
  return useQuery({
    queryKey: ["comment", id],
    queryFn: () => fetchCommentsById(id),
    retry:0,
    // enabled:  enabled, 
  });
};



// ======================= Create Comment ======================= //
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Comment created successfully");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create comment");
    },
  });
};

// ======================= Update Comment ======================= //
export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { content: string; author?: string } }) =>
      updateComment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Comment updated successfully");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update comment");
    },
  });
};

// ======================= Delete Comment ======================= //
export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Comment deleted successfully");
    },
    onError: (err: any) => {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to delete comment");
    },
  });
};
