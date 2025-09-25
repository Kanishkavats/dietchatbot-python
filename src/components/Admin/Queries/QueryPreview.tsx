import React from "react";

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
  if (!data)
    return <div className="text-center text-gray-500 py-6">No data to preview.</div>;

  const {
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
  } = data;

  return (
    <div className=" bg-white   w-full mx-auto space-y-5">
 
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
    </div>
  );
};

export default QueryPreview;
