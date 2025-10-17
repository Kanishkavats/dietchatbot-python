"use client";
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
import {
  submitMemberForm,
  useDeleteSingleMember,
  useFetchAllMembers,
  useFetchSingleMember,
} from "@/src/components/Admin/hooks/useMembers";
import { createMember, updateMember } from "../services/memberApi";
import { memberSearchOptions } from "../Data/staticData";
import MemberPreview from "./MemberPreview";
import CustomLoader from "../../common/Loader/CustomLoader";
import AdminCustomPagination from "../Common/CustomePagination";
import ConfirmModal from "../Common/ConfirmModal";
import useDebounce from "@/src/hooks/useDebounce";

const MemberTable = () => {
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<"name" | "position" | "title">(
    "name"
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editMember, setEditMember] = useState<string | null>(null);
  const [mode, setMode] = useState<"add" | "edit" | "view"|"preview-edit">("add");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const[showPreview,setShowPreview]=useState<boolean>();
  const [previewData, setPreviewData] = useState<MemberFormValues | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [singleMemberFallback, setSingleMemberFallback] =
    useState<MemberFormValues | null>(null);
    const debounceValue=useDebounce(search,1000);

  const { data: memberData, isLoading } = useFetchAllMembers(
    currentPage,
    itemsPerPage,
    debounceValue
  );
  const { data: singleMemberData, isLoading: isLoadingMember ,refetch} =
    useFetchSingleMember(editMember || undefined);
    console.log("check", singleMemberData)
  
  const { mutate: deleteMember } = useDeleteSingleMember();

  const handleEdit = useCallback((m: Member) => {
    setEditMember(m.id.toString());
    setMode("edit");
    setDrawerOpen(true);
    
    // // Set fallback data immediately for edit mode only
    // setSingleMemberFallback(m as any);
  }, []);

  const handleView = useCallback((member: Member) => {
    setEditMember(member.id.toString());
    setMode("view");
    setDrawerOpen(true)
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

  const handleDelete = useCallback(
    (m: Member) => {
      setSelectedMember(m);
      setIsOpen(true);
    },
    [deleteMember]
  );
  const confirmDelete = useCallback(() => {
    if (selectedMember) {
      deleteMember(selectedMember.id.toString());
      setIsOpen(false);
      setSelectedMember(null);
    }
  }, [selectedMember, deleteMember]);

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
  const filteredData = useMemo(() => paginatedData, [paginatedData]);
  
  

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
                setSearch('')
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
                setMode("add");
                // setSingleMemberFallback(null);
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

      {isLoading ? (
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
            setEditMember(null);
            setMode("add");
            // setSingleMemberFallback(null);
            setPreviewData(null);
            setShowPreview(false)
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
          {(mode === "view" || mode === "preview-edit") && (
    !previewData || isLoadingMember ? (
   
    <div className="flex justify-center py-10">
      <CustomLoader />
    </div>
  ) : (
            <MemberPreview
              data={previewData!}
              showButton={mode === "preview-edit"}
              mode={mode}
              onBack={() =>{ setShowPreview(false)
          setMode(editMember ? "edit" : "add");
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
                    // setSingleMemberFallback(null);
                  },
                  () => {},
                  () => setDrawerOpen(false)
                );
              }}
            />
            )
  )}
           {(mode === "add" || mode === "edit") && (
      isLoadingMember?(
        <div><CustomLoader/></div>
      ):
    (
              <MemberForm
              key={`${editMember || 'new'}-${mode}`} // Force re-render when editMember or mode changes
              initialData={{
                ...(singleMemberData||{}),
                ...(previewData||{}),
                // image:previewData?.image||singleMemberData?.image||'',
              }}
              onClose={() => {
                setDrawerOpen(false);
                setEditMember(null);
                // setMode("add");
                setShowPreview(false)
                // setSingleMemberFallback(null);
              }}
              mode={mode}
              onPreview={(data) => {
                setPreviewData(data);
                setShowPreview(true)
                setMode("preview-edit");
                // setSingleMemberFallback(null);
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

export default MemberTable;
