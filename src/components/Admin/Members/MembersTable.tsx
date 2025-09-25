'use client'
import React, { useState, useMemo, useCallback, useRef } from "react";
import Breadcrumb from "../Breadcrumb";
import DataTableWrapper from "../Common/DataTableWrapper";
import CustomInput from "../Common/CustomInput";
import Dropdown from "../Common/Dropdown";
import Button from "../../common/Buttons/Button";
import Drawer from "../Common/Drawer";

import AnimatedReveal from "@/src/animations/AnimatedReveal";
import { MemberFormValues } from "@/src/utils/validations/FormValidation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import MemberForm from "./MemberForm";
import { Member } from "@/src/types/members";
import { getMemberColumns } from "./getMemberColumns";
import { submitMemberForm, useDeleteSingleMember, useFetchAllMembers, useFetchSingleMember } from "@/src/hooks/useMembers";
import { createMember, updateMember } from "@/src/services/memberApi";
import { memberSearchOptions } from "../Data/staticData";
import MemberPreview from "./MemberPreview";
import CustomPagination from "../../common/CustomPaginatioin";
import CustomLoader from "../../common/Loader/CustomLoader";

const MemberTable = () => {
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<"name" | "position" | "title">("name");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editMember, setEditMember] = useState<string | null>(null);
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [previewData, setPreviewData] = useState<MemberFormValues | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [singleMemberFallback, setSingleMemberFallback] = useState<MemberFormValues | null>(null);

  const { data: memberData } = useFetchAllMembers(currentPage, itemsPerPage);
  const { data: singleMemberData, isLoading: isLoadingMember } = useFetchSingleMember(editMember || undefined);
  const { mutate: deleteMember } = useDeleteSingleMember();

  const handleEdit = useCallback((m: Member) => {
    setEditMember(m.id.toString());
    setMode("edit");
    setDrawerOpen(true);
  }, []);

  const handleView = useCallback((member: Member) => {
    setEditMember(member.id.toString());
    setMode("view");
    setPreviewData(member);
    setDrawerOpen(true);
  }, []);

  const handleDelete = useCallback(
    (m: Member) => {
      if (confirm(`Are you sure you want to delete "${m.name}"?`)) {
        deleteMember(m.id.toString());
      }
    },
    [deleteMember]
  );

  const columns = useMemo(
    () =>
      getMemberColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
        onView: handleView,
      }),
    [handleEdit, handleDelete, handleView]
  );

  const paginatedData = useMemo(() => {
    if (!memberData?.members) return [];
    return memberData.members.map((m: any) => ({
      ...m,
      role: m.role || "Member",
    }));
  }, [memberData]);

  const totalPages = memberData?.totalPages || 1;

  const filteredData = useMemo(() => {
    return paginatedData.filter((member: Member) => {
      const value = member[searchField as keyof Member];
      return value?.toString().toLowerCase().includes(search.toLowerCase());
    });
  }, [paginatedData, search, searchField]);

  // Mutations
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; values: MemberFormValues }) =>
      updateMember(data.id, data.values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });

  return (
    <section>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <AnimatedReveal direction="left" delay={0.1}>
          <div className="w-fit flex flex-row gap-2">
            <Dropdown
              options={memberSearchOptions}
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
              text="Add Member"
              onClick={() => {
                setDrawerOpen(true);
                setEditMember(null);
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
        data={filteredData}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end mt-4">
          <CustomPagination
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
            setEditMember(null);
            setMode("add");
          }}
          title={
            mode === "edit"
              ? "Edit Member"
              : mode === "view"
                ? "View Member"
                : "Add Member"
          }
          mode={mode}
        >
          {previewData ? (
            <MemberPreview
              data={previewData}
              mode={mode}
              onBack={() => {
                setSingleMemberFallback(previewData);
                setPreviewData(null);
              }}
              onSubmit={() => {
                submitMemberForm(
                  { ...previewData, keyPoints: previewData.keyPoints },
                  singleMemberData,
                  createMutation,
                  updateMutation,
                  () => {
                    setPreviewData(null);
                    setDrawerOpen(false);
                    setSingleMemberFallback(null);
                  },
                  () => { },
                  () => setDrawerOpen(false)
                );
              }}
            />
          ) : isLoadingMember ? (
            <CustomLoader />
          ) : (
            <MemberForm
              initialData={singleMemberFallback || singleMemberData || undefined}
              onClose={() => setDrawerOpen(false)}
              mode={mode}
              onPreview={(data) => {
                setPreviewData(data);
                setSingleMemberFallback(null);
              }}
              createMutation={createMutation}
              updateMutation={updateMutation}
            />
          )}


        </Drawer>
      )}
    </section>
  );
};

export default MemberTable;
