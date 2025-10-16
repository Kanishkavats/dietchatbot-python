"use client";

import React, { useState, useMemo, useCallback } from "react";
import Dropdown from "../Common/Dropdown";
import DataTableWrapper from "../Common/DataTableWrapper";
import Drawer from "../Common/Drawer";
import AdminCustomPagination from "../Common/CustomePagination";
import CustomLoader from "../../common/Loader/CustomLoader";
import { getFeedbackColumns } from "./getFeedbackColumns";
import {
  useFetchFeedbacks,
  useFetchFeedbackById,
  useDeleteFeedback,
} from "@/src/components/Admin/hooks/useFeedback";
import { Feedback } from "@/src/types/feedback";
import FeedbackForm from "./FeedbackForm";
import { filterOptions } from "@/src/staticResource";
import ConfirmModal from "../Common/ConfirmModal";
import toast from "react-hot-toast";

const FeedbackTable = () => {
  const [status, setStatus] = useState<
    "all" | "resolved" | "unresolved" | "pending"
  >("all");

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [feedbackId, setFeedbackId] = useState<string | null>(null);
  const [mode, setMode] = useState<"edit" | "view">("view");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFeedBack, setSelectedFeedBack] = useState<Feedback | null>(
    null
  );

  // Fetch feedback data with filters
  const { data: feedbackData, isLoading } = useFetchFeedbacks(
    currentPage,
    itemsPerPage,
    status
  );

  const { mutate: deleteFeedback } = useDeleteFeedback();
  const totalPages = feedbackData?.totalPages || 1;

  // Fetch single feedback for drawer
  const {
    data: singleFeedbackData,
    isLoading: loadingFeedback,
    refetch: refetchSingleFeedback,
  } = useFetchFeedbackById(feedbackId || "");

  // Handlers
  const handleEdit = useCallback(
    (feedback: Feedback) => {
      setFeedbackId(feedback.id);
      setMode("edit");
      setDrawerOpen(true);
      refetchSingleFeedback();
    },
    [refetchSingleFeedback]
  );

  const handleView = useCallback(
    (feedback: Feedback) => {
      setFeedbackId(feedback.id);
      setMode("view");
      setDrawerOpen(true);
      refetchSingleFeedback();
    },
    [refetchSingleFeedback]
  );

  const handleDelete = useCallback(
    (feedback: Feedback) => {
      // if (
      //   confirm(
      //     `Are you sure you want to delete this feedback by "${feedback.name}"?`
      //   )
      // ) {
      //   deleteFeedback(feedback.id);
      // }
      setSelectedFeedBack(feedback);
      setIsOpen(true);
    },
    [deleteFeedback]
  );
  const confirmDelete = useCallback(() => {
    if (selectedFeedBack) {
      toast.dismiss();
      toast.loading("Deleting Feedback....")
      deleteFeedback(selectedFeedBack.id.toString());
      setIsOpen(false);
      setSelectedFeedBack(null);
    }
  }, [selectedFeedBack, deleteFeedback]);

  const tableData = feedbackData?.feedback || [];

  const columns = useMemo(
    () =>
      getFeedbackColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
        onView: handleView,
      }),
    [handleEdit, handleDelete, handleView]
  );

  return (
    <div>
      {/* Filter */}
      <div className="flex justify-start mb-4 w-fit">
        <Dropdown
          options={filterOptions}
          value={status}
          onChange={(value) => {
            setStatus(value as "all" | "resolved" | "unresolved" | "pending");
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <CustomLoader />
        </div>
      ) : (
        <DataTableWrapper columns={columns} data={tableData} />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-4">
          <AdminCustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
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
            setFeedbackId(null);
            setMode("view");
          }}
          mode={mode}
          title={mode === "edit" ? "Edit Feedback" : "View Feedback"}
          width="500px"
        >
          {loadingFeedback || !singleFeedbackData ? (
            <div className="flex justify-center py-8">
              <CustomLoader />
            </div>
          ) : (
            <FeedbackForm
              initialData={singleFeedbackData}
              onClose={() => setDrawerOpen(false)}
              mode={mode}
            />
          )}
        </Drawer>
      )}
      <ConfirmModal
        isOpen={isOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsOpen(false)}
        title="Confirm Delete"
        message="Are you sure you want to delete these record ?"
        buttonText="Delete"
      />
    </div>
  );
};

export default FeedbackTable;
