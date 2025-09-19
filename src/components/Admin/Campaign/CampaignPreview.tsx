"use client";

import React, { useEffect, useState } from "react";
import { CampaignFormValues } from "@/src/utils/validations/FormValidation";
import { FaCalendarAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { LucideCircleCheckBig } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../../common/Buttons/Button";

interface CampaignPreviewProps {
  data: CampaignFormValues & { createdAt?: string; existingImages?: string[] };
  onSubmit: () => void;
  onBack: () => void;
}

const CampaignPreview = ({ data, onSubmit, onBack }: CampaignPreviewProps) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    if (!data.images && !data.existingImages) return;

    const previews: string[] = [];

    // Add existingImages directly (already strings)
    if (data.existingImages && data.existingImages.length > 0) {
      previews.push(...data.existingImages);
    }

    // Convert File objects to object URLs
    if (data.images && data.images.length > 0) {
      data.images.forEach((img) => {
        if (img && typeof img !== "string") {
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
      className="bg-white p-8 max-w-5xl mx-auto font-sans text-black"
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

      {/* Metadata */}
      <div className="flex flex-col sm:flex-row justify-baseline gap-10 mb-6 text-foreground font-medium">
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
      <h2 className="text-4xl font-bold mb-4 font-nunito text-foreground">
        {data.title}
      </h2>

      {/* Description / Summary / Goal */}
      <div className="space-y-4 text-foreground/60 font-[400] text-lg leading-relaxed">
        <p>{data.description}</p>
        <p>{data.summary}</p>

        <p>
          <span className="font-semibold text-foreground">Goal Amount: </span>
          ₹ {data.goalAmount.toLocaleString()}
        </p>

        {data.quote && (
          <div className="bg-gray-100 p-4 rounded-md mt-12 italic text-foreground border-l-4 border-lime-green">
            {data.quote}
            {data.quoteAuthor && (
              <span className="block text-right font-bold text-lime-green mt-2">
                — {data.quoteAuthor}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Tags */}
      {data.tags && data.tags.length > 0 && (
        <div className="mt-12">
          <p className="font-bold text-lime-green mb-1 flex items-center gap-2">
            Tags:
          </p>
          <div className="ml-6 space-y-1 grid grid-cols-2">
            {data.tags.map((tag, idx) => (
              <p key={idx} className="flex items-center gap-2 text-gray-700">
                <LucideCircleCheckBig className="text-yellow size-5" />
                {tag}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Key Points */}
      {data.keyPoints && data.keyPoints.length > 0 && (
        <div className="mt-4">
          <p className="font-bold text-lime-green mb-1 flex items-center gap-2">
            Key Points:
          </p>
          <div className="ml-6 space-y-1 grid grid-cols-2 gap-2">
            {data.keyPoints.map((point, idx) => (
              <p key={idx} className="flex items-start gap-2 text-gray-700">
                <LucideCircleCheckBig className="text-yellow size-5" />
                <span>{point}</span>
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Extra Images */}
      {gridImages.length > 0 && (
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
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
      <div className="mt-12 flex gap-6 justify-end w-fit">
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
