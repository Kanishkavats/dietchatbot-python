import { Category, CategoryColumnCallbacks } from "@/src/types/category";
import TableRowActions from "../Campaign/CampaignActions";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

export const getCategoryColumns = ({
  onEdit,
  onDelete,
  onView,
}: CategoryColumnCallbacks) => [
    { name: "SNo", cell: (_row: Category, index: number) => index + 1, width: "80px" },
    { name: "Name", selector: (row: Category) => row.name.en, sortable: true },
    {
      name: "Actions",
      cell: (row: Category) => (
        <TableRowActions
          row={row}
          actions={[
            { label: "View Category", icon: <FaEye />, onClick: onView, colorClass: "text-blue-500 hover:text-blue-700" },
            { label: "Edit Category", icon: <FaEdit />, onClick: onEdit, colorClass: "text-green-500 hover:text-green-700" },
            { label: "Delete Category", icon: <FaTrash />, onClick: onDelete, colorClass: "text-red-500 hover:text-red-700" },
          ]}
        />
      ),
    },
  ];