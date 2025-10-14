
import { CampaignFormValues } from "../../../utils/validations/FormValidation";
import api from "../../../services/api";


export const createEvent = async (campaign: CampaignFormValues) => {
  const { data } = await api.post("/admin/event/add-event", campaign);
  return data;
};


export const fetchAllEvent = async (page: number = 1, limit: number = 2) => {
  const { data } = await api.get(`/admin/event/getAllEvents?page=${page}&limit=${limit}`);
//   console.log(data);
  return data;
};



export const fetchEventById = async (id: string) => {
  const { data } = await api.get(`/admin/getEventById/${id}`);
  return data;
};


export const updateEvent = async (id: string, campaign: Partial<CampaignFormValues>) => {
  const { data } = await api.put(`/admin/event/update-event/${id}`, campaign);
  return data;
};


export const deleteSingleEvent = async (id: string) => {
  const { data } = await api.delete(`/admin/event/delete-event/${id}`);
  return data;
};
