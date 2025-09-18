"use client";

import React, { useState, useMemo, useCallback, useRef } from "react";
import Dropdown from "../Common/Dropdown";
import CustomInput from "../Common/CustomInput";
import DataTableWrapper from "../Common/DataTableWrapper";
import AnimatedReveal from "@/src/animations/AnimatedReveal";
import {
  useDeleteComment,
  useFetchComments,
  useFetchCommentById,
} from "@/src/hooks/useComments";
import { CommentSearchOptions } from "../Data/staticData";
import { getCommentColumns } from "./getCommentColumns";
import { Comment } from "@/src/types/comments";
import Drawer from "../Common/Drawer";
import CommentForm from "./CommentForm";

const CommentTable = () => {
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<"name" | "comment">("name");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [mode, setMode] = useState<"edit" | "view">("view");
  const searchInputRef = useRef<HTMLInputElement>(null);


  const { data: commentData } = useFetchComments();
  const { mutate: deleteComment } = useDeleteComment();

  const {
    data: singleCommentData,
    isLoading: loadingComment,
    refetch: refetchSingleComment,
  } = useFetchCommentById(editCommentId!, false);

  const handleEdit = useCallback((comment: Comment) => {
    setEditCommentId(comment.id);
    setMode("edit");
    setDrawerOpen(true);
    refetchSingleComment();
  }, [refetchSingleComment]);

  const handleView = useCallback((comment: Comment) => {
    setEditCommentId(comment.id);
    setMode("view");
    setDrawerOpen(true);
    refetchSingleComment();
  }, [refetchSingleComment]);

  const handleDelete = useCallback(
    (comment: Comment) => {
      if (confirm(`Are you sure you want to delete this comment by "${comment.name}"?`)) {
        deleteComment(comment.id);
      }
    },
    [deleteComment]
  );

  const tableData = commentData?.comments || [];

  const filteredData = useMemo(() => {
    return tableData.filter((c: Comment) =>
      c[searchField].toLowerCase().includes(search.toLowerCase())
    );
  }, [tableData, search, searchField]);

  const columns = useMemo(
    () =>
      getCommentColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
        onView: handleView,
      }),
    [handleEdit, handleDelete, handleView]
  );

  return (
    <div>
      {/* Top controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <AnimatedReveal direction="left" delay={0.1}>
          <div className="w-fit flex flex-col sm:flex-row gap-2">
            <Dropdown
              options={CommentSearchOptions}
              value={searchField}
              onChange={(value) => {
                setSearchField(value as "name" | "comment")
                setTimeout(() => {
                  searchInputRef.current?.focus();
                }, 0);
              }}
            />

            <CustomInput
              placeholder={`Search by ${searchField}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </AnimatedReveal>
      </div>

      {/* Data table */}
      <DataTableWrapper columns={columns} data={filteredData} />

      {/* Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setEditCommentId(null);
          setMode("view");
        }}
        title={mode === "edit" ? "Edit Comment" : "View Comment"}
        width="500px"
      >
        {loadingComment || !singleCommentData ? (
          <div className="p-4 text-sm text-gray-500">Loading comment...</div>
        ) : (
          <CommentForm
            initialData={singleCommentData}
            onClose={() => setDrawerOpen(false)}
            mode={mode}
          />
        )}
      </Drawer>
    </div>
  );
};

export default CommentTable;
