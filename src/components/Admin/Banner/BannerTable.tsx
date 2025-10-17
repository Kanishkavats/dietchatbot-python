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
import {
  submitBannerForm,
  useDeleteBanner,
  useFetchAllBanners,
  useFetchSingleBanner,
} from "@/src/components/Admin/hooks/useBanner";
import { createBanner, updateBanner } from "@/src/components/Admin/services/bannerApi";
import { BannerSearchOptions } from "../Data/staticData";
import CustomLoader from "../../common/Loader/CustomLoader";
import BannerPreview from "./BannerPreview";
import AdminCustomPagination from "../Common/CustomePagination";
import ConfirmModal from "../Common/ConfirmModal";
import toast from "react-hot-toast";
import useDebounce from "@/src/hooks/useDebounce";

const BannerTable = () => {
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<BannerSearchField>("title");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editBannerId, setEditBannerId] = useState<string | null>(null);
  const [mode, setMode] = useState<"add" | "edit" | "view"|"preview-edit">("add");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showPreview, setShowPreview] = useState(false);
const [previewData, setPreviewData] = useState<BannerFormValues | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const debounceValue=useDebounce(search,1000);
  const queryClient = useQueryClient();
  const { data: bannerData, isLoading } = useFetchAllBanners(
    currentPage,
    itemsPerPage,
    debounceValue
  );
  const { mutate: deleteBanner } = useDeleteBanner();
  const totalPages = bannerData?.totalPages || 1;

  const [bannerId, setbannerId] = useState<string | null>(null);
  const [previewDrawerOpen, setPreviewDrawerOpen] = useState(false);
  const { data: singleBannerData, isLoading: isPreviewLoading,refetch } =
    useFetchSingleBanner(bannerId || undefined);

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
     queryClient.invalidateQueries({
      predicate: (query) => query.queryKey[0] === "banners",
    });
    queryClient.invalidateQueries({
      queryKey: ["banner", bannerId],
    });
    },
  });

  const handleDelete = useCallback(
    (b: Banner) => {
      if (!b.id) {
        console.error("Cannot delete banner: ID is missing.");
        return;
      }

      
      setSelectedBanner(b);
      setIsOpen(true);
    },
    [deleteBanner]
  );

  const confirmDelete = useCallback(() => {
    if (selectedBanner?.id) {
      toast.dismiss()
      toast.loading("deleting banner....")
      deleteBanner(selectedBanner.id.toString());
      setIsOpen(false);
      setSelectedBanner(null);
    }
  }, [selectedBanner, deleteBanner]);

  const handlePreview = useCallback(async(banner: Banner) => {
    if (!banner.id) return;
    setbannerId(banner.id);
    setMode("view");
    setDrawerOpen(true); 
    setPreviewData(null); 
  setShowPreview(false);

  try {
    setTimeout(async () => {
      const { data } = await refetch();
      if (data) {
      setShowPreview(true)
      setPreviewData(data);
    }
    }, 100); 
  } catch (error) {
    console.error("Failed to fetch campaign:", error);
  }
  }, [refetch]);

  // Handlers
  const handleEdit = useCallback((b: Banner) => {
    setbannerId(b.id?.toString() ?? null);
    setMode("edit");
    setDrawerOpen(true);
  }, []);
  
  const columns = useMemo(
    () =>
      getBannerColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
        onView: handlePreview,
      }),
    [handleEdit, handleDelete,handlePreview]
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
                setSearch('')
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
                setPreviewData(null);
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

      {isLoading ? (
        <div className="flex justify-center py-8">
          <CustomLoader />
        </div>
      ) : (
        <DataTableWrapper columns={columns} data={bannerData?.banners||[]} />
      )}

      {totalPages > 1 && (
        <div className="flex justify-end   mt-4">
          <AdminCustomPagination
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
      setPreviewData(null);
      setShowPreview(false);
    }}
    title={
    mode === "edit"
      ? "Edit Banner"
      : mode === "view" || mode === "preview-edit"
      ? "View Banner"
      : "Add Banner"
  }
    mode={mode}
  >
    {(mode === "view" || mode === "preview-edit") && (
    !previewData || isPreviewLoading ? (
   
    <div className="flex justify-center py-10">
      <CustomLoader />
    </div>
  ) : (
      <BannerPreview
      mode={mode}
      showButtons={mode === "preview-edit"}
        data={previewData!}
        onBack={() =>{ setShowPreview(false)
          setMode(editBannerId ? "edit" : "add");
        }}
        onSubmit={() => {
          if (!previewData) return;
          const editBannerData = singleBannerData ?? null;

          submitBannerForm(
            previewData,
            editBannerData,
            createMutation,
            updateMutation,
            () => {
              setShowPreview(false);
              setPreviewData(null);
              setDrawerOpen(false);
            },
            () => {},
            () => setDrawerOpen(false)
          );
        }}
      />
    
    )
  )}
    {(mode === "add" || mode === "edit") && (
      isPreviewLoading?(
        <div><CustomLoader/></div>
      ):
    (
      <BannerForm
        initialData={{
          ...(singleBannerData||{}),
          ...(previewData||{}),
          image:
      previewData?.image || singleBannerData?.image || "",
      priority:previewData?.priority||singleBannerData?.priority||0,
    // existingImage:
    //   previewData?.existingImage || singleBannerData?.image,
        }}
        onClose={() => {
          setDrawerOpen(false);
          setPreviewData(null);
          setShowPreview(false);
        }}
        mode={mode}
        onPreview={(data) => {
          setPreviewData(data);
          setShowPreview(true);
           setMode("preview-edit");
        }}
        createMutation={createMutation}
        updateMutation={updateMutation}
      />
    ))}
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
    </section>
  );
};

export default BannerTable;
