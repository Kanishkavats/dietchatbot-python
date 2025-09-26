import { DetailsFormValues } from "../utils/validations/FormValidation"
import api from "./api"
export const DetailsInformationForm = async (values:DetailsFormValues) =>{
    const { data } = await api.post(`/form/detail-information`, values);
    return data;
}