"use client";

import React, { useState, useMemo, useCallback } from "react";
import DataTableWrapper from "../../UI/admin/DataTableWrapper";
import AdminCustomPagination from "../../UI/admin/CustomePagination";
import Drawer from "../../UI/admin/Drawer";
import {
  useDeleteQuery,
  useFetchAllQueries,
  useFetchSingleQuery,
} from "@/src/hooks/admin/useQueries";
import { Query } from "@/src/types/web/query";
import Dropdown from "../../UI/admin/Dropdown";
import {
  filterFields,
  formTypeOptions,
  isViewedOptions,
} from "@/src/staticResource";
import AnimatedReveal from "@/src/animations/AnimatedReveal";
import ConfirmModal from "../../UI/admin/ConfirmModal";
import toast from "react-hot-toast";
import CustomLoader from "../../UI/web/Loader/CustomLoader";
import QueryPreview from "../Queries/QueryPreview";
import { getQueryColumns } from "../Queries/getQueriesColumns";

const QueriesTable = () => {
  // 🔹 Filter states
  const [filterField, setFilterField] = useState<"none" | "isViewed" | "formType">("none");
  const [filterValue, setFilterValue] = useState<string>("all");

  // 🔹 Drawer & delete modal
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [queryId, setQueryId] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<Query | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);

  // 🔹 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);


  // 🔹 Fetch all queries from backend
  const { data: allData, isLoading } = useFetchAllQueries(
    currentPage,
    itemsPerPage,
    filterValue,
    filterField
  );

  const totalPages = allData?.totalPages ?? 1;

  // 🔹 Fetch single query (for preview)
  const {
    data: singleQueryData,
    isLoading: isSingleQueryLoading,
    refetch: refetchSingle,
  } = useFetchSingleQuery(queryId);

  // 🔹 Delete mutation
  const { mutate: deleteQuery } = useDeleteQuery();

  // 🔹 Handlers
  const handleView = useCallback(
    (query: Query) => {
      setQueryId(query.id ?? null);
      setPreviewData(query);
      setDrawerOpen(true);
      refetchSingle();
    },
    [refetchSingle]
  );

  const handleDelete = useCallback((query: Query) => {
    setSelectedQuery(query);
    setIsOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (selectedQuery?.id) {
      toast.dismiss();
      toast.loading("Deleting Query...");
      deleteQuery(selectedQuery.id.toString());
      setIsOpen(false);
      setSelectedQuery(null);
    }
  }, [selectedQuery, deleteQuery]);

  const columns = useMemo(
    () =>
      getQueryColumns({
        onEdit: () => {}, 
        onDelete: handleDelete,
        onView: handleView,
      }),
    [handleDelete, handleView]
  );

  return (
    <section>
      {/* 🔹 Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <AnimatedReveal direction="left" delay={0.1}>
          <div className="flex flex-row gap-2">
            {/* Field selection */}
            <Dropdown
              options={filterFields}
              value={filterField}
              onChange={(value) => {
                setFilterField(value as "none" | "isViewed" | "formType");
                setFilterValue("all");
              }}
            />

            {/* Value selection based on field */}
            <Dropdown
              options={
                filterField === "isViewed"
                  ? isViewedOptions
                  : filterField === "formType"
                  ? formTypeOptions
                  : [{ label: "Select option", value: "all" }]
              }
              value={filterValue}
              onChange={setFilterValue}
              disabled={filterField === "none"}
            />
          </div>
        </AnimatedReveal>
      </div>

      {/* 🔹 Table */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <CustomLoader />
        </div>
      ) : (
        <DataTableWrapper columns={columns} data={allData?.forms ?? []} />
      )}

      {/* 🔹 Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-4">
          <AdminCustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* 🔹 Drawer (Preview Query) */}
      {drawerOpen && previewData && (
        <Drawer
          isOpen={drawerOpen}
          onClose={() => {
            setDrawerOpen(false);
            setQueryId(null);
            setPreviewData(null);
          }}
          title="Preview Query"
          mode="view"
        >
          {isSingleQueryLoading ? (
            <CustomLoader />
          ) : (
            <QueryPreview
              data={singleQueryData}
              onClose={() => {
                setDrawerOpen(false);
                setQueryId(null);
                setPreviewData(null);
              }}
            />
          )}
        </Drawer>
      )}

      {/* 🔹 Confirm Modal */}
      <ConfirmModal
        isOpen={isOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsOpen(false)}
        title="Confirm Delete"
        message="Are you sure you want to delete this record?"
        buttonText="Delete"
      />
    </section>
  );
};

export default QueriesTable;
