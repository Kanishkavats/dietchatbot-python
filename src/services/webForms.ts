import { DetailsFormValues } from "../utils/validations/FormValidation"
import api from "./api"
import { SendMsgFormValues } from "../utils/validations/FormValidation";


export const SendMsgInformationForm = async (values: SendMsgFormValues) => {
  const { data } = await api.post(`/form/donation-message`, values);
  return data;
};

export const DetailsInformationForm = async (values:DetailsFormValues) =>{
    const { data } = await api.post(`/form/detail-information`, values);
    return data;
}