import React from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import TableRowActions from "../Campaign/CampaignActions"; 
import { Query } from "@/src/types/query";

interface QueryColumnCallbacks {
  onEdit: (Query: Query) => void;
  onDelete: (Query: Query) => void;
  onView?: (Query: Query) => void;
}

export const getQueryColumns = ({
  onEdit,
  onDelete,
  onView,
}: QueryColumnCallbacks) => [
  {
    name: "SNo",
    cell: (_row: Query, index: number) => index + 1,
    width: "80px",
  },
  {
    name: "Form Type",
    selector: (row: Query) => row.formType || "-",
    sortable: true,
  },
  {
    name: "Email",
    selector: (row: Query) => row.email || "-",
    sortable: true,
  },
  {
    name: "Phone",
    selector: (row: Query) => row.phone || "-",
    sortable: true,
  },
  {
    name: "Message",
    selector: (row: Query) => row.message || "-",
    sortable: true,
  },
  {
    name: "Viewed",
    selector: (row: Query) => row.isViewed ? "true": "false" ,
  },
  {
    name: "Actions",
    cell: (row: Query) => (
      <TableRowActions
        row={row}
        actions={[
          ...(onView
            ? [
                {
                  label: "View Query",
                  icon: <FaEye />,
                  onClick: onView,
                  colorClass: "text-blue-500 hover:text-blue-700",
                },
              ]
            : []),
          {
            label: "Edit Query",
            icon: <FaEdit />,
            onClick: onEdit,
            colorClass: "text-green-500 hover:text-green-700",
          },
          {
            label: "Delete Query",
            icon: <FaTrash />,
            onClick: onDelete,
            colorClass: "text-red-500 hover:text-red-700",
          },
        ]}
      />
    ),
  },
];
