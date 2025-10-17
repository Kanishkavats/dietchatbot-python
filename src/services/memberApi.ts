import api from "./api";

// Get all members with pagination
export const fetchAllMembers = async (page: number = 1, limit: number = 10,search?:string) => {
  const { data } = await api.get(`/web/member/getAllMembers?page=${page}&limit=${limit}&search=${search}`);
  return data;
};

// Get single member by ID
export const fetchMemberById = async (id: string) => {
    const { data } = await api.get(`/web/member/getMemberById/${id}`);
    return data;
};



