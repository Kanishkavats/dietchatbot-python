'use client'

import React from "react";
import { BannerFormValues } from "@/src/utils/validations/FormValidation";
import Button from "../../common/Buttons/Button";

interface BannerPreviewProps {
  data: BannerFormValues;
}

const BannerPreview: React.FC<BannerPreviewProps> = ({ data}) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primaryColor">{data.title}</h2>
        <p className="text-gray-600 mt-1">{data.subtitle}</p>
      </div>

      {/* Image */}
      {data.image ? (
        <img
          src={typeof data.image === "string" ? data.image : ""}
          alt={data.title}
          className="w-full h-auto rounded shadow-md"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded">
          <span className="text-gray-500">No Image Provided</span>
        </div>
      )}

      {/* Info section */}
      <div className="text-sm space-y-2">
        <div>
          <strong>Priority:</strong> {data.priority || "Not set"}
        </div>
      </div>

    
    </div>
  );
};

export default BannerPreview;
