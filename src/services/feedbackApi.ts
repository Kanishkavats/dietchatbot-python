import api from "./api";

// Fetch all feedbacks
export const fetchFeedbacks = async (page: number, limit: number, status: string | null) => {
  const statusQuery = status && status !== "all" ? `&status=${status}` : "";
  const { data } = await api.get(`/admin/feedback/getAllFeedback?page=${page}&limit=${limit}&${statusQuery}`);
  return data;
};
export const fetchApprovedFeedbacks = async (page: number, limit: number, status: string | null) => {
  const statusQuery = status && status !== "all" ? `&status=${status}` : "";
  const { data } = await api.get(`/web/feedback/get-feedback?page=${page}&limit=${limit}&${statusQuery}`);
  return data;
};

// Fetch single feedback by ID
export const fetchFeedbackById = async (id: string) => {
  const { data } = await api.get(`/admin/feedback/getFeedbackById/${id}`);
  return data;
};

// Create feedback
export const createFeedback = async (formData: FormData) => {
  const { data } = await api.post(`/web/feedback/add-feedback`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return data;
};

//  Update feedback (e.g. for moderation)
export const updateFeedback = async (
  id: string,
  updateData: {
    approved?: boolean;
    status?: string;
  }
) => {
  const { data } = await api.put(`/admin/feedback/moderate-feedback/${id}`, updateData);
  return data;
};

// Delete feedback
export const deleteFeedback = async (id: string) => {
  const { data } = await api.delete(`/admin/feedback/delete-feedback/${id}`);
  return data;
};
