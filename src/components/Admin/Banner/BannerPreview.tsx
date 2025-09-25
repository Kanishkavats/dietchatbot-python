'use client'

import React from "react";
import { BannerFormValues } from "@/src/utils/validations/FormValidation";
import Button from "../../common/Buttons/Button";

interface BannerPreviewProps {
  data: BannerFormValues;
}

const BannerPreview: React.FC<BannerPreviewProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      {/* Header */}


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
      <div className="text-md space-y-2 ">
        <h2 className="text-2xl font-bold text-dark-green">{data.title}</h2>
        <p>  <strong className="text-xl  text-dark-green">Priority:</strong> {data.priority || "Not set"}</p>
      
        <p className="text- mt-1"> <strong className="text-xl  text-dark-green">SubTitle:</strong>{data.subtitle}</p>

      </div>

    </div>
  );
};

export default BannerPreview;
