// src/hooks/useBlogs.ts
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { fetchAllBlogs, fetchBlogById, deleteSingleBlog, createBlog, updateBlog } from "../services/blogApi";
import { BlogFormValues } from "../utils/validations/FormValidation";
import { BlogFormProps } from "@/src/types/blog";
import toast from "react-hot-toast";

// ✅ Convert values to FormData
const buildFormData = (values: BlogFormValues) => {
  const formData = new FormData();

  // Helper to append nested objects as JSON strings
  const appendNestedObject = (key: string, obj: any) => {
    formData.append(key, JSON.stringify(obj));
  };

  // Append nested objects as JSON strings
  appendNestedObject("title", values.title);
  appendNestedObject("creator", values.creator);
  appendNestedObject("category", values.category);
  appendNestedObject("description", values.description);
  appendNestedObject("summary", values.summary);
  appendNestedObject("quote", values.quote);
  appendNestedObject("quoteAuthor", values.quoteAuthor);
  appendNestedObject("location", values.location);

  // Append tags by language as JSON strings
  if (values.tags) {
    appendNestedObject("tags", values.tags);
  }

  // Append keyPoints by language as JSON strings
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



// ✅ Handle blog create
const handleCreateBlog = (
  values: BlogFormValues,
  createMutation: any,
  resetForm: () => void,
  setSubmitting: (isSubmitting: boolean) => void,
  onClose: () => void
) => {
  toast.dismiss();
  toast.loading("Creating blog...");
  const formData = buildFormData(values);

  console.log("formted", formData)

  createMutation.mutate(formData, {
    onSuccess: () => {
      toast.dismiss();
      toast.success("Blog created successfully");
      resetForm();
      setSubmitting(false);
      onClose();
    },
    onError: (err: any) => {
      toast.dismiss();
      toast.error(err?.message || "Failed to create blog");
      setSubmitting(false);
    },
  });
};

// ✅ Handle blog update
const handleUpdateBlog = (
  id: string,
  values: BlogFormValues,
  updateMutation: any,
  resetForm: () => void,
  setSubmitting: (isSubmitting: boolean) => void,
  onClose: () => void
) => {
  toast.dismiss();
  toast.loading("Updating blog...");
  const formData = buildFormData(values);

  updateMutation.mutate(
    { id, values: formData },
    {
      onSuccess: () => {
        toast.dismiss();
        toast.success("Blog updated successfully");
        resetForm();
        setSubmitting(false);
        onClose();
      },
      onError: (err: any) => {
        toast.dismiss();
        toast.error(err?.message || "Failed to update blog");
        setSubmitting(false);
      },
    }
  );
};

// ✅ Unified blog form submit
export const submitBlogForm = (
  values: BlogFormValues,
  initialData: BlogFormProps["initialData"],
  createMutation: any,
  updateMutation: any,
  resetForm: () => void,
  setSubmitting: (isSubmitting: boolean) => void,
  onClose: () => void
) => {
  if (initialData?.id) {
    handleUpdateBlog(initialData.id.toString(), values, updateMutation, resetForm, setSubmitting, onClose);
  } else {
    handleCreateBlog(values, createMutation, resetForm, setSubmitting, onClose);
  }
};

// ✅ Fetch blogs with pagination
export const useFetchAllBlogs = (page: number, limit: number = 10,searchText?:string) => {
  return useQuery({
    queryKey: ["blogs", page, limit,searchText],
    queryFn: () => fetchAllBlogs(page, limit,searchText),
    placeholderData: keepPreviousData,
  });
};

// Fetch single blog
export const useFetchSingleBlog = (id?: string) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id!),
    enabled: !!id,
  });
};

// ✅ Delete blog
export const useDeleteSingleBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSingleBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete blog");
    },
  });
};
