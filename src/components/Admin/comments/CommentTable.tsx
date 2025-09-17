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

const CommentTable = () => {
    const [search, setSearch] = useState("");
    const [searchField, setSearchField] = useState<"name" | "comment">("name");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editComment, setEditComment] = useState<string | null>(null);
    const [mode, setMode] = useState<"edit" | "view">("view");

    const { data: commentData } = useFetchComments();
    const { mutate: deleteComment } = useDeleteComment();
    console.log("comments", commentData);

    const handleEdit = useCallback((c: Comment) => {
        setEditComment(c.id);
        setMode("edit");
        setDrawerOpen(true);
    }, []);

    const handleView = useCallback((c: Comment) => {
        setEditComment(c.id);
        setMode("view");
        setDrawerOpen(true);
    }, []);

    const handleDelete = useCallback(
        (c: Comment) => {
            if (confirm(`Are you sure you want to delete this comment by "${c.name}"?`)) {
                deleteComment(c.id);
            }
        },
        [deleteComment]
    );

    const tableData = commentData?.comments || [];

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
            {/* Top controls (UI same, no filtering logic applied) */}
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
            <DataTableWrapper columns={columns} data={tableData} />
        </div>
    );
};

export default CommentTable;
