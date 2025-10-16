import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { fetchAllBanners } from "../services/bannerApi";

// ✅ Fetch banners with pagination
export const useFetchAllBanners = (page: number, limit: number = 10) => {
    return useQuery({
        queryKey: ["banners", page, limit],
        queryFn: () => fetchAllBanners(page, limit),
        placeholderData: keepPreviousData,

    });
};
