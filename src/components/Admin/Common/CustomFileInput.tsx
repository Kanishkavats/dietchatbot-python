"use client";
import React, { useState, ChangeEvent, DragEvent } from "react";
import { IoMdClose } from "react-icons/io";
import { Icon } from "@iconify/react";
import { AdminCustomFileInputProps, AdminFileItem } from "@/src/types/adminCommon";



const CustomFileInput: React.FC<AdminCustomFileInputProps> = ({
  label,
  name,
  onChange,
  error,
  disabled = false,
  mode = "add",
  initialUrls = [],
  uploadType = "single",
}) => {
  const [files, setFiles] = useState<AdminFileItem[]>(
    initialUrls.map((url) => ({ url, status: "success", progress: 100 }))
  );

  const isView = mode === "view";
  const isEditable = mode === "add" || mode === "edit";

  // Simulate upload progress
  const simulateUpload = (index: number) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setFiles((prev) =>
        prev.map((f, i) =>
          i === index
            ? { ...f, progress, status: progress >= 100 ? "success" : "processing" }
            : f
        )
      );
      if (progress >= 100) clearInterval(interval);
    }, 200); // update every 200ms
  };

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const newItems: AdminFileItem[] = selected.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      status: "processing",
      progress: 0,
    }));

    const updated = uploadType === "single" ? newItems : [...files, ...newItems];
    setFiles(updated);

    onChange(
      updated.filter((f) => f.file).map((f) => f.file!),
      updated.filter((f) => !f.file).map((f) => f.url)
    );

    // simulate progress for new items
    newItems.forEach((_, idx) => {
      const actualIndex = uploadType === "single" ? idx : files.length + idx;
      simulateUpload(actualIndex);
    });
  };

  // Drag & Drop
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files || []);
    if (dropped.length > 0) {
      const newItems: AdminFileItem[] = dropped.map((file) => ({
        file,
        url: URL.createObjectURL(file),
        status: "processing",
        progress: 0,
      }));

      const updated = uploadType === "single" ? newItems : [...files, ...newItems];
      setFiles(updated);

      onChange(
        updated.filter((f) => f.file).map((f) => f.file!),
        updated.filter((f) => !f.file).map((f) => f.url)
      );

      newItems.forEach((_, idx) => {
        const actualIndex = uploadType === "single" ? idx : files.length + idx;
        simulateUpload(actualIndex);
      });
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Remove file
  const removeFile = (idx: number) => {
    const updated = files.filter((_, i) => i !== idx);
    setFiles(updated);
    onChange(
      updated.filter((f) => f.file).map((f) => f.file!),
      updated.filter((f) => !f.file).map((f) => f.url)
    );
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block mb-1 font-medium text-gray-700">
          {label}
        </label>
      )}

      {!disabled && isEditable && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer 
            ${error ? "border-red-500" : "border-yellow"} 
            bg-gray-200/60 relative`}
        >
          <input
            id={name}
            name={name}
            type="file"
            multiple={uploadType === "multiple"}
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={disabled}
          />
          <Icon icon="mdi:image-plus-outline" className="text-3xl text-yellow mx-auto" />
          <p className="mt-2 text-sm text-gray-600">
            Drag & Drop your images here or{" "}
            <span className="text-yellow underline">browse files</span>
          </p>
        </div>
      )}

      {/* Uploaded files list */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((f, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border border-gray-200 rounded-md px-3 py-2 bg-white shadow-sm"
            >
              <div className="flex items-center gap-2">
                <img
                  src={f.url}
                  alt={f.file?.name || `file-${idx}`}
                  className="w-10 h-10 object-cover rounded"
                />
                <div className="text-sm">
                  <p className="font-medium text-blue-50">
                    {f.file?.name || f?.url?.split("/").pop()}
                  </p>
                  <p className="text-xs text-gray-400">
                    {f.status === "processing" && `Uploading... ${f.progress}%`}
                    {f.status === "success" && <span className="text-green text-xs">Uploaded successfully</span>}
                    {f.status === "error" && "Failed to upload"}
                  </p>
                </div>
              </div>

              {isEditable && (
                <button
                  onClick={() => removeFile(idx)}
                  className="text-red hover:text-red-50 p-1 cursor-pointer"
                >
                  <IoMdClose size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-xs text-red mt-1">{error}</p>}
    </div>
  );
};

export default CustomFileInput;
