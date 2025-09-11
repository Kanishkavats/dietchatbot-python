import { Campaign } from "../components/Admin/Data/staticData";
import { CampaignFormValues } from "../utils/validations/FormValidation";


export interface CampaignFormProps {
  initialData?: Partial<CampaignFormValues> & Partial<Campaign>;
  onClose: () => void;
  readOnly?: boolean; 
}

export interface CampaignColumnCallbacks {
  onEdit: (campaign: Campaign) => void;
  onDelete: (campaign: Campaign) => void;
  onView: (campaign: Campaign) => void;
}
