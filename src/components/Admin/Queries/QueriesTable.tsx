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

const QueriesTable = () => {
  // Search state
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<keyof Query>("title");

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [queryId, setqueryId] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<Query | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch paginated data
  const { data: allData, isLoading } = useFetchAllQueries(currentPage, itemsPerPage);
  const totalPages = allData?.totalPages ?? 1;

  // Fetch single query (optional - only if needed for preview)
  const { data: singleData, isLoading: isSingleLoading, refetch: refetchSingle } =
    useFetchSingleQuery(queryId ?? undefined);

  // Delete mutation
  const { mutate: deleteQuery } = useDeleteQuery();

  // Handlers
  const handleView = useCallback(
    (e: Query) => {
      setqueryId(e.id);
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

  const filteredData = useMemo(() => {
    const paginatedData = allData?.forms ?? [];
    if (!search) return paginatedData;
    const s = search.toLowerCase();
    return paginatedData.filter((e) =>
      e[searchField]?.toString().toLowerCase().includes(s)
    );
  }, [allData, search, searchField]);

  const columns = useMemo(
    () =>
      getQueryColumns({
        onEdit: () => {}, // No edit now
        onDelete: handleDelete,
        onView: handleView,
      }),
    [handleDelete, handleView]
  );

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
          {isSingleLoading ? <CustomLoader /> : <QueryPreview data={previewData} />}
        </Drawer>
      )}
    </section>
  );
};

export default QueriesTable;
