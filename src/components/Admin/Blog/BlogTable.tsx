"use client";
import React, { useState, useMemo, useCallback, useRef } from "react";
import { BlogSearchOptions } from "../Data/staticData";
import DataTableWrapper from "../../UI/admin/DataTableWrapper";
import CustomInput from "../../UI/admin/CustomInput";
import Dropdown from "../../UI/admin/Dropdown";
import Drawer from "../../UI/admin/Drawer";

import BlogForm from "./BlogForm";
import { getBlogColumns } from "./BlogColumns";
import {
  submitBlogForm,
  useDeleteSingleBlog,
  useFetchAllBlogs,
  useFetchSingleBlog,
} from "@/src/hooks/admin/useBlog";
import AnimatedReveal from "@/src/animations/AnimatedReveal";
import { BlogFormValues } from "@/src/utils/validations/FormValidation";
import BlogPreview from "./PreviewBlog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog, updateBlog } from "@/src/services/admin/blogApi";
import { Blog, SearchField } from "@/src/types/admin/blog";
import AdminCustomPagination from "../../UI/admin/CustomePagination";
import ConfirmModal from "../../UI/admin/ConfirmModal";
import toast from "react-hot-toast";
import useDebounce from "@/src/hooks/web/useDebounce";
import { useFetchCategory } from "@/src/hooks/admin/useCategory";
import { Category } from "@/src/types/admin/category";
import Button from "../../UI/web/Buttons/Button";
import CustomLoader from "../../UI/web/Loader/CustomLoader";
import { useLanguageToggle } from "@/src/hooks/admin/useLanguageToggle";

