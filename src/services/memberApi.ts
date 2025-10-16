import { MemberFormValues } from "../utils/validations/FormValidation";
import api from "./api";
import { makeApiPath } from "./apiConfig";
import axios from "axios";

const BASE = makeApiPath("member");

// Create a member
export const createMember = async (member: MemberFormValues) => {
  const { data } = await api.post("/admin/member/add-member", member);
  return data;
};

// Get all members with pagination
export const fetchAllMembers = async (page: number = 1, limit: number = 10,search?:string) => {
  const { data } = await api.get(`/web/member/getAllMembers?page=${page}&limit=${limit}&search=${search}`);
  return data;
};





// Create a public API instance for web endpoints (no authentication required)
const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add language headers to public API
publicApi.interceptors.request.use((config) => {
  const currentLang = typeof window !== 'undefined' ? (localStorage.getItem('lang') || 'en') : 'en';
  if (config.headers) {
    config.headers['Accept-Language'] = currentLang;
    config.headers['X-Language'] = currentLang;
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

// Get single member by ID
export const fetchMemberById = async (id: string) => {
  console.log('fetchMemberById called with id:', id);
  
  try {
    // Try public web endpoint first (no authentication required)
    console.log('Trying public web endpoint...');
    const { data } = await publicApi.get(`/web/member/getMemberById/${id}`);
    console.log('fetchMemberById web response:', data);
    return transformMemberData(data);
  } catch (webError) {
    console.log('Web endpoint failed, trying authenticated admin endpoint:', webError);
    
    // Check if user is authenticated
    const token = typeof window !== 'undefined' ? document.cookie.split(';').find(c => c.trim().startsWith('token=')) : null;
    
    if (!token) {
      console.log('No authentication token found, cannot access admin endpoint');
      throw new Error('Authentication required to access member details. Please log in.');
    }
    
    try {
      // Fallback to admin endpoint (requires authentication)
      const { data } = await api.get(`/admin/member/getMemberById/${id}`);
      console.log('fetchMemberById admin response:', data);
      return transformMemberData(data);
    } catch (adminError) {
      console.error('Both endpoints failed:', { webError, adminError });
      
      // Provide more specific error messages
      if (adminError.response?.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      } else if (adminError.response?.status === 404) {
        throw new Error('Member not found.');
      } else {
        throw new Error(`Failed to fetch member: ${adminError.message || adminError}`);
      }
    }
  }
};

// Transform API data to TeamMember format
const transformMemberData = (apiData: any) => {
  if (!apiData) return null;
  
  // Handle different response structures
  const member = apiData.member || apiData.data || apiData;
  
  if (!member) return null;
  
  // Get current language from i18n or localStorage
  const currentLang = typeof window !== 'undefined' 
    ? (localStorage.getItem('i18nextLng') || localStorage.getItem('lang') || 'en') 
    : 'en';
  
  // Transform bilingual fields to simple strings
  const transformedData = {
    id: member.id,
    name: typeof member.name === 'object' ? member.name[currentLang] || member.name.en || member.name : member.name,
    position: typeof member.position === 'object' ? member.position[currentLang] || member.position.en || member.position : member.position,
    title: member.title ? (typeof member.title === 'object' ? member.title[currentLang] || member.title.en || member.title : member.title) : undefined,
    description: member.description ? (typeof member.description === 'object' ? member.description[currentLang] || member.description.en || member.description : member.description) : undefined,
    about: member.about ? (typeof member.about === 'object' ? member.about[currentLang] || member.about.en || member.about : member.about) : undefined,
    image: member.image || member.img,
    imageUrl: member.image || member.img,
    facebookUrl: member.facebookUrl,
    twitterUrl: member.twitterUrl,
    instagramUrl: member.instagramUrl,
    linkedInUrl: member.linkedInUrl,
    vimeoUrl: member.vimeoUrl,
    behanceUrl: member.behanceUrl,
    role: member.role,
    delay: 0
  };
  
  console.log('Transformed member data:', transformedData);
  return transformedData;
};

//  Update member
export const updateMember = async (id: string, member: Partial<MemberFormValues>) => {
  const { data } = await api.put(`/admin/member/update-member/${id}`, member);
  return data;
};

//  Delete member
export const deleteMember = async (id: string) => {
  const { data } = await api.delete(`/admin/member/delete-member/${id}`);
  return data;
};


