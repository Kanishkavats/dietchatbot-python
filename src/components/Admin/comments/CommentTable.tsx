"use client";

import React, { useState, useMemo, useCallback } from "react";
import Dropdown from "../Common/Dropdown";
import CustomInput from "../Common/CustomInput";
import DataTableWrapper from "../Common/DataTableWrapper";
import AnimatedReveal from "@/src/animations/AnimatedReveal";
import { useDeleteComment, useFetchComments } from "@/src/hooks/useComments";
import { CommentSearchOptions } from "../Data/staticData";
import { getCommentColumns } from "./getCommentColumns";
import { Comment } from "@/src/types/comments";
import Drawer from "../Common/Drawer";
import CommentForm from "./CommentForm";

const CommentTable = () => {
    const [search, setSearch] = useState("");
    const [searchField, setSearchField] = useState<"name" | "comment">("name");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editComment, setEditComment] = useState<string | null>(null);
    const [mode, setMode] = useState<"edit" | "view">("view");

    const { data: commentData } = useFetchComments();
    const { mutate: deleteComment } = useDeleteComment();

    const handleEdit = useCallback((comment: Comment) => {
        setEditComment(comment.id);
        setMode("edit");
        setDrawerOpen(true);
    }, []);

    const handleView = useCallback((comment: Comment) => {
        setEditComment(comment.id);
        setMode("view");
        setDrawerOpen(true);
    }, []);

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
                            onChange={(value: string) => setSearchField(value as "name" | "comment")}
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
                    setEditComment(null);
                    setMode("view");
                }}
                title={mode === "edit" ? "Edit Comment" : "View Comment"}
                width="500px"
            >
                <CommentForm
                    initialData={tableData.find((c: Comment) => c.id === editComment)}
                    onClose={() => setDrawerOpen(false)}
                    mode={mode}
                />
            </Drawer>
        </div>
    );
};

export default CommentTable;
