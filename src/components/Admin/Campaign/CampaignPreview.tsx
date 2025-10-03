"use client";

import React, { useEffect, useState } from "react";
import { CampaignFormValues } from "@/src/utils/validations/FormValidation";
import { FaCalendarAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { LucideCircleCheckBig } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../../common/Buttons/Button";

export interface CampaignPreviewProps {
  data: CampaignFormValues & { createdAt?: string; existingImages?: string[], organizer?: string, raisedAmount?: number };
  onSubmit: () => void;
  onBack: () => void;
  mode?: "add" | "edit" | "view";
}

const CampaignPreview = ({ data, onSubmit, onBack, mode }: CampaignPreviewProps) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    if (!data.images && !data.existingImages) return;

    const previews: string[] = [];

    if (data.existingImages?.length) {
      previews.push(...data.existingImages);
    }

    if (data.images?.length) {
      data.images.forEach((img) => {
        if (img && typeof img === "object" && img instanceof Blob) {
          const objectUrl = URL.createObjectURL(img);
          previews.push(objectUrl);
        } else if (typeof img === "string") {
          previews.push(img);
        }
      });
    }

    setImagePreviews(previews);

    return () => {
      previews.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [data.images, data.existingImages]);

  const bannerImage = imagePreviews[0] || null;
  const gridImages = imagePreviews.slice(1);

  return (
    <motion.div
      className="bg-white lg:px-4 py-8 max-w-5xl mx-auto font-sans text-black"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
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
            {data.location}
          </p>
        )}
      </div>

      {/* Title */}
      <h2 className="text-2xl lg:text-4xl font-bold mb-4 font-nunito text-foreground">
        {data.title}
      </h2>

      {/* Description / Summary / Goal */}
      <div className="space-y-4 text-foreground/60 font-[400] text-md lg:text-lg leading-relaxed">
        <p>{data.description}</p>
        <p>{data.summary}</p>

        <p>
          <span className="font-semibold text-foreground">Organizer
            : </span>
          {data.organizer}
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
        <div className="mt-12 flex gap-6 justify-end md:w-fit">
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
    </motion.div>
  );
};

export default CampaignPreview;
