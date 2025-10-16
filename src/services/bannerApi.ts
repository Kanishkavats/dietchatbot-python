import api from "./api";


//  Get all banners with pagination
export const fetchAllBanners = async (page: number = 1, limit: number = 10) => {
  const { data } = await api.get(`/web/banner/getAllBanners?page=${page}&limit=${limit}`);
  return data;
};


