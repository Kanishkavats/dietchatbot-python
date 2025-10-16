
import { fetchAllCampaigns, fetchCampaignById} from "../services/campaignApi";
import { useLanguageAwareQuery } from "./useLanguageAwareQuery";


// ✅ Fetch campaigns with pagination (language-aware)
export const useFetchAllCampaigns = (page: number, limit: number = 10,searchText="All") => {
  return useLanguageAwareQuery(
    ["campaigns", page, limit,searchText], // different cache per page+limit
    () => fetchAllCampaigns(page, limit,searchText),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};


export const useFetchSingleCampaign = (id?: string,options?: { enabled?: boolean }) => {
  return useLanguageAwareQuery(
    ["campaign", id],
    () => fetchCampaignById(id!),
    {
      enabled: options?.enabled ?? !!id,
      staleTime: 5 * 60 * 1000, 
    }
  );
};


