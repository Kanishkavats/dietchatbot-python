
// src/services/commentApi.ts
import { RepliesResponse } from "../../../types/comments";
import api from "../../../services/api";

// ✅ Fetch all comments
export const fetchComments = async (page: number, limit: number, status: string | null) => {
  const { data } = await api.get(`/comment/getAllComments?page=${page}&limit=${limit}&status=${status}`);
  return data;
};

// ✅ Fetch comments by blog ID
export const fetchCommentsById = async (id: string) => {
  const { data } = await api.get(`/comment/getCommentById/${id}`);
  return data;
};

//fetch get-comment by id 
export const fetchgetcomments = async (id: string) => {
  const { data } = await api.get(`/comment/get-comments/${id}`);
  return data;
};


// ✅ Create a new comment
export const createComment = async (id: string,
  comment: { name: string; comment: string; email: string }) => {

  const { data } = await api.post(`/comment/add-comment/${id}`, comment);
  return data;
};

// ✅ Update a comment
export const updateComment = async (
  id: string,
  comment: { approved: boolean; }
) => {
  const { data } = await api.put(`/comment/moderate-comment/${id}`, comment);
  return data;
};

// ✅ Delete a comment
export const deleteComment = async (id: string) => {
  const { data } = await api.delete(`/comment/delete-comment/${id}`);
  return data;
};

// ✅ Like/Unlike a comment
export const likeComment = async (commentId: string, change: number) => {
  const { data } = await api.post(`/comment/like-comment/${commentId}`, { change });
  return data;
};

// Add reply
export const addReply = async (id: string|null,
  reply: { name: string; comment: string; email: string }) => {

  const { data } = await api.post(`/comment/reply-comment/${id}`, reply);
  return data;
};

//get replies by comment id
export const getRepliesByCommentId=async(id:string|null,page:number,limit:number)=>{

  const {data} =await api.get<RepliesResponse>(`/comment/get-replies/${id}?page=${page}&limit=${limit}`);
  return data;
}
