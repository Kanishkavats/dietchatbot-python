import { DetailsFormValues } from "../utils/validations/FormValidation"
import api from "./api"
import { SendMsgFormValues } from "../utils/validations/FormValidation";
import { ContactFormValues } from "../components/Contact/ContactForm";

import { VolunteerValues } from "../utils/validations/FormValidation";




export const fetchFeedback = async () => {
  const { data } = await api.get(`/web/feedback/get-feedback`);
  return data.feedback; // sirf feedback array return karenge
};


export const VolunteerInformationForm = async (values: VolunteerValues) => {
  const { data } = await api.post(`/web/form/become-volunteer`, values);
  return data;
};



export const SendMsgInformationForm = async (values: SendMsgFormValues) => {
  const { data } = await api.post(`/web/form/donation-message`, values);
  return data;
};

export const DetailsInformationForm = async (values:DetailsFormValues) =>{
    const { data } = await api.post(`/web/form/detail-information`, values);
    return data;
}

export const ContactUsForm = async (values:ContactFormValues) => {
  const { data } = await api.post(`/web/form/contact-query`, values);
  return data;
};

export const NewsletterEmailForm = async (email: string) => {
  const { data } = await api.post(`/web/email/add-email`, { email });
  return data;
};