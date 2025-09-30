import { DetailsFormValues } from "../utils/validations/FormValidation"
import api from "./api"
import { SendMsgFormValues } from "../utils/validations/FormValidation";
import { ContactFormValues } from "../components/Contact/ContactForm";


export const SendMsgInformationForm = async (values: SendMsgFormValues) => {
  const { data } = await api.post(`/form/donation-message`, values);
  return data;
};

export const DetailsInformationForm = async (values:DetailsFormValues) =>{
    const { data } = await api.post(`/form/detail-information`, values);
    return data;
}

export const ContactUsForm = async (values:ContactFormValues) => {
  const { data } = await api.post(`/form/contact-query`, values);
  return data;
};