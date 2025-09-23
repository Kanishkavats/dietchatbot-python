// src/services/commentApi.ts
import api from "./api";

// ✅ Fetch all comments
export const fetchComments = async () => {
  const { data } = await api.get("/api/V1/comment/getAllComments");
  return data;
};

// ✅ Fetch comments by blog ID
export const fetchCommentsById = async (id: string) => {
  const { data } = await api.get(`/api/V1/comment/getCommentById/${id}`);
  return data;
};

// ✅ Create a new comment
export const createComment = async (id: string,
  comment: { name: string; comment: string; email: string }) => {

  const { data } = await api.post(`/api/V1/comment/add-comment/${id}`, comment);
  return data;
};

// ✅ Update a comment
export const updateComment = async (
  id: string,
  comment: { approved: boolean; }
) => {
  const { data } = await api.put(`/api/V1/comment/moderate-comment/${id}`, comment);
  return data;
};

// ✅ Delete a comment
export const deleteComment = async (id: string) => {
  const { data } = await api.delete(`/api/V1/comment/delete-comment/${id}`);
  return data;
};
