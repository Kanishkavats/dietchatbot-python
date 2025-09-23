"use client";

import React, { useState, useMemo, useCallback, useRef } from "react";
import DataTableWrapper from "../Common/DataTableWrapper";
import CustomInput from "../Common/CustomInput";
import Dropdown from "../Common/Dropdown";
import Button from "../../common/Buttons/Button";
import Drawer from "../Common/Drawer";
import AnimatedReveal from "@/src/animations/AnimatedReveal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import BannerForm from "./BannerForm";
import { getBannerColumns } from "./getBannerColumns";
import { Banner, BannerSearchField } from "@/src/types/banner";
import { BannerFormValues } from "@/src/utils/validations/FormValidation";
import { useDeleteBanner, useFetchAllBanners } from "@/src/hooks/useBanner";
import { createBanner, updateBanner } from "@/src/services/bannerApi";
import { BannerSearchOptions } from "../Data/staticData";
import CustomPagination from "../../common/CustomPaginatioin";

const BannerTable = () => {
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<BannerSearchField>("title");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editBannerId, setEditBannerId] = useState<string | null>(null);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(2)

  const queryClient = useQueryClient();
  const { data: bannerData } = useFetchAllBanners(currentPage, itemsPerPage);
  const { mutate: deleteBanner } = useDeleteBanner();
  const totalPages = bannerData?.totalPages || 1;


  // Mutations
  const createMutation = useMutation({
    mutationFn: createBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banner"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; values: BannerFormValues }) =>
      updateBanner(data.id, data.values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banner"] });
    },
  });

  // Handlers
  const handleEdit = useCallback((b: Banner) => {
    setEditBannerId(b.id ?? null);
    setMode("edit");
    setDrawerOpen(true);
  }, []);

  const handleDelete = useCallback(
    (b: Banner) => {
      if (!b.id) {
        console.error("Cannot delete banner: ID is missing.");
        return;
      }

      if (confirm(`Are you sure you want to delete "${b.title}"?`)) {
        deleteBanner(b.id);
      }
    },
    [deleteBanner]
  );

  // Filter data based on search
  const filteredData = useMemo(() => {
    return bannerData?.banner?.filter((b: Banner) =>
      b[searchField]?.toLowerCase().includes(search.toLowerCase())
    );
  }, [bannerData, search, searchField]);

  const columns = useMemo(
    () =>
      getBannerColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    [handleEdit, handleDelete]
  );

  const selectedBanner = useMemo(
    () => bannerData?.banner?.find((b: Banner) => b.id === editBannerId),
    [bannerData, editBannerId]
  );


  return (
    <section>
      {/* Top controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        {/* Left: search field */}
        <AnimatedReveal direction="left" delay={0.1}>
          <div className="w-fit flex flex-row gap-2">
            <Dropdown
              options={BannerSearchOptions}
              value={searchField}
              onChange={(value: BannerSearchField) => {
                setSearchField(value);
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

        {/* Right: add button */}
        <AnimatedReveal direction="left" delay={0.3}>
          <div className="w-fit">
            <Button
              text="Add Banner"
              onClick={() => {
                setEditBannerId(null);
                setMode("add");
                setDrawerOpen(true);
              }}
              bgColor="bg-lime-green"
              hoverBg="before:bg-primaryColor"
              textColor="text-white"
              hoverTextColor="group-hover:text-foreground"
              paddingx="px-4"
              paddingy="py-2"
              rounded="rounded-[5px]"
            />
          </div>
        </AnimatedReveal>
      </div>

      {/* Table */}
      <DataTableWrapper columns={columns} data={filteredData} />

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

      {/* Drawer for Add/Edit */}
      {drawerOpen && (
        <Drawer
          isOpen={drawerOpen}
          onClose={() => {
            setDrawerOpen(false);
            setEditBannerId(null);
            setMode("add");
          }}
          title={mode === "edit" ? "Edit Banner" : "Add Banner"}
          width="400px"
        >
          <BannerForm
            initialData={selectedBanner}
            onClose={() => setDrawerOpen(false)}
            mode={mode}
            createMutation={createMutation}
            updateMutation={updateMutation}
          />
        </Drawer>
      )}
    </section>
  );
};

export default BannerTable;
