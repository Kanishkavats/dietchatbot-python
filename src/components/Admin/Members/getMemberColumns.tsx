import React from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import TableRowActions from "../Campaign/CampaignActions"; // Adjust if your path is different
import { Member } from "@/src/types/members";

interface MemberColumnCallbacks {
  onEdit: (member: Member) => void;
  onDelete: (member: Member) => void;
  onView?: (member: Member) => void;
}

export const getMemberColumns = ({
  onEdit,
  onDelete,
  onView,
}: MemberColumnCallbacks) => [
  {
    name: "SNo",
    cell: (_row: Member, index: number) => index + 1,
    width: "80px",
  },
  {
    name: "Name",
    selector: (row: Member) => row.name || "-",
    sortable: true,
  },
  {
    name: "Position",
    selector: (row: Member) => row.position || "-",
    sortable: true,
  },
  {
    name: "Title",
    selector: (row: Member) => row.title || "-",
  },
  {
    name: "Created",
    selector: (row: Member) =>
      row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
  },
  {
    name: "Updated",
    selector: (row: Member) =>
      row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : "-",
  },
  {
    name: "Actions",
    cell: (row: Member) => (
      <TableRowActions
        row={row}
        actions={[
          ...(onView
            ? [
                {
                  label: "View Member",
                  icon: <FaEye />,
                  onClick: onView,
                  colorClass: "text-blue-500 hover:text-blue-700",
                },
              ]
            : []),
          {
            label: "Edit Member",
            icon: <FaEdit />,
            onClick: onEdit,
            colorClass: "text-green-500 hover:text-green-700",
          },
          {
            label: "Delete Member",
            icon: <FaTrash />,
            onClick: onDelete,
            colorClass: "text-red-500 hover:text-red-700",
          },
        ]}
      />
    ),
  },
];