const BlogTable = () => {
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<SearchField>("title");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [blogId, setBlogId] = useState<string | null>(null);
  const [mode, setMode] = useState<"add" | "edit" | "view" | "preview-edit">("add");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<BlogFormValues | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deleteLoading,setDeleteLoading]=useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const searchedData = useDebounce(search, 1000);

  const { data: blogData, isLoading: isAllBlogLoading } = useFetchAllBlogs(
    currentPage,
    itemsPerPage,
    searchedData,
    searchField
  );
  const { language } = useLanguageToggle();
  const { data: singleBlogData, isLoading: isLoadingBlog, refetch } = useFetchSingleBlog(
    blogId || undefined
  );
  const { data: categoryData } = useFetchCategory();

  const categoryOptions = categoryData?.category?.map((category: Category) => ({
    label: category.name?.[language] || category.name.en,
    value: category.name?.[language] || category.name.en,
  })) ?? [];
  const deleteMutation = useDeleteSingleBlog();
  const totalPages = blogData?.totalPages || 1;

  const handleEdit = useCallback((b: Blog) => {
    setBlogId(b.id.toString());
    setMode("edit");
    setDrawerOpen(true);
  }, []);

  const handleView = useCallback(async (blog: Blog) => {
    setBlogId(blog.id.toString());
    setMode("view");
    setDrawerOpen(true);
    setPreviewData(null);
    setShowPreview(false);
    try {
      setTimeout(async () => {
        const { data } = await refetch();
        if (data) {
          setMode("view");
          setPreviewData((data));
        }
      }, 100);
    } catch (error) {
      console.error("Failed to fetch campaign:", error);
    }
  }, [refetch]);



  const handleDelete = useCallback(
    (b: Blog) => {
      setSelectedBlog(b);
      setIsOpen(true);
    },
    [deleteMutation]
  );

  const confirmDelete = useCallback(() => {
    if (selectedBlog) {
      setDeleteLoading(true);
      toast.dismiss();
      toast.loading("Deleting Blog....")
     deleteMutation.mutate(selectedBlog.id.toString(), {
      onSuccess: () => {
        setDeleteLoading(false)
         setIsOpen(false);
      setSelectedBlog(null);
      },
      onError: () => {
        setIsOpen(false); 
      },
    });
    }
  }, [selectedBlog, deleteMutation]);

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

  // Mutations
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; values: FormData }) =>
      updateBlog(data.id, data.values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "blogs",
      });
      queryClient.invalidateQueries({
        queryKey: ["blog", blogId],
      });
    },
  });
  const normalizedBlogData = useMemo(() => {
    if (!singleBlogData) return undefined;

    const stringImages =
      singleBlogData.images?.filter((img: any) => typeof img === "string") ?? [];

    return {
      ...singleBlogData,
      existingImages: singleBlogData.existingImages ?? stringImages,
      images: singleBlogData.images ?? stringImages,
    };
  }, [singleBlogData]);

  return (
    <section>
      {/* Top controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <AnimatedReveal direction="left" delay={0.1}>
          <div className="w-fit flex flex-row gap-2">
            <Dropdown
              width="w-[200px]"
              options={BlogSearchOptions}
              value={searchField}
              onChange={(value: SearchField) => {
                setSearchField(value);
                setSearch("");
                setTimeout(() => {
                  searchInputRef.current?.focus();
                }, 0);
              }}
            />
            {searchField === 'category' ? (<>
              <Dropdown
                options={categoryOptions}
                value={search || ''}
                onChange={(value: SearchField) => {
                  setSearch(value)
                }}
              />

            </>) : (
              <CustomInput
                ref={searchInputRef}
                placeholder={`Search by ${searchField}...`}
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              />
            )}
          </div>
        </AnimatedReveal>

        <AnimatedReveal direction="left" delay={0.3}>
          <div className="w-fit">
            <Button
              text="Add Blog"
              onClick={() => {
                setDrawerOpen(true);
                setBlogId(null);
                setMode('add')
                setPreviewData(null);
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

      {isAllBlogLoading ? (
        <div className="flex justify-center py-8">
          <CustomLoader />
        </div>
      ) : (
        <DataTableWrapper columns={columns} data={paginatedData} />
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
              : mode === "view" || mode === "preview-edit"
                ? "View Blog"
                : "Add Blog"
          }
          mode={mode}
        >
          {(mode === "view" || mode === "preview-edit") && (
            !previewData || isLoadingBlog ? (

              <div className="flex justify-center py-10">
                <CustomLoader />
              </div>
            ) : (
              <BlogPreview
                data={previewData}
                showButton={mode === 'preview-edit' ? true : false}
                onBack={() => {
                  setShowPreview(false);
                  setMode(blogId ? "edit" : "add");
                }}
                createMutation={createMutation}
                updateMutation={updateMutation}
                onSubmit={() => {
                  submitBlogForm(
                    { ...previewData, keyPoints: previewData.keyPoints },
                    singleBlogData,
                    createMutation,
                    updateMutation,
                    () => {
                      setPreviewData(null);
                      setShowPreview(false);
                      setDrawerOpen(false);
                    },
                    () => { },
                    () => setDrawerOpen(false)
                  );
                }}
                mode={mode}
              />
            )
          )}
          {(mode === "add" || mode === "edit") && (
            isLoadingBlog ? (
              <div><CustomLoader /></div>
            ) :
              (
                <BlogForm
                  initialData={{
                    ...(normalizedBlogData ?? {}),
                    ...(previewData ?? {}),
                    images:
                      previewData?.images?.length
                        ? previewData.images
                        : normalizedBlogData?.images ?? [],
                    existingImages:
                      previewData?.existingImages?.length
                        ? previewData.existingImages
                        : normalizedBlogData?.existingImages ?? [],
                  }}
                  onClose={() => setDrawerOpen(false)}
                  mode={mode}
                  onPreview={(data) => {
                    setPreviewData(data);
                    setShowPreview(true);
                    setMode('preview-edit')
                  }}
                  createMutation={createMutation}
                  updateMutation={updateMutation}
                />
              ))}
        </Drawer>
      )}
      <ConfirmModal
        isOpen={isOpen}
        loading={deleteLoading}
        onConfirm={confirmDelete}
        onCancel={() => setIsOpen(false)}
        title="Confirm Delete"
        message="Are you sure you want to delete these record ?"
        buttonText="Delete"
      />
    </section>
  );
};

export default BlogTable;
