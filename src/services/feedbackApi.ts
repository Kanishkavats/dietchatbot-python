import api from "./api";

// Fetch all feedbacks
export const fetchFeedbacks = async (page: number, limit: number, status: string | null) => {
  const statusQuery = status && status !== "all" ? `&status=${status}` : "";
  const { data } = await api.get(`/feedback/getAllFeedback?page=${page}&limit=${limit}&${statusQuery}`);
  return data;
};

// Fetch single feedback by ID
export const fetchFeedbackById = async (id: string) => {
  const { data } = await api.get(`/feedback/getFeedbackById/${id}`);
  return data;
};

// Create feedback
export const createFeedback = async (feedback: {
  name: string;
  designation: string;
  feedback: string;
  rating: number;
  imageUrl?: any;
}) => {
  const { data } = await api.post(`/feedback/addFeedback`, feedback);
  return data;
};

//  Update feedback (e.g. for moderation)
export const updateFeedback = async (
  id: string,
  updateData: {
    approved?: boolean;
    status?: "approved" | "rejected";
  }
) => {
  const { data } = await api.put(`/feedback/moderate-feedback/${id}`, updateData);
  return data;
};

// Delete feedback
export const deleteFeedback = async (id: string) => {
  const { data } = await api.delete(`/feedback/deleteFeedback/${id}`);
  return data;
};
