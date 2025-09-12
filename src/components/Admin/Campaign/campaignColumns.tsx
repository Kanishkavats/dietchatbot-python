import React from "react";
import { Campaign } from "../Data/staticData";
import CampaignActions from "./CampaignActions";
import { CampaignColumnCallbacks } from "@/src/types/campaign";



export const getCampaignColumns = ({
  onEdit,
  onDelete,
  onView,
}: CampaignColumnCallbacks) => [
  { name: "ID", selector: (row: Campaign) => row.id, width: "80px" },
  { name: "Title", selector: (row: Campaign) => row.title, sortable: true },
  { name: "Organizer", selector: (row: Campaign) => row.organizer },
  { name: "Category", selector: (row: Campaign) => row.category },
  {
    name: "Goal",
    selector: (row: Campaign) => `₹${row.goalAmount.toLocaleString()}`,
  },
  {
    name: "Raised",
    selector: (row: Campaign) => `₹${row.raisedAmount.toLocaleString()}`,
  },
  { name: "Status", selector: (row: Campaign) => row.status },
  {
    name: "Actions",
    cell: (row: Campaign) => (
      <CampaignActions
        row={row}
        onEdit={onEdit}
        onDelete={onDelete}
        onView={onView}
      />
    ),
  },
];
