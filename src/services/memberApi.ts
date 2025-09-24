import { MemberFormValues } from "../utils/validations/FormValidation";
import api from "./api";

// Create a member
export const createMember = async (member: MemberFormValues) => {
  const { data } = await api.post("/member/add-member", member);
  return data;
};

// Get all members with pagination
export const fetchAllMembers = async (page: number = 1, limit: number = 10) => {
  const { data } = await api.get(`/member/getAllMembers?page=${page}&limit=${limit}`);
  return data;
};

// Get single member by ID
export const fetchMemberById = async (id: string) => {
  const { data } = await api.get(`/member/getMemberById/${id}`);
  return data;
};

//  Update member
export const updateMember = async (id: string, member: Partial<MemberFormValues>) => {
  const { data } = await api.put(`/member/update-member/${id}`, member);
  return data;
};

//  Delete member
export const deleteMember = async (id: string) => {
  const { data } = await api.delete(`/member/delete-member/${id}`);
  return data;
};
