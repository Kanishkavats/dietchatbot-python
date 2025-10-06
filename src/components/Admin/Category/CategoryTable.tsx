"use client";
import React, { useState, useMemo, useCallback, useRef } from "react";
import Dropdown from "../Common/Dropdown";
import CustomInput from "../Common/CustomInput";
import Button from "../../common/Buttons/Button";
import Drawer from "../Common/Drawer";
import DataTableWrapper from "../Common/DataTableWrapper";
import { CategorySearchOptions } from "../Data/staticData";
import CategoryForm from "./CategoryForm";
import { useFetchCategory, useDeleteCategory } from "@/src/hooks/useCategory";
import { Category } from "@/src/types/category";
import AnimatedReveal from "@/src/animations/AnimatedReveal";
import { getCategoryColumns } from "./categoryColumns";
import AdminCustomPagination from "../Common/CustomePagination";
import CustomLoader from "../../common/Loader/CustomLoader";

const CategoryTable = () => {
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<"name">("name");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<string | null>(null);
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const { data: categoryData, isLoading } = useFetchCategory(currentPage, itemsPerPage);
  const { mutate: deleteCategory } = useDeleteCategory();


  const handleEdit = useCallback((c: Category) => {
    setEditCategory(c.id);
    setMode("edit");
    setDrawerOpen(true);
  }, []);

  const handleView = useCallback((c: Category) => {

    setEditCategory(c.id);
    setMode("view");
    setDrawerOpen(true);
  }, []);

  const handleDelete = useCallback(
    (c: Category) => {
      if (confirm(`Are you sure you want to delete "${c.name}"?`)) {
        deleteCategory(c.id);
      }
    },
    [deleteCategory]
  );

  const filteredData = useMemo(() => {
    return categoryData?.category?.filter((c: Category) =>
      c[searchField].toLowerCase().includes(search.toLowerCase())
    );
  }, [categoryData, search, searchField]);

  const columns = useMemo(
    () => getCategoryColumns({ onEdit: handleEdit, onDelete: handleDelete, onView: handleView }),
    [handleEdit, handleDelete, handleView]
  );

  const totalPages = categoryData?.TotalPages || 1;

  return (
    <div>
      {/* Top controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <AnimatedReveal direction="left" delay={0.1}>
          <div className="w-fit flex flex-row gap-2">
            <Dropdown
              options={CategorySearchOptions}
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

        <AnimatedReveal direction="left" delay={0.3}>
          <div className="w-fit">
            <Button
              text="Add Category"
              onClick={() => {
                setDrawerOpen(true);
                setEditCategory(null);
                setMode("add");
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
            setEditCategory(null);
            setMode("add");
          }}
          title={mode === "edit" ? "Edit Category" : mode === "view" ? "View Category" : "Add Category"}
          width="400px"
        >
          <CategoryForm
           initialData={categoryData?.category?.find((c: Category) => c.id === editCategory)}

            onClose={() => setDrawerOpen(false)}
            mode={mode}
          />
        </Drawer>
      )}
    </div>
  );
};

export default CategoryTable;
