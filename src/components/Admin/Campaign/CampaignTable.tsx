

'use client';

import React, { useState, useMemo, useCallback, useRef } from "react";
import CampaignForm from "./CampaignForm";
import {  CampaignSearchOptions } from "../Data/staticData";
import DataTableWrapper from "../Common/DataTableWrapper";
import CustomInput from "../Common/CustomInput";
import Dropdown from "../Common/Dropdown";
import { getCampaignColumns } from "./campaignColumns";
import Button from "../../common/Buttons/Button";
import Drawer from "../Common/Drawer";
import {
  useDeleteSignleCampaign,
  useFetchAllCampaigns,
  useFetchSingleCampaign,
  submitCampaignForm
} from "@/src/hooks/useCampaigns";
import { CampaignFormValues } from "@/src/utils/validations/FormValidation";
import AnimatedReveal from "@/src/animations/AnimatedReveal";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCampaign, updateCampaign } from "@/src/services/campaignApi";
import CampaignPreview from "./CampaignPreview";
import { Campaign } from "@/src/types/campaign";
import AdminCustomPagination from "../Common/CustomePagination";
import CustomLoader from "../../common/Loader/CustomLoader";
import { useLanguageToggle } from "../hooks/useLanguageToggle";

const CampaignTable = () => {
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<"title" | "organizer" | "category">("title");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editCampaign, setEditCampaign] = useState<string | null>(null);
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showPreview, setShowPreview] = useState(false);

  const [previewData, setPreviewData] = useState<CampaignFormValues | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const{language,toggleLanguage}=useLanguageToggle();

  const { data: campaignData , isLoading } = useFetchAllCampaigns(currentPage, itemsPerPage);
  const { data: singleCampaignData, isLoading: isLoadingCampaign } = useFetchSingleCampaign(editCampaign || undefined);
  const { mutate: deleteCampaign } = useDeleteSignleCampaign();
  const totalPages = campaignData?.totalPages || 1;

const lang=language
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
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
const normalizeCampaignData = (data: any): CampaignFormValues & { existingImages: string[] } => {
  return {
    title: data.title ?? { en: "", hi: "" },
    category: data.category ?? { en: "", hi: "" },
    description: data.description ?? { en: "", hi: "" },
    goalAmount: data.goalAmount ?? 0,
    summary: data.summary ?? { en: "", hi: "" },
    keyPoints: data.keyPoints ?? { en: [], hi: [] },
    location: data.location ?? { en: "", hi: "" },
    images: Array.isArray(data.images) ? data.images.filter(Boolean) : [],
    existingImages: Array.isArray(data.existingImages)
      ? data.existingImages.filter((img:any): img is string => !!img)
      : [],
  };
};


  const handleEdit = useCallback((c: Campaign) => {
    setEditCampaign(c.id.toString());
    setMode("edit");
    setDrawerOpen(true);
  }, []);

  const handleView = useCallback((c: Campaign) => {
    setEditCampaign(c.id.toString());
    setMode("view");
    setPreviewData(normalizeCampaignData(c));
    setDrawerOpen(true);
  }, []);

  const handleDelete = useCallback(
    (c: Campaign) => {
      if (confirm(`Are you sure you want to delete "${c.title}"?`)) {
        deleteCampaign(c.id.toString());
      }
    },
    [deleteCampaign]
  );

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


  const filteredData = useMemo(() => {
  return paginatedData.filter((campaign: Campaign) => {
    const fieldValue = campaign[searchField];
    if (typeof fieldValue === "string") return fieldValue.toLowerCase().includes(search.toLowerCase());
    if (typeof fieldValue === "object" && fieldValue?.[lang]) return fieldValue[lang].toLowerCase().includes(search.toLowerCase());
    return false;
  });
}, [paginatedData, search, searchField, lang]);
  const normalizedCampaignData = useMemo(() => {
  if (!singleCampaignData) return undefined;

  // Ensure both images and existingImages contain URLs
  const stringImages =
    singleCampaignData.images?.filter((img: any) => typeof img === "string") ?? [];

  return {
    ...singleCampaignData,
    existingImages: singleCampaignData.existingImages ?? stringImages,
    images: singleCampaignData.images ?? stringImages,
  };
}, [singleCampaignData]);


  return (
    <div>
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <AnimatedReveal direction="left" delay={0.1}>
          <div className="w-fit flex flex-row gap-2">
            <Dropdown
              options={CampaignSearchOptions}
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
              text="Add Campaign"
              onClick={() => {
                setDrawerOpen(true);
                setEditCampaign(null);
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
          setEditCampaign(null);
          setMode("add");
          setPreviewData(null);
        }}
        title={
          mode === "edit"
            ? "Edit Campaign"
            : mode === "view"&&!previewData
              ? "View Campaign"
              : "Add Campaign"
        }
        mode={mode}

      >
        {/* /* {previewData ? ( */}
         
        {showPreview ? (
  <CampaignPreview
    mode={mode}
    data={normalizeCampaignData(previewData)}
    onBack={() => {
  setShowPreview(false); // 👈 only hide preview
      // keep previewData so CampaignForm can use it
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
        () => {},
        () => setDrawerOpen(false)
      );
    }}
  />
) : (
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
      setShowPreview(true); // 👈 toggle preview
    }}
    createMutation={createMutation}
    updateMutation={updateMutation}
  />
)}
      </Drawer>
      )}
    </div>
  );
};

export default CampaignTable;

