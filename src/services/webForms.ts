import { DetailsFormValues } from "../utils/validations/FormValidation"
import api from "./api"
import { SendMsgFormValues } from "../utils/validations/FormValidation";

import { VolunteerValues } from "../utils/validations/FormValidation";




export const fetchFeedback = async () => {
  const { data } = await api.get(`/feedback/get-feedback`);
  return data.feedback; // sirf feedback array return karenge
};


export const VolunteerInformationForm = async (values: VolunteerValues) => {
  const { data } = await api.post(`/form/become-volunteer`, values);
  return data;
};



export const SendMsgInformationForm = async (values: SendMsgFormValues) => {
  const { data } = await api.post(`/form/donation-message`, values);
  return data;
};

export const DetailsInformationForm = async (values:DetailsFormValues) =>{
    const { data } = await api.post(`/form/detail-information`, values);
    return data;
}