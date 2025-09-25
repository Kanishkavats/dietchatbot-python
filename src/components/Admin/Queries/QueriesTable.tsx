"use client";

import React, { useState, useMemo, useCallback, useRef } from "react";
import DataTableWrapper from "../Common/DataTableWrapper";
import CustomInput from "../Common/CustomInput";
import Dropdown from "../Common/Dropdown";
import Button from "../../common/Buttons/Button";
import AnimatedReveal from "@/src/animations/AnimatedReveal";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import CustomLoader from "../../common/Loader/CustomLoader";
import AdminCustomPagination from "../Common/CustomePagination";
import Drawer from "../Common/Drawer";

import { getQueryColumns } from "./getQueriesColumns";
import {
  useDeleteQuery,
  useFetchAllQueries,
  useFetchSingleQuery,
} from "@/src/hooks/useQueries";
import { Query, QueryFormValues } from "@/src/types/query";
import QueryForm from "./QueryForm";
import QueryPreview from "./QueryPreview";

const QueriesTable = () => {
  // Search state
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<keyof Query>("title");

  // Drawer / mode state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [queryId, setqueryId] = useState<string | null>(null);
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [previewData, setPreviewData] = useState<Query | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const queryClient = useQueryClient();

  // Fetch paginated data
  const { data: allData, isLoading } = useFetchAllQueries(currentPage, itemsPerPage);
  const totalPages = allData?.totalPages ?? 1;

  // Fetch single query for view/edit
  const { data: singleData, isLoading: isSingleLoading, refetch: refetchSingle } =
    useFetchSingleQuery(queryId ?? undefined);

  // Delete mutation
  const { mutate: deleteQuery } = useDeleteQuery();

  // Create mutation (you need to import createQuery API)
  const createMutation = useMutation({
    mutationFn: (values: QueryFormValues) => {
      // Implement createQuery service similar to createBanner
      // e.g. return createQuery(values);
      throw new Error("createQuery not implemented");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queries"] });
      setDrawerOpen(false);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: { id: string; values: QueryFormValues }) => {
      throw new Error("updateQuery not implemented");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queries"] });
      setDrawerOpen(false);
    },
  });

  // Handlers
  const handleEdit = useCallback(
    (e: Query) => {
      setqueryId(e.id);
      setMode("edit");
      setDrawerOpen(true);
      refetchSingle();
    },
    [refetchSingle]
  );

  const handleView = useCallback(
    (e: Query) => {
        console.log("check", e)
      setqueryId(e.id);
      setMode("view");
      setPreviewData(e);
      setDrawerOpen(true);
      refetchSingle();
    },
    [refetchSingle]
  );

  const handleDelete = useCallback(
    (e: Query) => {
      if (confirm(`Are you sure you want to delete "${e.title}"?`)) {
        deleteQuery(e.id);
      }
    },
    [deleteQuery]
  );

  // Data for current page
  const paginatedData = useMemo(() => allData?.forms ?? [], [allData]);

  // Client-side filter within current page
  const filteredData = useMemo(() => {
    if (!search) return paginatedData;
    const s = search.toLowerCase();
    return paginatedData.filter((e) =>
      e[searchField]?.toString().toLowerCase().includes(s)
    );
  }, [paginatedData, search, searchField]);

  const columns = useMemo(
    () =>
      getQueryColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
        onView: handleView,
      }),
    [handleEdit, handleDelete, handleView]
  );


const handlePreview = (data: QueryFormValues) => {
  setPreviewData(data);
};
const closePreview = () => setPreviewData(null);


  return (
    <section>
      

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <CustomLoader />
        </div>
      ) : (
        <DataTableWrapper columns={columns} data={filteredData} />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-4">
          <AdminCustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Drawer */}
 {drawerOpen && (
  <Drawer
    isOpen={drawerOpen}
    onClose={() => {
      setDrawerOpen(false);
      setqueryId(null);
      setMode("add");
    }}
    title={mode === "edit" ? "Edit Query" : mode === "view" ? "View Query" : "Add Query"}
    mode={mode}
  >
    {isSingleLoading ? (
      <CustomLoader />
    ) : (
      <QueryForm
        initialData={singleData ?? undefined}
        onClose={() => setDrawerOpen(false)}
        mode={mode}
        createMutation={createMutation}
        updateMutation={updateMutation}
      />
    )}
  </Drawer>
)}

{previewData && (
  <Drawer
    isOpen={!!previewData}
    onClose={closePreview}
    title="Preview Query"
    mode="view"
  >
    <QueryPreview data={previewData}  />
  </Drawer>
)}


    </section>
  );
};

export default QueriesTable;
