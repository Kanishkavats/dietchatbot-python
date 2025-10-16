
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { createEvent,deleteSingleEvent,fetchAllEvent,fetchEventById,updateEvent} from "../services/eventApi";
import { CampaignFormValues, EventFormValues } from "@/src/utils/validations/FormValidation";
import { CampaignFormProps } from "@/src/types/campaign";
import toast from "react-hot-toast";
import { useLanguageAwareQuery } from "@/src/hooks/useLanguageAwareQuery";
import { EventFormProps } from "../types/event";

// Convert values to FormData
const buildFormData = (values: CampaignFormValues) => {
  const formData = new FormData();

  const appendNestedObject = (key: string, obj: any) => {
    formData.append(key, JSON.stringify(obj));
  };

  appendNestedObject("title", values.title);
  appendNestedObject("category", values.category);
  appendNestedObject("description", values.description);
  appendNestedObject("summary", values.summary);
  appendNestedObject("location", values.location);

  // Goal amount
  formData.append("goalAmount", values.goalAmount.toString());

  // KeyPoints by language
  if (values.keyPoints) {
    appendNestedObject("keyPoints", values.keyPoints);
  }

  // Existing images URLs
  values.existingImages?.forEach((url) => {
    if (url) formData.append("existingImages[]", url);
  });

  // New image files
  if (values.images && values.images.length > 0) {
    values.images.forEach((file) => {
      if (file instanceof File) {
        formData.append("images", file);
      }
    });
  }

  return formData;
};



const handleCreatEvent = (
  values: CampaignFormValues,
  createMutation: any,
  resetForm: () => void,
  setSubmitting: (isSubmitting: boolean) => void,
  onClose: () => void
) => {
  toast.dismiss();
  toast.loading("Creating Event...");
  const formData = buildFormData(values);

  createMutation.mutate(formData, {
    onSuccess: () => {
      toast.dismiss();
      toast.success("Event created");
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


const handleUpdateEvent = (
  id: string,
  values: CampaignFormValues,
  updateMutation: any,
  resetForm: () => void,
  setSubmitting: (isSubmitting: boolean) => void,
  onClose: () => void
) => {
  toast.dismiss();
  toast.loading("Updating event...");
  const formData = buildFormData(values);

  updateMutation.mutate(
    { id, values: formData },
    {
      onSuccess: () => {
        toast.dismiss();
        toast.success("event updated");
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


export const submitEventForm = (
  values: EventFormValues,
  initialData: EventFormProps["initialData"],
  createMutation: any,
  updateMutation: any,
  resetForm: () => void,
  setSubmitting: (isSubmitting: boolean) => void,
  onClose: () => void
) => {
//   if (initialData?.id) {
//     handleUpdateCampaign(initialData.id.toString(), values, updateMutation, resetForm, setSubmitting, onClose);
//   } else {
//     handleCreateCampaign(values, createMutation, resetForm, setSubmitting, onClose);
//   }
};


export const useFetchAllEvent = (page: number, limit: number = 10,search?:string,eventStatus?:string) => {
  return useLanguageAwareQuery(
    ["event", page, limit,search], 
    () => fetchAllEvent(page, limit,search),
    {
      staleTime: 5 * 60 * 1000, 
    }
  );
};


export const useFetchSingleEvent = (id?: string,options?: { enabled?: boolean }) => {
    console.log(id)
  return useLanguageAwareQuery(
    ["event", id],
    () => fetchEventById(id!),
    {
      enabled: options?.enabled ?? !!id,
      staleTime: 5 * 60 * 1000, 
    }
  );
};



export const useDeleteSingleEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSingleEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event"] });
      toast.dismiss();
      toast.success("event deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to event campaign");
    }
  });
};


