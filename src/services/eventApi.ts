// src/services/eventApi.ts
import api from "./api";

// Event interface matching API response
export interface ApiEvent {
  id: string;
  title: string;
  description: string;
  summary: string;
  keyPoints: string[];
  images: string[];
  location: string;
  latitude: number;
  longitude: number;
  startTime: string;
  endTime: string;
}

export interface EventsResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  events: ApiEvent[];
}

// ✅ Get all events with pagination
export const fetchAllEvents = async (page: number = 1, limit: number = 10) => {
  const { data } = await api.get(`/web/event/getAllEvents?page=${page}&limit=${limit}` , {
    headers: {
      'Accept-Language': 'en',
      'X-Language': 'en',
    }
  });
  return data;
};

// ✅ Get single event by ID
export const fetchEventById = async (id: string) => {  
  const { data } = await api.get(`/web/event/getEventById/${id}`, {
    headers: {
      'Accept-Language': 'en',
      'X-Language': 'en',
    }
  });
  return data;
};
