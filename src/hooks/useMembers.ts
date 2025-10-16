// src/hooks/useMembers.ts
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import {
  // fetchAllMembers,
  fetchMemberById,
  deleteMember,
  createMember,
  updateMember,
} from "../components/Admin/services/memberApi";
import { fetchAllMembers } from "../services/memberApi";
import { MemberFormValues } from "../utils/validations/FormValidation";
import toast from "react-hot-toast";
import { MemberFormProps } from "../types/members";

// ✅ Convert values to FormData (bilingual-aware, mirrors blog implementation)
const buildFormData = (values: MemberFormValues) => {
  const formData = new FormData();

  const appendNestedObject = (key: string, obj: any) => {
    formData.append(key, JSON.stringify(obj));
  };

  // Bilingual fields as JSON strings
  appendNestedObject("name", values.name);
  appendNestedObject("position", values.position);
  if (values.title) appendNestedObject("title", values.title);
  appendNestedObject("description", values.description);
  if (values.about) appendNestedObject("about", values.about);

  // Key points by language
  if (values.keyPoints) {
    appendNestedObject("keyPoints", values.keyPoints);
  }

  // Social Links
  if (values.facebookUrl) formData.append("facebookUrl", values.facebookUrl);
  if (values.twitterUrl) formData.append("twitterUrl", values.twitterUrl);
  if (values.instagramUrl) formData.append("instagramUrl", values.instagramUrl);
  if (values.linkedInUrl) formData.append("linkedInUrl", values.linkedInUrl);

  // Existing Images (support both existingImages[] and legacy existingImage)
  if (Array.isArray(values.existingImages)) {
    values.existingImages.forEach((url) => {
      if (url) formData.append("existingImages[]", url);
    });
  }
  // @ts-ignore - legacy field tolerance
  if ((values as any).existingImage && typeof (values as any).existingImage === "string") {
    // keep API contract consistent
    formData.append("existingImages[]", (values as any).existingImage);
  }

  // Single Image file
  if (values.image && values.image instanceof File) {
    formData.append("image", values.image);
  }

  return formData;
};

// ✅ Handle member create
const handleCreateMember = (
  values: MemberFormValues,
  createMutation: any,
  resetForm: () => void,
  setSubmitting: (isSubmitting: boolean) => void,
  onClose: () => void
) => {
  toast.dismiss();
  toast.loading("Creating member...");
  const formData = buildFormData(values);

  createMutation.mutate(formData, {
    onSuccess: () => {
      toast.dismiss();
      toast.success("Member created successfully");
      resetForm();
      setSubmitting(false);
      onClose();
    },
    onError: (err: any) => {
      toast.dismiss();
      toast.error(err?.message || "Failed to create member");
      setSubmitting(false);
    },
  });
};

// ✅ Handle member update
const handleUpdateMember = (
  id: string,
  values: MemberFormValues,
  updateMutation: any,
  resetForm: () => void,
  setSubmitting: (isSubmitting: boolean) => void,
  onClose: () => void
) => {
  toast.dismiss();
  toast.loading("Updating member...");
  const formData = buildFormData(values);

  updateMutation.mutate(
    { id, values: formData },
    {
      onSuccess: () => {
        toast.dismiss();
        toast.success("Member updated successfully");
        resetForm();
        setSubmitting(false);
        onClose();
      },
      onError: (err: any) => {
        toast.dismiss();
        toast.error(err?.message || "Failed to update member");
        setSubmitting(false);
      },
    }
  );
};

// ✅ Unified member form submit
export const submitMemberForm = (
  values: MemberFormValues,
  initialData: MemberFormProps["initialData"],
  createMutation: any,
  updateMutation: any,
  resetForm: () => void,
  setSubmitting: (isSubmitting: boolean) => void,
  onClose: () => void
) => {
  if (initialData?.id) {
    handleUpdateMember(initialData.id.toString(), values, updateMutation, resetForm, setSubmitting, onClose);
  } else {
    handleCreateMember(values, createMutation, resetForm, setSubmitting, onClose);
  }
};

// ✅ Fetch members with pagination
export const useFetchAllMembers = (page: number, limit: number = 10,search?:string) => {
  return useQuery({
    queryKey: ["members", page, limit,search],
    queryFn: () => fetchAllMembers(page, limit,search),
    placeholderData: keepPreviousData,
  });
};

// ✅ Fetch single member
export const useFetchSingleMember = (id?: string) => {
  console.log('useFetchSingleMember called with id:', id);
  return useQuery({
    queryKey: ["member", id],
    queryFn: () => fetchMemberById(id!),
    enabled: !!id,
    retry: 2,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // 5 minutes - data is considered fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes - keep in cache for 10 minutes
  });
};

// ✅ Delete member
export const useDeleteSingleMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      toast.success("Member deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete member");
    },
  });
};
