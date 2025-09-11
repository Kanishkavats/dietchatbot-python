import { CampaignFormProps } from "@/src/types/campaign";
import { CampaignFormValues } from "@/src/utils/validations/FormValidation";
import toast from "react-hot-toast";

// Convert values to FormData
const buildFormData = (values: CampaignFormValues) => {
  const formData = new FormData();
  formData.append("title", values.title);
  formData.append("category", values.category);
  formData.append("description", values.description);
  formData.append("goalAmount", values.goalAmount.toString());
  formData.append("summary", values.summary);
  formData.append("location", values.location);

  // keyPoints as array
  if(!values.keyPoints) values.keyPoints = [];
  values.keyPoints.forEach((point) => formData.append("keyPoints[]", point));

  //  images as files, only if defined
  if (values.images && values.images.length > 0) {
    values.images.forEach((file) => {
      if (file instanceof File) {
        formData.append("images", file);
      }
    });
  }

  return formData;
};


//  function to create campaign
const handleCreateCampaign = (
  values: CampaignFormValues,
  createMutation: any,
  resetForm: () => void,
  setSubmitting: (isSubmitting: boolean) => void,
  onClose: () => void
) => {
  toast.dismiss();
  toast.loading("Creating campaign...");
  console.log(values)
  const formData = buildFormData(values); 

  // console.log("formData:", ...formData.entries())

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

// function to update campaign
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

  const formData = buildFormData(values); // <- changed here

  updateMutation.mutate(
    { id, values: formData }, // send FormData
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

// ✅ function to handle form submission
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
    handleUpdateCampaign(
      initialData.id.toString(),
      values,
      updateMutation,
      resetForm,
      setSubmitting,
      onClose
    );
  } else {
    handleCreateCampaign(
      values,
      createMutation,
      resetForm,
      setSubmitting,
      onClose
    );
  }
};
