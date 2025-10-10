
import { CampaignFormValues } from "../../../utils/validations/FormValidation";
import api from "../../../services/api";

// ✅ Create a campaign
export const createCampaign = async (campaign: CampaignFormValues) => {
  const { data } = await api.post("/campaign/add-campaign", campaign);
  return data;
};

// ✅ Get all campaigns
// Get all campaigns with pagination
export const fetchAllCampaigns = async (page: number = 1, limit: number = 2) => {
  const { data } = await api.get(`/campaign/getAllCampaigns?page=${page}&limit=${limit}`);
  return data;
};


// Get single campaign by ID
export const fetchCampaignById = async (id: string) => {
  const { data } = await api.get(`/campaign/getCampaignById/${id}`);
  return data;
};

// Update campaign
export const updateCampaign = async (id: string, campaign: Partial<CampaignFormValues>) => {
  const { data } = await api.put(`/campaign/update-campaign/${id}`, campaign);
  return data;
};

// Delete campaign
export const deleteSingleCampaign = async (id: string) => {
  const { data } = await api.delete(`/campaign/delete-campaign/${id}`);
  return data;
};
