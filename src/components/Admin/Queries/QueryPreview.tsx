import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import CustomLoader from "../../common/Loader/CustomLoader";
import Button from "../../common/Buttons/Button";

const FieldRow = ({ label, value, isLast = false, isBool = false }) => {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    (isBool && typeof value !== "boolean")
  )
    return null;

  return (
    <div
      className={`grid grid-cols-3 gap-x-4 gap-y-3 text-gray-800 ${
        isLast ? "" : "border-b border-gray-200"
      } py-2`}
    >
      <div className="font-semibold text-gray-700">{label}:</div>
      <div className="col-span-2 break-words">
        {isBool ? (value ? "Yes" : "No") : value}
      </div>
    </div>
  );
};

const QueryPreview = ({ data }) => {
  const queryClient = useQueryClient();

  const {
    id,
    address,
    createdAt,
    email,
    firstName,
    formType,
    isViewed,
    lastName,
    message,
    occupation,
    phone,
  } = data || {};

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await axios.patch(`/api/queries/${id}/mark-viewed`);
    },
    onSuccess: () => {
      // Refetch or manually update query data
      queryClient.invalidateQueries({ queryKey: ["queries"] });
    },
  });

  const handleMarkAsViewed = () => {
    if (id) mutate();
  };

  if (!data)
    return <div className="text-center text-gray-500 py-6">No data to preview.</div>;

  return (
    <div className="bg-white w-full mx-auto space-y-3">
      <FieldRow label="Form Type" value={formType} />
      <FieldRow
        label="Created At"
        value={createdAt ? new Date(createdAt).toLocaleString() : null}
      />
      <FieldRow label="Email" value={email} />
      <FieldRow label="First Name" value={firstName} />
      <FieldRow label="Last Name" value={lastName} />
      <FieldRow label="Address" value={address} />
      <FieldRow label="Phone" value={phone} />
      <FieldRow label="Occupation" value={occupation} />
      <FieldRow label="Message" value={message} />
      <FieldRow label="Viewed" value={isViewed} isBool isLast />

      {/* Mark as Viewed Button */}
      {!isViewed && (
        <div className="pt-4 flex justify-center w-fit">
          <Button 
            onClick={handleMarkAsViewed}
            text="Mark as Viewed"
            icon=""
          />
          <button
            onClick={handleMarkAsViewed}
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium text-white bg-lime-green hover:bg-green rounded disabled:opacity-50"
          >
            {isPending ? "Marking..." : "Mark as Viewed"}
          </button>
        </div>
      )}
    </div>
  );
};

export default QueryPreview;
