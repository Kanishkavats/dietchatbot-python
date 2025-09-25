// src/hooks/useQueries.ts
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { QueryFormValues } from "../utils/validations/FormValidation";
import { deleteQuery, fetchAllQueries, fetchQueryById, updateQuery } from "../services/queryApi";

// ✅ Fetch all queries (paginated)
export const useFetchAllQueries = (page: number, limit: number = 10) => {
  return useQuery({
    queryKey: ["queries", page, limit],
    queryFn: () => fetchAllQueries(page, limit),
    placeholderData: keepPreviousData,
  });
};

// ✅ Fetch a single query by ID
export const useFetchSingleQuery = (id?: string) => {
  return useQuery({
    queryKey: ["query", id],
    queryFn: () => fetchQueryById(id!),
  });
};

// ✅ Delete query
export const useDeleteQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteQuery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queries"] });
      toast.success("Query deleted successfully");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to delete query");
    },
  });
};

// ✅ Update query (e.g., mark as viewed)
export const useUpdateQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: Partial<QueryFormValues> }) =>
      updateQuery(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queries"] });
      toast.success("Query updated");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to update query");
    },
  });
};

// ✅ Only update `isViewed` once
export const useMarkQueryAsViewed = () => {
  const updateMutation = useUpdateQuery();
  return (query: { id: string; isViewed: boolean }) => {
    if (!query.isViewed) {
      updateMutation.mutate({
        id: query.id,
        values: { isViewed: true },
      });
    }
  };
};

export const submitQueryForm = (
  id: string,
  values: Partial<QueryFormValues>,
  updateMutation: ReturnType<typeof useUpdateQuery>,
  setSubmitting: (isSubmitting: boolean) => void,
  onClose: () => void
) => {
  toast.dismiss();
  toast.loading("Updating query...");

  updateMutation.mutate(
    { id, values },
    {
      onSuccess: () => {
        toast.dismiss();
        toast.success("Query updated successfully");
        setSubmitting(false);
        onClose();
      },
      onError: (err: any) => {
        toast.dismiss();
        toast.error(err?.message || "Failed to update query");
        setSubmitting(false);
      },
    }
  );
};
