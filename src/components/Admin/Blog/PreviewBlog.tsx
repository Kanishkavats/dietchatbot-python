"use client";

import React, { useEffect, useState } from "react";
import { BlogFormValues } from "@/src/utils/validations/FormValidation";
import { FaCalendarAlt, FaTags } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaCircleArrowRight } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import { LucideCircleCheckBig } from "lucide-react";
import Button from "../../common/Buttons/Button";

interface BlogPreviewProps {
  data: BlogFormValues & { images?: (File | string)[] }; // File or URL
  onSubmit: () => void;
  onBack: () => void;
}

const BlogPreview = ({ data, onSubmit, onBack }: BlogPreviewProps) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    if (!data.images) return;

    const previews = data.images
      .filter((img): img is File | string => img !== undefined)
      .map((img) =>
        typeof img === "string" ? img : URL.createObjectURL(img)
      );


    setImagePreviews(previews);

    return () => {
      previews.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [data.images]);

  const bannerImage = imagePreviews[0] || null;
  const gridImages = imagePreviews.slice(1);

  return (
    <motion.div
      className="bg-white  p-8 max-w-5xl mx-auto font-sans text-black"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Banner Image */}
      {bannerImage && (
        <div className="w-full h-64 sm:h-80 mb-8 rounded-xl overflow-hidden ">
          <img
            src={bannerImage}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {/* Author & Location */}
      <div className="flex flex-col sm:flex-row justify-baseline gap-10 mb-6 text-gray-600 font-medium">
        <p className="flex items-center text-[16px] justify-baseline gap-3">
          <FaCalendarAlt />
          {data.creator}
        </p>
        <p className="flex items-center text-[16px] justify-baseline gap-3">
          <MdLocationPin />
          {data.location}
        </p>
      </div>

      {/* Title */}
      <h2 className="text-4xl font-bold mb-4 font-nunito text-black">
        {data.title}
      </h2>



      {/* Content Section */}
      <div className="space-y-4 text-foreground/60 font-[500] text-lg leading-relaxed">
        <p>
          {data.description}
        </p>
        <p>
          {data.summary}
        </p>

        <div className="bg-gray-100 p-4 rounded-md mt-12 italic text-gray-800 border-l-4 border-green-600">
          {data.quote}
          <span className="block text-right font-bold text-green-700 mt-2">
            — {data.quoteAuthor}
          </span>
        </div>

        {/* Tags List */}
        <div className="mt-12">
          <p className="font-bold text-green-600 mb-1 flex items-center gap-2">
            Tags:
          </p>
          <div className="ml-6 space-y-1 grid grid-cols-2">
            {(data.tags ?? []).length > 0 ? (
              (data.tags ?? []).map((tag, idx) => (

                <p key={idx} className="flex items-center gap-2 text-gray-700">
                  <LucideCircleCheckBig className="text-yellow size-5" />
                  {tag}
                </p>
              ))
            ) : (
              <p className="text-gray-500">None</p>
            )}
          </div>
        </div>

        {/* Key Points List */}
        <div className="mt-4">
          <p className="font-bold text-green-600 mb-1 flex items-center gap-2">
            Key Points:
          </p>
          <div className="ml-6 space-y-1 grid grid-cols-2">
            {(data.keyPoints ?? []).length > 0 ? (
              (data.keyPoints ?? []).map((point, idx) => (
                <p key={idx} className="flex items-center gap-2 text-gray-700">
                  <LucideCircleCheckBig className="text-yellow size-5" />

                  {point}
                </p>
              ))
            ) : (
              <p className="text-gray-500">None</p>
            )}
          </div>
        </div>

      </div>

      {/* Image Grid Section */}
      {gridImages.length > 0 && (
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {gridImages.map((img, idx) => (
            <div
              key={idx}
              className="w-full h-40 rounded-lg overflow-hidden "
            >
              <img
                src={img}
                alt={`Blog image ${idx + 2}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="mt-12 flex gap-6 justify-end">
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
        >
          Submit <FaCircleArrowRight className="text-lg ml-2" />
        </Button>

      </div>
    </motion.div>
  );
};

export default BlogPreview;
