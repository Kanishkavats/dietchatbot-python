"use client";

import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { motion } from "framer-motion";
import LanguageToggle from "../../UI/admin/LanguageToggle";
import Button from "../../UI/web/Buttons/Button";
import { useLanguageToggle } from "@/src/hooks/admin/useLanguageToggle";
import { CampaignPreviewProps } from "@/src/types/admin";
import ButtonLoader from "../../UI/web/Loader/ButtonLoader";

const CampaignPreview = ({ data, onSubmit, onBack, mode,showButton=true ,createMutation,updateMutation}: CampaignPreviewProps) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { language, toggleLanguage } = useLanguageToggle();
  useEffect(() => {
    if (!data) return;
    const seen = new Set<string>();
    const list: string[] = [];
    const addUrl = (url?: string|null) => {
      if (!url || typeof url !== 'string') return;
      if (seen.has(url)) return;
      list.push(url);
      seen.add(url);
    };

    // First: server URLs
    data.existingImages?.forEach((u) => addUrl(u));
    // Then: files or strings in images
    data.images?.forEach((img) => {
      if (img && typeof img === 'object' && img instanceof Blob) {
        const objectUrl = (img as any)._objectUrl || ((img as any)._objectUrl = URL.createObjectURL(img));
        addUrl(objectUrl);
      } else if (typeof img === 'string') {
        addUrl(img);
      }
    });

    setImagePreviews(list);
    return () => {};
  }, [data]);
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const bannerImage = imagePreviews[0] || null;
  const gridImages = imagePreviews.slice(1);
  const lang=language
  return (
    <motion.div
      className="bg-white lg:px-4 py-8 max-w-5xl mx-auto font-sans text-black"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <LanguageToggle language={language} onChange={toggleLanguage} />
      {/* Banner Image */}
      {bannerImage && (
        <div className="w-full h-64 sm:h-80 mb-8 rounded-xl overflow-hidden">
          <img
            src={bannerImage}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Date & Location */}
      <div className="flex flex-row justify-baseline gap-x-10 mb-6 text-foreground font-medium">
        {data.createdAt && (
          <p className="flex items-center text-[16px] gap-2">
            <FaCalendarAlt className="text-yellow" />
            {data.createdAt.split("T")[0]}
          </p>
        )}
        {data.location && (
          <p className="flex items-center text-[16px] gap-2">
            <MdLocationPin className="text-yellow" />
            {data.location?.[lang]}
          </p>
        )}
      </div>

      {/* Title */}
      <h2 className="text-2xl lg:text-4xl font-bold mb-4 font-nunito text-foreground">
        {data.title?.[lang]}
      </h2>

      {/* Description / Summary / Goal */}
      <div className="space-y-4 text-foreground/60 font-[400] text-md lg:text-lg leading-relaxed">
        <p>{data.description?.[lang]}</p>
        <p>{data.summary?.[lang]}</p>

        <p>
          <span className="font-semibold text-foreground">Organizer
            : </span>
          {data.organizer || "Admin"}
        </p>
        <p>
          <span className="font-semibold text-foreground">Goal Amount: </span>
          ₹ {data.goalAmount.toLocaleString()}
        </p>
        <p>
          <span className="font-semibold text-foreground">Raised Amount: </span>
          ₹ {data.raisedAmount && data.raisedAmount.toLocaleString()}
        </p>

      </div>

      {/* Image Grid */}
      {gridImages.length > 0 && (
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {gridImages.map((img, idx) => (
            <div
              key={idx}
              className="w-full h-40 rounded-lg overflow-hidden"
            >
              <img
                src={img}
                alt={`Campaign image ${idx + 2}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      {showButton&&(
        <div className="mt-12 flex  gap-6 justify-end md:w-fit">
          <Button
            bgColor="bg-red"
            rounded="rounded-lg"
            hoverBg="before:bg-red-50"
            onClick={onBack}
            icon=""
          >
            {lang === "hi" ? "संपादन" : "Edit"}
          </Button>
        
          <Button
            rounded="rounded-lg"
            onClick={onSubmit}
            
            bgColor="bg-lime-green"
            hoverBg="before:bg-green"
            icon=""
          >
            {createMutation?.isPending || updateMutation?.isPending ? (
                      <ButtonLoader />
                    ) : <>{lang === "hi" ? "सबमिट" : "Submit"}</>}
                  </Button>
        </div>
        )}
    </motion.div>
  );
};

export default CampaignPreview;
