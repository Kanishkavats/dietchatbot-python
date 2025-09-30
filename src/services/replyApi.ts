import api from "./api";

export const addReply = async (id: string|null,
  reply: { name: string; comment: string; email: string }) => {

  const { data } = await api.post(`/comment/reply-comment/${id}`, reply);
  return data;
};