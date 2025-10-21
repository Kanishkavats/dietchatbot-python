

'use client';

import React, { useState, useMemo, useCallback, useRef } from "react";
import CampaignForm from "./CampaignForm";
import { CampaignSearchOptions } from "../Data/staticData";
import DataTableWrapper from "../../UI/admin/DataTableWrapper";
import CustomInput from "../../UI/admin/CustomInput";
import Dropdown from "../../UI/admin/Dropdown";
import { getCampaignColumns } from "./campaignColumns";
import Drawer from "../../UI/admin/Drawer";
import {
  useDeleteSignleCampaign,
  useFetchAllCampaigns,
  useFetchSingleCampaign,
  submitCampaignForm
} from '@/src/hooks/admin/useCampaigns'
import { CampaignFormValues } from "@/src/utils/validations/FormValidation";
import AnimatedReveal from "@/src/animations/AnimatedReveal";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCampaign, updateCampaign } from "@/src/services/admin/campaignApi";
import CampaignPreview from "./CampaignPreview";
import { Campaign, statusValue } from "@/src/types/admin/campaign";
import AdminCustomPagination from "../../UI/admin/CustomePagination";
import { useLanguageToggle } from "@/src/hooks/web/useLanguageToggle";
import toast from "react-hot-toast";
import ConfirmModal from "../../UI/admin/ConfirmModal";
import useDebounce from "@/src/hooks/web/useDebounce";
import { useFetchCategory } from "@/src/hooks/admin/useCategory";
import Button from "../../UI/web/Buttons/Button";
import CustomLoader from "../../UI/web/Loader/CustomLoader";
import { Category } from "@/src/types/admin/category";

