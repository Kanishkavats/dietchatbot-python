"use client";

import React, { useState, useMemo, useCallback } from "react";
import CampaignForm from "./CampaignForm";
import { Campaign, CampaignSearchOptions } from "../Data/staticData";
import DataTableWrapper from "../Common/DataTableWrapper";
import CustomInput from "../Common/CustomInput";
import Dropdown from "../Common/Dropdown";
import { getCampaignColumns } from "./campaignColumns";
import Button from "../../common/Buttons/Button";
import Drawer from "../Common/Drawer";
import { useDeleteSignleCampaign, useFetchAllCampaigns, useFetchSingleCampaign } from "@/src/hooks/useCampaigns";
import EventPagination from "../../Eventpaginations";
import AnimatedReveal from "@/src/animations/AnimatedReveal";

type CampaignDataprops = {
  campaigns?: Campaign[]; // Assuming Campaign is the type for each campaign object
  totalPages?: number;
};

const CampaignTable = () => {
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<"title" | "organizer" | "category">("title");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editCampaign, setEditCampaign] = useState<string | null>(null);
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");

  // ✅ pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);

  const { data: campaignData, isLoading, isError } = useFetchAllCampaigns(currentPage, itemsPerPage);
  const { data: singleCampaignData, isLoading: isLoadingCampaign } = useFetchSingleCampaign(editCampaign || undefined);
  const { mutate: deleteCampaign } = useDeleteSignleCampaign();

  const handleEdit = useCallback((c: Campaign) => {
    setEditCampaign(c.id.toString());
    setMode("edit");
    setDrawerOpen(true);
  }, []);

  const handleView = useCallback((c: Campaign) => {
    setEditCampaign(c.id.toString());
    setMode("view");
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

  // ✅ directly use API campaigns (backend handles pagination)
  const paginatedData = useMemo(() => {

    if (!campaignData?.campaigns) return [];
    return campaignData.campaigns.map((c: any) => ({
      ...c,
      organizer: "Admin",
    }));
  }, [campaignData]);

  const totalPages = campaignData?.totalPages || 1;

  return (
    <div>
      {/* Top controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <AnimatedReveal direction="left" delay={0.1}>
          <div className="w-fit flex flex-col sm:flex-row gap-2">
            <Dropdown
              options={CampaignSearchOptions}
              value={searchField}
              onChange={setSearchField}
            />
            <CustomInput
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
        data={paginatedData}
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
          setEditCampaign(null);
          setMode("add");
        }}
        title={
          mode === "edit"
            ? "Edit Campaign"
            : mode === "view"
              ? "View Campaign"
              : "Add Campaign"
        }
       width="1220px"
      >
        {isLoadingCampaign ? (
          <p>Loading...</p>
        ) : (
          <CampaignForm
            initialData={singleCampaignData ?? undefined}
            onClose={() => setDrawerOpen(false)}
            readOnly={mode === "view"}
            mode={mode}
          />
        )}
      </Drawer>
    </div>
  );
};

export default CampaignTable;
