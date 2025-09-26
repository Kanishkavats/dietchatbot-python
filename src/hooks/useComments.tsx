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

export const useFetchComments = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["comments", page, limit],
    queryFn: () => fetchComments(page, limit),
  });
};


// ======================= Fetch single Comment ======================= //


export const useFetchCommentById = (id: string) => {

  return useQuery({
    queryKey: ["comment", id],
    queryFn: () => fetchCommentsById(id),
    retry: 0,
    select: (data) => data || [], 
  });
};


//fetch by id 
export const useFetchgetcomments = (id: string, enabled: boolean = true) => {
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
    mutationFn: ({ id, data }: { id: string; data: { comment: string; name: string; email: string } }) =>
      createComment(id, data),
    onSuccess: (data, variables) => {
      console.log(" comment", data)

      // 1. Get existing comments
      const existingComments = JSON.parse(localStorage.getItem("LocalComments") || "[]");

      // 2. Create new comment with proper structure
      const newComment = {
        id: data.comment?.id || `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: variables.data.name,
        comment: variables.data.comment,
        email: variables.data.email,
        blogId: variables.id, // Add the blogId
        isPending: true,
        createdAt: new Date().toISOString(),
        timeAgo: "Just now",
        likeCount: 0
      };

      // 3. Add new comment to localStorage
      const updatedComments = [...existingComments, newComment];
      localStorage.setItem("LocalComments", JSON.stringify(updatedComments));

      // 4. Invalidate the specific query for this blog
      queryClient.invalidateQueries({ queryKey: ["comments", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["comment", variables.id] });
      
      // 5. Dispatch custom event to notify components
      window.dispatchEvent(new CustomEvent('commentAdded', { 
        detail: { blogId: variables.id, comment: newComment } 
      }));
      
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
    mutationFn: ({ id, data }: { id: string; data: { content: string; author?: string, approved: boolean } }) =>
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
      toast.error(err?.response?.data?.message || "Failed to delete comment");
    },
  });
};
