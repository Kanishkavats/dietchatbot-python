// src/services/bannerApi.ts
import { BannerFormValues } from "../../../utils/validations/FormValidation";
import api from "../../../services/api";

//  Create a banner
export const createBanner = async (banner: BannerFormValues) => {
  const { data } = await api.post("/admin/banner/add-banner", banner);
  return data;
};

//  Get all banners with pagination
export const fetchAllBanners = async (page: number = 1, limit: number = 10,search?:string) => {
  const { data } = await api.get(`/admin/banner/getAllBanners?page=${page}&limit=${limit}&search=${search}`);
  return data;
};

//  Get single banner by ID
export const fetchBannerById = async (id: string) => {
  const { data } = await api.get(`/admin/banner/getBannerById/${id}`);
  return data;
};

//  Update banner
export const updateBanner = async (id: string, banner: Partial<BannerFormValues>) => {
  console.log(banner.title)
  const { data } = await api.put(`/admin/banner/update-banner/${id}`, banner);
  return data;
};

//  Delete banner
export const deleteBanner = async (id: string) => {
  const { data } = await api.delete(`/admin/banner/delete-banner/${id}`);
  return data;
};
