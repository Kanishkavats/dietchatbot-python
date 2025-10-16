"use client";

import React, { useEffect, useState } from "react";
import { BlogFormValues } from "@/src/utils/validations/FormValidation";
import { FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { MdLocationPin } from "react-icons/md";
import { LucideCircleCheckBig } from "lucide-react";
import Button from "../../common/Buttons/Button";

interface BlogPreviewProps {
  data: BlogFormValues & { createdAt?: string };
  onSubmit: () => void;
  onBack: () => void;
  mode: string;
  showButton?:boolean
}

const BlogPreview = ({ data, onSubmit, onBack, mode,showButton=true }: BlogPreviewProps) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [language, setLanguage] = useState<"en" | "hi">("en");

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

  const lang = language;

  return (
    <motion.div
      className="bg-white lg:px-4 py-8 max-w-5xl mx-auto font-sans text-black"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Language Toggle */}
      <div className="flex justify-start text-[13px] mb-6">
        <button
          type="button"
          className={`cursor-pointer px-2 py-1 ${
            lang === "en"
              ? "bg-lime-green text-white"
              : "bg-gray-200 text-gray-800"
          } rounded-l`}
          onClick={() => setLanguage("en")}
        >
          English
        </button>
        <button
          type="button"
          className={`cursor-pointer px-2 py-1 ${
            lang === "hi"
              ? "bg-lime-green text-white"
              : "bg-gray-200 text-gray-800"
          } rounded-r`}
          onClick={() => setLanguage("hi")}
        >
          हिंदी
        </button>
      </div>

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

      {/* Author & Location */}
      <div className="flex flex-col sm:flex-row justify-baseline gap-10 mb-6 text-foreground font-medium">
        {data.createdAt && (
          <p className="flex items-center text-[16px] gap-2">
            <FaCalendarAlt className="text-yellow" />
            {data.createdAt.split("T")[0]}
          </p>
        )}
        <p className="flex items-center text-[16px] gap-2">
          <MdLocationPin className="text-yellow" />
          {data.location?.[lang]}
        </p>
      </div>

      {/* Title */}
      <h2 className="text-2xl lg:text-4xl font-bold mb-4 font-nunito text-foreground">
        {data.title?.[lang]}
      </h2>

      {/* Content Section */}
      <div className="space-y-4 text-foreground/60 font-[400] text-md lg:text-lg leading-relaxed">
        <p>{data.description?.[lang]}</p>
        <p>{data.summary?.[lang]}</p>

        {/* Quote */}
        <div className="bg-gray-100 p-4 rounded-md mt-12 italic text-foreground border-l-4 border-lime-green">
          {data.quote?.[lang]}
          <span className="block text-right font-bold text-lime-green mt-2">
            — {data.quoteAuthor?.[lang]}
          </span>
        </div>

        {/* Tags */}
        <div className="mt-8">
          <p className="font-bold text-lime-green mb-1 flex items-center gap-2">
            Tags:
          </p>
          <div className="ml-2 space-y-1 grid lg:grid-cols-2">
            {(data.tags?.[lang] ?? []).map((tag, idx) => (
              <p key={idx} className="flex items-center gap-2 text-foreground">
                <LucideCircleCheckBig className="text-yellow h-5 w-5" />
                <span className="text-[16px]">{tag}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Key Points */}
        <div className="mt-4">
          <p className="font-bold text-lime-green mb-1 flex items-center gap-2">
            Key Points:
          </p>
          <div className="ml-2 space-y-1 grid lg:grid-cols-2 gap-2">
            {(data.keyPoints?.[lang] ?? []).map((point, idx) => (
              <p key={idx} className="flex items-start gap-2 text-foreground">
                <LucideCircleCheckBig className="text-yellow h-5 w-5" />
                <span className="text-[16px]">{point}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Image Grid Section */}
      {gridImages.length > 0 && (
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {gridImages.map((img, idx) => (
            <div
              key={idx}
              className="w-full h-40 rounded-lg overflow-hidden"
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

      {/* Action Buttons */}
      {/* {data?._id === null && (
      )} */}
      {showButton&&(
        <div className="mt-12 flex flex-wrap gap-6 justify-end md:w-fit">
          <Button
            bgColor="bg-red"
            rounded="rounded-lg"
            hoverBg="before:bg-red-50"
            onClick={onBack}
            text="Edit"
          />

          <Button
            rounded="rounded-lg"
            onClick={onSubmit}
            text="Submit"
            bgColor="bg-lime-green"
            hoverBg="before:bg-green"
          />
        </div>
        )}
    </motion.div>
  );
};

export default BlogPreview;
