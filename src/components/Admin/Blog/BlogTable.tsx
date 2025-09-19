'use client'
import React, { useState, useMemo, useCallback, useRef } from "react";
import Breadcrumb from "../Breadcrumb";
import { Blog, BlogSearchOptions } from "../Data/staticData";
import DataTableWrapper from "../Common/DataTableWrapper";
import CustomInput from "../Common/CustomInput";
import Dropdown from "../Common/Dropdown";
import Button from "../../common/Buttons/Button";
import Drawer from "../Common/Drawer";
import EventPagination from "../../Eventpaginations";

import BlogForm from "./BlogForm";
import { getBlogColumns } from "./BlogColumns";
import { useDeleteSingleBlog, useFetchAllBlogs, useFetchSingleBlog } from "@/src/hooks/useBlog";
import AnimatedReveal from "@/src/animations/AnimatedReveal";
import { BlogFormValues } from "@/src/utils/validations/FormValidation";
import BlogPreview from "./PreviewBlog";

const BlogTable = () => {

  // ✅ states
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<"title" | "location" | "category" | "createdAt" | "updatedAt">("title");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editBlog, setEditBlog] = useState<string | null>(null);
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [previewData, setPreviewData] = useState<BlogFormValues | null>(null);



  // ✅ pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // ✅ API hooks
  const { data: blogData } = useFetchAllBlogs(currentPage, itemsPerPage);
  const { data: singleBlogData, isLoading: isLoadingBlog } = useFetchSingleBlog(editBlog || undefined);
  const { mutate: deleteBlog } = useDeleteSingleBlog();

  console.log(blogData)

  // ✅ handlers
  const handleEdit = useCallback((b: Blog) => {
    setEditBlog(b.id.toString());
    setMode("edit");
    setDrawerOpen(true);
  }, []);

  const handleView = useCallback((b: Blog) => {
    setEditBlog(b.id.toString());
    setMode("view");
    setDrawerOpen(true);
  }, []);

  const handleDelete = useCallback(
    (b: Blog) => {
      if (confirm(`Are you sure you want to delete "${b.title}"?`)) {
        deleteBlog(b.id.toString());
      }
    },
    [deleteBlog]
  );

  // ✅ columns for table
  const columns = useMemo(
    () =>
      getBlogColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
        onView: handleView,
      }),
    [handleEdit, handleDelete, handleView]
  );

  // ✅ prepare paginated data
  const paginatedData = useMemo(() => {
    if (!blogData?.blogs) return [];
    return blogData.blogs.map((b: any) => ({
      ...b,
      author: b.author || "Admin",
    }));
  }, [blogData]);

  const totalPages = blogData?.totalPages || 1;

  const filteredData = useMemo(() => {
    return paginatedData.filter((blog: Blog) => {
      const value = blog[searchField];
      return value?.toString().toLowerCase().includes(search.toLowerCase());
    });
  }, [paginatedData, search, searchField]);

  return (
    <section>
      {/* Top controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        {/* Left section: Dropdown + Input */}
        <AnimatedReveal direction="left" delay={0.1}>
          <div className="w-fit flex flex-row gap-2">
            <Dropdown
              options={BlogSearchOptions}
              value={searchField}
              onChange={(value) => {
                setSearchField(value);
                setTimeout(() => {
                  searchInputRef.current?.focus();
                }, 0);
              }}

            />
            <CustomInput
              ref={searchInputRef}
              placeholder={`Search by ${searchField}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </AnimatedReveal>

        {/* Right section: Button */}
        <AnimatedReveal direction="left" delay={0.3}>
          <div className="w-fit">
            <Button
              text="Add Blog"
              onClick={() => {
                setDrawerOpen(true);
                setEditBlog(null);
              }}
              bgColor="bg-lime-green"
              hoverBg="before:bg-primaryColor"
              textColor="text-white"
              hoverTextColor="group-hover:text-foreground"
              paddingx="px-4"
              paddingy="py-2"
              rounded="rounded-[5px] "
            />
          </div>
        </AnimatedReveal>
      </div>


      {/* Table */}
      <DataTableWrapper
        columns={columns}
        data={filteredData}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end mt-4">
          <EventPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setEditBlog(null);
          setMode("add");
        }}
        title={
          mode === "edit"
            ? "Edit Blog"
            : mode === "view"
              ? "View Blog"
              : "Add Blog"
        }
        width={previewData ? "850px" :"500px" }
      >
        {previewData ? (
          <BlogPreview
            data={previewData}
            onBack={() => setPreviewData(null)}
            onSubmit={() => {
              submitBlogForm(
                { ...previewData, keyPoints: previewData.keyPoints },
                singleBlogData,
                createMutation,
                updateMutation,
                () => {
                  setPreviewData(null);
                  setDrawerOpen(false);
                },
                () => { },
                () => setDrawerOpen(false)
              );
            }}
          />
        ) : isLoadingBlog ? (
          <p>Loading...</p>
        ) : (
          <BlogForm
            initialData={singleBlogData ?? undefined}
            onClose={() => setDrawerOpen(false)}
            mode={mode}
            onPreview={(data) => setPreviewData(data)}
          />
        )}

      </Drawer>
    </section>
  )
}

export default BlogTable
