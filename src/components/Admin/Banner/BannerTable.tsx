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
import { useDeleteBanner, useFetchAllBanners, useFetchSingleBanner } from "@/src/hooks/useBanner";
import { createBanner, updateBanner } from "@/src/services/bannerApi";
import { BannerSearchOptions } from "../Data/staticData";
import CustomPagination from "../../common/CustomPaginatioin";
import CustomLoader from "../../common/Loader/CustomLoader";
import BannerPreview from "./BannerPreview";

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

  const [bannerId, setbannerId] = useState<string | null>(null);
  const [previewDrawerOpen, setPreviewDrawerOpen] = useState(false);
  const { data: singleBannerData, isLoading: isPreviewLoading } = useFetchSingleBanner(bannerId || undefined);


  console.log("banner", bannerData);


  // Mutations
  const createMutation = useMutation({
    mutationFn: createBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; values: BannerFormValues }) =>
      updateBanner(data.id, data.values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });



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

  const handlePreview = useCallback((banner: Banner) => {
    if (!banner.id) return;
    setbannerId(banner.id);
    setPreviewDrawerOpen(true);
  }, []);

    // Handlers
const handleEdit = useCallback((b: Banner) => {
  setbannerId(b.id ?? null);
  setMode("edit");
  setDrawerOpen(true);
}, []);



  // Filter data based on search
  const filteredData = useMemo(() => {
    return bannerData?.banners?.filter((b: Banner) =>
      b[searchField]?.toLowerCase().includes(search.toLowerCase())
    );
  }, [bannerData, search, searchField]);

  const columns = useMemo(
    () =>
      getBannerColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
        onView: handlePreview,
      }),
    [handleEdit, handleDelete]
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
      {(drawerOpen || previewDrawerOpen) && (
        <Drawer
          isOpen={drawerOpen || previewDrawerOpen}
          onClose={() => {
            setDrawerOpen(false);
            setEditBannerId(null);
            setMode("add");
            setPreviewDrawerOpen(false);
            setbannerId(null);
          }}
          title={
            previewDrawerOpen
              ? "Banner Preview"
              : mode === "edit"
                ? "Edit Banner"
                : "Add Banner"
          }
        >
          {previewDrawerOpen ? (
            isPreviewLoading ? (
              <CustomLoader />
            ) : singleBannerData ? (
             <BannerPreview data={singleBannerData} />
            ) : (
              <p>No data to preview</p>
            )
          ) : (
            <BannerForm
              initialData={singleBannerData}
              onClose={() => setDrawerOpen(false)}
              mode={mode}
              createMutation={createMutation}
              updateMutation={updateMutation}
            />
          )}
        </Drawer>
      )}


    </section>
  );
};

export default BannerTable;
