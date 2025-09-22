// src/services/commentApi.ts
import api from "./api";

// ✅ Fetch all comments
export const fetchComments = async () => {
  const { data } = await api.get("/api/V1/comment/getAllComments");
  return data;
};

// ✅ Fetch comments by blog ID
export const fetchCommentsById = async (id: string) => {
  console.log("id => ", id);

  const { data } = await api.get(`/api/V1/comment/getcommentsById/${id}`);
  console.log(data);
  return data;
};

//fetch get-comment by id 
export const fetchgetcomments = async (id: string) => {
  console.log("id => ", id);

  const { data } = await api.get(`/api/V1/comment/get-comments/${id}`);
  console.log(data);
  return data;
};


// ✅ Create a new comment
export const createComment = async (   id: string,
  comment: { name: string; comment: string; email: string  }) => {
  console.log("Creating comment", comment);
  
   const { data } = await api.post(`/api/V1/comment/add-comment/${id}`, comment);
  console.log("comment successfully");
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
