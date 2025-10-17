import api from "./api";

// Get all members with pagination
export const fetchAllMembers = async (page: number = 1, limit: number = 10) => {
  const { data } = await api.get(`/web/member/getAllMembers?page=${page}&limit=${limit}`);
  return data;
};

// Get single member by ID
export const fetchMemberById = async (id: string) => {
    const { data } = await api.get(`/web/member/getMemberById/${id}`);
    return data;
};



