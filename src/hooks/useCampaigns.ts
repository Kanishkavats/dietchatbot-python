
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { fetchAllCampaigns, fetchCampaignById, deleteSingleCampaign} from "../services/campaignApi";
import { CampaignFormValues } from "../utils/validations/FormValidation";
import { CampaignFormProps } from "@/src/types/campaign";
import toast from "react-hot-toast";
import { useLanguageAwareQuery } from "./useLanguageAwareQuery";

// Convert values to FormData
const buildFormData = (values: CampaignFormValues) => {
  const formData = new FormData();
  formData.append("title", values.title);
  formData.append("category", values.category);
  formData.append("description", values.description);
  formData.append("goalAmount", values.goalAmount.toString());
  formData.append("summary", values.summary);
  formData.append("location", values.location);
   values.existingImages?.forEach((url) => {
    if (url) formData.append("existingImages[]", url);
  });

  if (!values.keyPoints) values.keyPoints = [];
  values.keyPoints.forEach((point) => formData.append("keyPoints[]", point));

  if (values.images && values.images.length > 0) {
    values.images.forEach((file) => {
      if (file instanceof File) {
        formData.append("images", file);
      }
    });
  }

  return formData;
};


//  function to handle campaign create
const handleCreateCampaign = (
  values: CampaignFormValues,
  createMutation: any,
  resetForm: () => void,
  setSubmitting: (isSubmitting: boolean) => void,
  onClose: () => void
) => {
  toast.dismiss();
  toast.loading("Creating campaign...");
  const formData = buildFormData(values);

  createMutation.mutate(formData, {
    onSuccess: () => {
      toast.dismiss();
      toast.success("Campaign created");
      resetForm();
      setSubmitting(false);
      onClose();
    },
    onError: (err: any) => {
      toast.dismiss();
      toast.error(err?.message || "Failed to create");
      setSubmitting(false);
    },
  });
};

// function to handle campaign update
const handleUpdateCampaign = (
  id: string,
  values: CampaignFormValues,
  updateMutation: any,
  resetForm: () => void,
  setSubmitting: (isSubmitting: boolean) => void,
  onClose: () => void
) => {
  toast.dismiss();
  toast.loading("Updating campaign...");
  const formData = buildFormData(values);

  updateMutation.mutate(
    { id, values: formData },
    {
      onSuccess: () => {
        toast.dismiss();
        toast.success("Campaign updated");
        resetForm();
        setSubmitting(false);
        onClose();
      },
      onError: (err: any) => {
        toast.dismiss();
        toast.error(err?.message || "Failed to update");
        setSubmitting(false);
      },
    }
  );
};

// unified form submit
export const submitCampaignForm = (
  values: CampaignFormValues,
  initialData: CampaignFormProps["initialData"],
  createMutation: any,
  updateMutation: any,
  resetForm: () => void,
  setSubmitting: (isSubmitting: boolean) => void,
  onClose: () => void
) => {
  if (initialData?.id) {
    handleUpdateCampaign(initialData.id.toString(), values, updateMutation, resetForm, setSubmitting, onClose);
  } else {
    handleCreateCampaign(values, createMutation, resetForm, setSubmitting, onClose);
  }
};

// ✅ Fetch campaigns with pagination (language-aware)
export const useFetchAllCampaigns = (page: number, limit: number = 10) => {
  return useLanguageAwareQuery(
    ["campaigns", page, limit], // different cache per page+limit
    () => fetchAllCampaigns(page, limit),
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
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};


//  Delete campaign
export const useDeleteSignleCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSingleCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      toast.success("Campaign deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete campaign");
    }
  });
};


