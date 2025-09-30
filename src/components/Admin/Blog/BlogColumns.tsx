import React from "react";
import { Blog, BlogColumnCallbacks } from "@/src/types/blog";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import TableRowActions from "../Campaign/CampaignActions";

export const getBlogColumns = ({
  onEdit,
  onDelete,
  onView,
}: BlogColumnCallbacks) => [
  { name: "SNo", cell: (_row: Blog, index: number) => index + 1, width: "80px" },
  { name: "Creator", selector: (row: Blog) => row.creator },
  { name: "Title", selector: (row: Blog) => row.title },
  { name: "Category", selector: (row: Blog) => row.category },
  { name: "Location", selector: (row: Blog) => row.location },  
  {
    name: "Created",
    selector: (row: Blog) =>
      row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
  },
  {
    name: "Updated",
    selector: (row: Blog) =>
      row.updatedAt ? new Date(row.createdAt).toLocaleDateString() : "-",
  },
  {
    name: "Actions",
    cell: (row: Blog) => (
      <TableRowActions
        row={row}
        actions={[
          {
            label: "View Blog",
            icon: <FaEye />,
            onClick: onView,
            colorClass: "text-blue-500 hover:text-blue-700",
          },
          {
            label: "Edit Blog",
            icon: <FaEdit />,
            onClick: onEdit,
            colorClass: "text-green-500 hover:text-green-700",
          },
          {
            label: "Delete Blog",
            icon: <FaTrash />,
            onClick: onDelete,
            colorClass: "text-red-500 hover:text-red-700",
          },
        ]}
      />
    ),
  },
];
