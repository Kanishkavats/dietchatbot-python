// src/services/bannerApi.ts
import { BannerFormValues } from "../utils/validations/FormValidation";
import api from "./api";

//  Create a banner
export const createBanner = async (banner: BannerFormValues) => {
  const { data } = await api.post("/api/V1/banner/add-banner", banner);
  return data;
};

//  Get all banners with pagination
export const fetchAllBanners = async (page: number = 1, limit: number = 10) => {
  const { data } = await api.get(`/api/V1/banner/getAllBanners?page=${page}&limit=${limit}`);
  return data;
};

//  Get single banner by ID
export const fetchBannerById = async (id: string) => {
  const { data } = await api.get(`/api/V1/banner/getBannerById/${id}`);
  return data;
};

//  Update banner
export const updateBanner = async (id: string, banner: Partial<BannerFormValues>) => {
  const { data } = await api.put(`/api/V1/banner/update-banner/${id}`, banner);
  return data;
};

//  Delete banner
export const deleteBanner = async (id: string) => {
  const { data } = await api.delete(`/api/V1/banner/delete-banner/${id}`);
  return data;
};
