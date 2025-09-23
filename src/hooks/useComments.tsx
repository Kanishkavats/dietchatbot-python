// src/hooks/useComment.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
  fetchCommentsById,
  fetchgetcomments
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
    retry: 0,
    enabled,
    select: (data) => data.comments || [], // return only comments array
  });
};


//fetch by id 
export const useFetchgetcomments  = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["comment", id],
    queryFn: () => fetchgetcomments(id),
    retry: 0,
    enabled,
    select: (data) => data.comments || [], // return only comments array
  });
};





// ======================= Create Comment ======================= //
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:  ({ id, data }: { id: string; data: { comment: string; name: string; email: string } }) =>
      createComment(id, data), 
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      toast.error(err?.response?.data?.message || "Failed to delete comment");
    },
  });
};
