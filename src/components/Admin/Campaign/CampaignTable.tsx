"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CampaignActions from "./CampaignActions";
import CampaignForm from "./CampaignForm";
import { Campaign, CampaignSearchOptions, initialCampaigns } from "../Data/staticData";
import DataTableWrapper from "../Common/DataTableWrapper";
import CustomInput from "../Common/CustomInput";
import Dropdown from "../Common/Dropdown";
import { getCampaignColumns } from "./campaignColumns";
import Button from "../../common/Buttons/Button";
import Drawer from "../Common/Drawer";
import { useDeleteSignleCampaign, useFetchAllCampaigns, useFetchSingleCampaign } from "@/src/hooks/useCampaigns";

const CampaignTable = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
    const [search, setSearch] = useState("");
    const [searchField, setSearchField] = useState<"title" | "organizer" | "category">("title");
    const [drawerOpen, setDrawerOpen] = useState(false);
    // const [editCampaign, setEditCampaign] = useState<Campaign | null>(null);
    const [editCampaign, setEditCampaign] = useState<string | null>(null);
    const [mode, setMode] = useState<"add" | "edit" | "view">("add");



    const { data: campaignData, isLoading, isError } = useFetchAllCampaigns();
    const { data: singleCampaignData, isLoading: isLoadingCampaign } = useFetchSingleCampaign(editCampaign || undefined);
    const { mutate: deleteCampaign, isPending: isDeleting } = useDeleteSignleCampaign();


    const handleEdit = useCallback((c: Campaign) => {
        setEditCampaign(c.id.toString());
        setMode("edit");
        setDrawerOpen(true);
    }, []);

    const handleView = useCallback((c: Campaign) => {
        console.log("campaign", c )
        setEditCampaign(c.id.toString());
        setMode("view");
        setDrawerOpen(true);
    }, []);



    const filteredData = useMemo(() => {
        return campaigns.filter((c) =>
            (c[searchField] || "").toLowerCase().includes(search.toLowerCase())
        );
    }, [campaigns, search, searchField]);

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

    return (
        <div>
            {/* Top controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
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
                    />
                </div>
            </div>

            <DataTableWrapper
                columns={columns}
                data={campaignData?.campaigns?.map((c: any) => ({
                    ...c,
                    organizer: "Admin",
                }))}
                // data={filteredData}
                pagination
            />


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
                width="450px"
            >
                {isLoadingCampaign ? (
                    <p>Loading...</p>
                ) : (
                    <CampaignForm
                        initialData={singleCampaignData ?? undefined}
                        onClose={() => setDrawerOpen(false)}
                        readOnly={mode === "view"}
                    />
                )}
            </Drawer>


        </div>
    );
};

export default CampaignTable;
