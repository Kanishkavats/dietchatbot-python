'use client'
import React, { useState, useMemo, useCallback, useRef } from "react";
import Breadcrumb from "../Breadcrumb";
import { BlogSearchOptions } from "../Data/staticData";
import DataTableWrapper from "../Common/DataTableWrapper";
import CustomInput from "../Common/CustomInput";
import Dropdown from "../Common/Dropdown";
import Button from "../../common/Buttons/Button";
import Drawer from "../Common/Drawer";

import BlogForm from "./BlogForm";
import { getBlogColumns } from "./BlogColumns";
import { submitBlogForm, useDeleteSingleBlog, useFetchAllBlogs, useFetchSingleBlog } from "@/src/hooks/useBlog";
import AnimatedReveal from "@/src/animations/AnimatedReveal";
import { BlogFormValues } from "@/src/utils/validations/FormValidation";
import BlogPreview from "./PreviewBlog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog, updateBlog } from "@/src/services/blogApi";
import { Blog } from "@/src/types/blog";
import CustomPagination from "../../common/CustomPaginatioin";
import CustomLoader from "../../common/Loader/CustomLoader";
import AdminCustomPagination from "../Common/CustomePagination";

const BlogTable = () => {

  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<"title" | "location" | "category" | "createdAt" | "updatedAt">("title");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [blogId, setBlogId] = useState<string | null>(null);
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [previewData, setPreviewData] = useState<BlogFormValues | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const { data: blogData, isLoading: isAllBlogLoading } = useFetchAllBlogs(currentPage, itemsPerPage);
  const { data: singleBlogData, isLoading: isLoadingBlog } = useFetchSingleBlog(blogId || undefined);
  const { mutate: deleteBlog } = useDeleteSingleBlog();
  const totalPages = blogData?.totalPages || 1;

  const handleEdit = useCallback((b: Blog) => {
    setBlogId(b.id.toString());
    setMode("edit");
    setDrawerOpen(true);
  }, []);

  const handleView = useCallback((blog: Blog) => {
    setBlogId(blog.id.toString());
    setMode("view");
    setPreviewData(blog);
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

  const columns = useMemo(
    () =>
      getBlogColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
        onView: handleView,
      }),
    [handleEdit, handleDelete, handleView]
  );

  //  prepare paginated data
  const paginatedData = useMemo(() => {
    if (!blogData?.blogs) return [];
    return blogData.blogs.map((b: any) => ({
      ...b,
      author: b.author || "Admin",
    }));
  }, [blogData]);


  const filteredData = useMemo(() => {
    return paginatedData.filter((blog: Blog) => {
      const value = blog[searchField];
      return value?.toString().toLowerCase().includes(search.toLowerCase());
    });
  }, [paginatedData, search, searchField]);

  // Mutations
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; values: BlogFormValues }) =>
      updateBlog(data.id, data.values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

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
                setBlogId(null);
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
      {isAllBlogLoading ? 
      <div className="flex justify-center py-8">
        <CustomLoader />
      </div> : (
        <DataTableWrapper
          columns={columns}
          data={filteredData}
        />
      )}


      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end mt-4">
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
            setBlogId(null);
            setMode("add");
          }}
          title={
            mode === "edit"
              ? "Edit Blog"
              : mode === "view"
                ? "View Blog"
                : "Add Blog"
          }
          mode={mode}

        >
          {mode === "view" && previewData ? (
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
              mode={mode}
            />
          ) : isLoadingBlog ? (
            <CustomLoader />
          ) : (
            <BlogForm
              initialData={singleBlogData ?? undefined}
              onClose={() => setDrawerOpen(false)}
              mode={mode}
              onPreview={(data) => setPreviewData(data)}
              createMutation={createMutation}
              updateMutation={updateMutation}
            />
          )}

        </Drawer>
      )}
    </section>
  )
}

export default BlogTable
