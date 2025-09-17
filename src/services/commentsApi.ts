// src/services/commentApi.ts
import api from "./api";

// ✅ Fetch all comments
export const fetchComments = async () => {
  const { data } = await api.get("/api/V1/comment/getAllComments");
  return data;
};

// ✅ Create a new comment
export const createComment = async (comment: { author: string; content: string }) => {
  console.log("Creating comment", comment);
  const { data } = await api.post("/api/V1/comment/create-comment", comment);
  return data;
};

// ✅ Update a comment
export const updateComment = async (
  id: string,
  comment: { author?: string; content: string }
) => {
  const { data } = await api.put(`/api/V1/comment/update-comment/${id}`, comment);
  return data;
};

// ✅ Delete a comment
export const deleteComment = async (id: string) => {
  const { data } = await api.delete(`/api/V1/comment/delete-comment/${id}`);
  return data;
};
