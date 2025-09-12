"use client";

import { Tooltip } from "@mui/material";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Campaign } from "../Data/staticData";

interface Props {
  row: Campaign;
  onEdit: (campaign: Campaign) => void;
  onDelete: (campaign: Campaign) => void;
  onView: (campaign: Campaign) => void;
}

const CampaignActions = ({ row, onEdit, onDelete, onView }: Props) => {
  return (
    <div className="flex gap-3">
      <Tooltip title="View Campaign">
        <button
          onClick={() => onView(row)}
          className="text-blue-50 hover:text-blue cursor-pointer"
        >
          <FaEye />
        </button>
      </Tooltip>
      <Tooltip title="Edit Campaign">
        <button
          onClick={() => onEdit(row)}
          className="text-lime-green hover:text-green cursor-pointer"
        >
          <FaEdit />
        </button>
      </Tooltip>
      <Tooltip title="Delete Campaign">
        <button
          onClick={() => onDelete(row)}
          className="text-red hover:text-red-700 cursor-pointer"
        >
          <FaTrash />
        </button>
      </Tooltip>
    </div>
  );
};

export default CampaignActions;
