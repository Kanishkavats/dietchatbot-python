"use client";

import React, { useState, useMemo, useCallback, useRef } from "react";
import DataTableWrapper from "../Common/DataTableWrapper";
import CustomLoader from "../../common/Loader/CustomLoader";
import AdminCustomPagination from "../Common/CustomePagination";
import Drawer from "../Common/Drawer";

import { getQueryColumns } from "./getQueriesColumns";
import {
  useDeleteQuery,
  useFetchAllQueries,
  useFetchSingleQuery,
} from "@/src/hooks/useQueries";
import { Query } from "@/src/types/query";
import QueryPreview from "./QueryPreview";
import Dropdown from "../Common/Dropdown";
import { filterFields, formTypeOptions, isViewedOptions } from "@/src/staticResource";
import AnimatedReveal from "@/src/animations/AnimatedReveal";





const QueriesTable = () => {
  // Search state
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<keyof Query>("title");
  const [filterField, setFilterField] = useState<"none" | "isViewed" | "formType">("none");
  const [filterValue, setFilterValue] = useState<string>("all");



  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [queryId, setqueryId] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<Query | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const filters = useMemo(() => {
    if (filterField === "none" || filterValue === "all") return {};

    if (filterField === "isViewed") {
      return {
        isViewed: filterValue,
      };
    }

    if (filterField === "formType") {
      return {
        formType: filterValue,
      };
    }

    return {};
  }, [filterField, filterValue]);

  const { data: allData, isLoading } = useFetchAllQueries(currentPage, itemsPerPage, filters);
  console.log(allData)

  const totalPages = allData?.totalPages ?? 1;

  // Fetch single query (optional - only if needed for preview)
  const { data: singleQueryData, isLoading: isSingleQueryLoading, refetch: refetchSingle } =
    useFetchSingleQuery(queryId);

  // Delete mutation
  const { mutate: deleteQuery } = useDeleteQuery();

  // Handlers
  const handleView = useCallback(
    (e: Query) => {
      setqueryId(e.id ?? null);
      setPreviewData(e);
      setDrawerOpen(true);
      refetchSingle();
    },
    [refetchSingle]
  );

  const handleDelete = useCallback(
    (e: Query) => {
      if (confirm(`Are you sure you want to delete "${e.title}"?`)) {
        deleteQuery(e.id ?? "");
      }
    },
    [deleteQuery]
  );

  const columns = useMemo(
    () =>
      getQueryColumns({
        onEdit: () => { }, // No edit now
        onDelete: handleDelete,
        onView: handleView,
      }),
    [handleDelete, handleView]
  );

  return (
    <section>
      <AnimatedReveal direction="left" delay={0.1} className="w-[300px] flex flex-col sm:flex-row gap-2 mb-4">
          <Dropdown
            options={filterFields}
            value={filterField}
            onChange={(value) => {
              setFilterField(value as "none" | "isViewed" | "formType");
              setFilterValue("all");
            }}
          />

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

      </AnimatedReveal>
    

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <CustomLoader />
        </div>
      ) : (
        <DataTableWrapper columns={columns} data={allData?.forms} />
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

      {/* View Drawer */}
      {drawerOpen && previewData && (
        <Drawer
          isOpen={drawerOpen}
          onClose={() => {
            setDrawerOpen(false);
            setqueryId(null);
            setPreviewData(null);
          }}
          title="Preview Query"
          mode="view"
        >
          {isSingleQueryLoading ? <CustomLoader /> : <QueryPreview data={singleQueryData} onClose={() => {
            setDrawerOpen(false);
            setqueryId(null);
            setPreviewData(null);
          }} />}
        </Drawer>
      )}
    </section>
  );
};

export default QueriesTable;
