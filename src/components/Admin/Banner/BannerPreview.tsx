'use client'

import React, { useEffect, useState } from "react";
import { BannerFormValues } from "@/src/utils/validations/FormValidation";
import Button from "../../common/Buttons/Button";
import { useLanguageToggle } from "../hooks/useLanguageToggle";
import LanguageToggle from "../Common/LanguageToggle";
import Image from "next/image";

interface BannerPreviewProps {
  data: BannerFormValues;
  onBack: () => void;
  onSubmit: () => void;
  mode?: "add" | "edit" | "view"|"preview-edit";
  showButtons?:boolean
}

const BannerPreview: React.FC<BannerPreviewProps> = ({ data, onSubmit, onBack, mode,showButtons=true }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    console.log(data)

  const{language,toggleLanguage}=useLanguageToggle();
 useEffect(() => {
    if (!data.image) return;

    if (data.image instanceof File || data.image instanceof Blob) {
      const objectUrl = URL.createObjectURL(data.image);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof data.image === "string") {
      setImagePreview(data.image);
    }
  }, [data.image]);
  const lang=language;
  return (
    <div className="space-y-4">
      <LanguageToggle language={language} onChange={toggleLanguage}/>
      {/* Header */}


      {/* Image */}
      {imagePreview ? (
        <div className="relative w-full h-64 sm:h-80 rounded shadow-md overflow-hidden">
          <Image
            src={imagePreview}
            alt={data.title?.[lang] || "Banner Preview"}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded">
          <span className="text-gray-500">No Image Provided</span>
        </div>
      )}

      {/* Info section */}
      <div className="text-md space-y-2 ">
        <h2 className="text-2xl font-bold text-dark-green">{data.title?.[lang]}</h2>
        <p>  <strong className="text-xl  text-dark-green">Priority:</strong> {data.priority || "Not set"}</p>
      
        <p className="text- mt-1"> <strong className="text-xl  text-dark-green">SubTitle:</strong>{data.subtitle?.[lang]}</p>

      </div>
      {showButtons&&(
        <div className="mt-12 flex flex-wrap gap-6 justify-end md:w-fit">
          <Button
            bgColor="bg-red"
            rounded="rounded-lg"
            hoverBg="before:bg-red-50"
            onClick={onBack}
          >
            Back to Edit
          </Button>

          <Button
            rounded="rounded-lg"
            onClick={onSubmit}
            text="Submit"
            bgColor="bg-lime-green"
            hoverBg="before:bg-green"
          />
        </div>  
        )}
    </div>
  );
};

export default BannerPreview;
