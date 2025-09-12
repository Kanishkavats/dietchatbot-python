"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Icon } from "@iconify/react";
import { IoMdClose } from "react-icons/io";

interface CustomFileInputProps {
  label?: string;
  name: string;
  onChange: (files: File[], updatedImageUrls?: string[]) => void; // new files + updated existing urls
  error?: string;
  disabled?: boolean;
  mode?: "add" | "edit" | "view";
 initialUrls?: string[]; // existing images from API
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({
  label,
  name,
  onChange,
  error,
  disabled = false,
  mode = "add",
  initialUrls = [],
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [existingPreviews, setExistingPreviews] = useState<string[]>(initialUrls);


  // Sync existing images if props change
  // useEffect(() => {
  //   setExistingPreviews(initialUrls);
  // }, [initialUrls]);

  // Handle new file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files || []);
    if (files.length > 0) {
      const updatedFiles = [...selectedFiles, ...files];
      const urls = updatedFiles.map((file) => URL.createObjectURL(file));

      setSelectedFiles(updatedFiles);
      setNewPreviews(urls);
      onChange(updatedFiles, existingPreviews);
    }
  };

  // Remove newly added image
  const removeNewImage = (idx: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(idx, 1);

    const updatedPreviews = [...newPreviews];
    updatedPreviews.splice(idx, 1);

    setSelectedFiles(updatedFiles);
    setNewPreviews(updatedPreviews);
    onChange(updatedFiles, existingPreviews);
  };

  // Remove existing image
  const removeExistingImage = (url: string) => {
    const updatedExisting = existingPreviews.filter((img) => img !== url);
    setExistingPreviews(updatedExisting);
    onChange(selectedFiles, updatedExisting);
  };

  const isView = mode === "view";
  const isEditable = mode === "add" || mode === "edit";

  return (
    <div className="w-full relative">
      {label && (
        <label
          htmlFor={name}
          className={`block mb-1 font-medium ${isView ? "text-gray-600" : "text-gray-700"}`}
        >
          {label}
        </label>
      )}

      {/* File picker visible only in add/edit */}
      {isEditable && (
        <div
          className={`flex flex-col gap-2 bg-gray-200/60 px-3 py-2 rounded-md border relative
          ${error ? "border-red-500" : "border-transparent"}`}
        >
          <input
            id={name}
            name={name}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={disabled}
          />

          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-800 cursor-pointer">
            <Icon icon="mdi:image-multiple-outline" className="text-lg" />
            <span>Select images</span>
          </div>
        </div>
      )}

      {/* Show Previews: Existing + New */}
      {(existingPreviews.length > 0 || newPreviews.length > 0) && (
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {/* Existing images */}
          {existingPreviews.map((src) => (
            <div key={src} className="relative">
              <img
                src={src}
                alt="Existing preview"
                className="w-full h-32 object-cover rounded-md border"
              />
              {isEditable && (
                <button
                  type="button"
                  onClick={() => removeExistingImage(src)}
                  className="absolute top-1 right-1 text-red bg-white rounded-full p-1 cursor-pointer"
                >
                  <IoMdClose />
                </button>
              )}
            </div>
          ))}

          {/* New images */}
          {newPreviews.map((src, idx) => (
            <div key={idx} className="relative">
              <img
                src={src}
                alt={`New preview ${idx + 1}`}
                className="w-full h-32 object-cover rounded-md border"
              />
              {isEditable && (
                <button
                  type="button"
                  onClick={() => removeNewImage(idx)}
                  className="absolute top-1 right-1 text-red-500 bg-white rounded-full p-1"
                >
                  <IoMdClose />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default CustomFileInput;
