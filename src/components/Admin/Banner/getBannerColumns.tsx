import React from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import TableRowActions from "../Campaign/CampaignActions";
import { Banner } from "@/src/types/banner";

interface BannerColumnCallbacks {
  onEdit: (banner: Banner) => void;
  onDelete: (banner: Banner) => void;
  onView?: (banner: Banner) => void; // Optional if view is not needed
}

export const getBannerColumns = ({
  onEdit,
  onDelete,
  onView,
}: BannerColumnCallbacks) => [
  {
    name: "SNo",
    cell: (_row: Banner, index: number) => index + 1,
    width: "80px",
  },
  {
    name: "Title",
    selector: (row: Banner) => row.title || "-",
  },
  {
    name: "Subtitle",
    selector: (row: Banner) => row.subtitle || "-",
  },
  {
    name: "Created",
    selector: (row: Banner) =>
      row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
  },
  {
    name: "Updated",
    selector: (row: Banner) =>
      row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : "-",
  },
  {
    name: "Actions",
    cell: (row: Banner) => (
      <TableRowActions
        row={row}
        actions={[
          ...(onView
            ? [
                {
                  label: "View Banner",
                  icon: <FaEye />,
                  onClick: onView,
                  colorClass: "text-blue-500 hover:text-blue-700",
                },
              ]
            : []),
          {
            label: "Edit Banner",
            icon: <FaEdit />,
            onClick: onEdit,
            colorClass: "text-green-500 hover:text-green-700",
          },
          {
            label: "Delete Banner",
            icon: <FaTrash />,
            onClick: onDelete,
            colorClass: "text-red-500 hover:text-red-700",
          },
        ]}
      />
    ),
  },
];
