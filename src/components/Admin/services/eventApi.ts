
import { CampaignFormValues } from "../../../utils/validations/FormValidation";
import api from "../../../services/api";


export const createEvent = async (campaign: CampaignFormValues) => {
  const { data } = await api.post("/admin/event/add-event", campaign);
  return data;
};


export const fetchAllEvent = async (page: number = 1, limit: number = 2,search?:string,eventStatus?:string) => {
  let url = `/admin/event/getAllEvents?page=${page}&limit=${limit}`;

  
  if (eventStatus && eventStatus.trim() !== "") {
    url += `&status=${encodeURIComponent(eventStatus)}`;
  } else if (search && search.trim() !== "") {
    url += `&search=${encodeURIComponent(search)}`;
  }

  const { data } = await api.get(url);
//   console.log(data);
  return data;
};



export const fetchEventById = async (id: string) => {
  const { data } = await api.get(`/admin/event/getEventById/${id}`);
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