const CampaignTable = () => {
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<"title" | "category" | "status">("title");
  const [statusField, setStatusField] = useState<"active" | "completed" | "inactive" | "status">("active");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editCampaign, setEditCampaign] = useState<string | null>(null);
  const [mode, setMode] = useState<"add" | "edit" | "view" | "preview-edit">("add");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showPreview, setShowPreview] = useState(false);

  const [previewData, setPreviewData] = useState<CampaignFormValues | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const searchedData = useDebounce(search, 1000);
  const { language } = useLanguageToggle();

  const { data: campaignData, isLoading } = useFetchAllCampaigns(currentPage, itemsPerPage, searchedData, searchField) as { data: { campaigns: Campaign[]; totalPages: number }, isLoading: boolean };
  const { data: singleCampaignData, isLoading: isLoadingCampaign, refetch } = useFetchSingleCampaign(editCampaign || undefined) as { data: Campaign, isLoading: boolean, refetch: any}; ;
  const { mutate: deleteCampaign } = useDeleteSignleCampaign();
  const totalPages = campaignData?.totalPages || 1;
  const { data: categoryData } = useFetchCategory();
  const categoryOptions =
    categoryData?.category?.map((category: Category) => ({
      label: category.name?.[language] || category.name.en,
      value: category.name?.[language] || category.name.en,
    })) ?? [];

  const lang = language
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; values: CampaignFormValues }) =>
      updateCampaign(data.id, data.values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "campaigns",
      });
      queryClient.invalidateQueries({
        queryKey: ["campaign", editCampaign],
      });
    },
  });
  const normalizeCampaignData = (data: any): CampaignFormValues & { existingImages: string[] } => {
    const hasFileImages = Array.isArray(data.images) && data.images.some((img: any) => typeof img !== 'string');
    const serverUrlsFrom = (arr: any[]) => arr.filter((img: any): img is string => typeof img === 'string' && !!img);

    return {
      title: data.title ?? { en: "", hi: "" },
      category: data.category ?? { en: "", hi: "" },
      description: data.description ?? { en: "", hi: "" },
      goalAmount: data.goalAmount ?? '',
      summary: data.summary ?? { en: "", hi: "" },
      keyPoints: data.keyPoints ?? { en: [], hi: [] },
      location: data.location ?? { en: "", hi: "" },
      images: hasFileImages ? (data.images as any[]) : [],
      existingImages: hasFileImages
        ? (Array.isArray(data.existingImages) ? serverUrlsFrom(data.existingImages) : [])
        : Array.isArray(data.existingImages)
          ? serverUrlsFrom(data.existingImages)
          : Array.isArray(data.images)
            ? serverUrlsFrom(data.images)
            : [],
    };
  };


  const handleEdit = useCallback((c: Campaign) => {
    setEditCampaign(c.id.toString());
    setMode("edit");
    setDrawerOpen(true);
  }, []);

  const handleView = useCallback(async (c: Campaign) => {
    setEditCampaign(c.id.toString());
    setMode("view");
    setDrawerOpen(true);
    setPreviewData(null);
    setShowPreview(false);
    try {
      setTimeout(async () => {
        const { data } = await refetch();
        if (data) {
          setPreviewData(normalizeCampaignData(data));
          setShowPreview(true);
        }
      }, 100);
    } catch (error) {
      console.error("Failed to fetch campaign:", error);
    }
  }, [refetch]);

  const handleDelete = useCallback(
    (c: Campaign) => {
      if (!c.id) {
        console.error("Cannot delete Campaign: ID is missing.");
        return;
      }
      setSelectedCampaign(c);
      setIsOpen(true);
    },
    [deleteCampaign]
  );
  const confirmDelete = useCallback(() => {
    if (selectedCampaign?.id) {
      toast.dismiss();
      toast.loading("Deleting Campaign....")
      deleteCampaign(selectedCampaign.id.toString());
      setIsOpen(false);
      setSelectedCampaign(null);
    }
  }, [selectedCampaign, deleteCampaign]);

  const columns = useMemo(
    () =>
      getCampaignColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
        onView: handleView,
      }),
    [handleEdit, handleDelete, handleView]
  );

  const paginatedData = useMemo(() => {
    if (!campaignData?.campaigns) return [];
    return campaignData.campaigns.map((c: any) => ({
      ...c,
      organizer: c.organizer || "Admin",
    }));
  }, [campaignData]);

  const filteredData = useMemo(() => paginatedData, [paginatedData]);



  const normalizedCampaignData = useMemo(() => {
    if (!singleCampaignData) return undefined;

    const stringImages = Array.isArray(singleCampaignData.images)
      ? singleCampaignData.images.filter((img: any) => typeof img === "string" && !!img)
      : [];

    return {
      ...singleCampaignData,
      images: Array.isArray(singleCampaignData.images)
        ? singleCampaignData.images.filter((img: any) => typeof img !== "string")
        : [],
      existingImages: singleCampaignData.existingImages?.length
        ? singleCampaignData.existingImages
        : stringImages,
    };
  }, [singleCampaignData]);


  return (
    <div>
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <AnimatedReveal direction="left" delay={0.1}>
          <div className=" flex flex-row gap-2">
            <Dropdown
              options={CampaignSearchOptions}
              value={searchField}
              onChange={(value) => {
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
                onChange={(value) => {
                  if (value) setSearch(value)
                }}
              />

            </>) : ((searchField === 'status') ? (<>
              <Dropdown
                options={statusValue}
                value={statusField}
                onChange={(value) => {
                  setSearch(value)
                  setStatusField(value)
                }}
              />
            </>) : (
              <CustomInput
                ref={searchInputRef}
                placeholder={`Search by ${searchField}...`}
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              />
            ))}
          </div>
        </AnimatedReveal>

        <AnimatedReveal direction="left" delay={0.3}>
          <div className="w-fit">
            <Button
              text="Add Campaign"
              onClick={() => {
                setDrawerOpen(true);
                setEditCampaign(null);
                setPreviewData(null);
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
        <DataTableWrapper
          columns={columns}
          data={paginatedData}
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
            setEditCampaign(null);
            setMode("add");
            setPreviewData(null);
          }}
          // &&!previewData
          title={
            mode === "edit"
              ? "Edit Campaign"
              : mode === "view" || mode === "preview-edit"
                ? "View Campaign"
                : "Add Campaign"
          }
          mode={mode}

        >
          {(mode === "view" || mode === "preview-edit") && (
            !previewData || isLoadingCampaign ? (

              <div className="flex justify-center py-10">
                <CustomLoader />
              </div>
            ) : (
              <CampaignPreview
                mode={mode}
                showButton={mode === "preview-edit"}
                data={normalizeCampaignData(previewData)}
                onBack={() => {
                  setShowPreview(false);
                  setMode(editCampaign ? "edit" : "add");

                }}
                onSubmit={() => {

                  submitCampaignForm(
                    { ...previewData!, keyPoints: previewData!.keyPoints },
                    singleCampaignData,
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
              />
            )
          )}
          {(mode === "add" || mode === "edit") && (
            isLoadingCampaign ? (
              <div><CustomLoader /></div>
            ) :
              (
                <CampaignForm
                  initialData={{
                    ...(normalizedCampaignData ?? {}),
                    ...(previewData ?? {}),
                    // Ensure both arrays persist
                    images:
                      previewData?.images?.length
                        ? previewData.images
                        : normalizedCampaignData?.images ?? [],
                    existingImages:
                      previewData?.existingImages?.length
                        ? previewData.existingImages
                        : normalizedCampaignData?.existingImages ?? [],
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
        onConfirm={confirmDelete}
        onCancel={() => setIsOpen(false)}
        title="Confirm Delete"
        message="Are you sure you want to delete these record ?"
        buttonText="Delete"
      />
    </div>
  );
};

export default CampaignTable;

