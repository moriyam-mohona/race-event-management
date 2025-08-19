/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
// import Image from "next/image";
import { MdDelete } from "react-icons/md";
import Image from "next/image";

type TMultipleImageUploadProps = {
  name: string;
  label?: string;
  children?: ReactNode;
  size?: string;
  parentClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  previewContainerClassName?: string;
  previewImageClassName?: string;
  initialImages?: string[];
  maxFiles?: number;
  [key: string]: any;
  setRemovedImages?: (removedImages: string[]) => void;
  removeImages?: string[];
};

const MyFormMultipleImageUpload = ({
  name,
  label,
  size = "medium",
  parentClassName = "",
  labelClassName = "",
  inputClassName = "",
  previewContainerClassName = "",
  previewImageClassName = "",
  initialImages = [],
  maxFiles = 5,
  children,
  setRemovedImages,
  removeImages,
  ...rest
}: TMultipleImageUploadProps) => {
  const { control, setValue, watch } = useFormContext();
  const [previews, setPreviews] = useState<string[]>(initialImages);
  const [fileInputKey, setFileInputKey] = useState(0);

  // Get current form value
  const formValue = watch(name) || [];

  const handleFilesChange = (newFiles: FileList) => {
    const filesArray = Array.from(newFiles);

    // Check max files limit
    if (filesArray.length + previews.length > maxFiles) {
      alert(`You can upload a maximum of ${maxFiles} files`);
      return;
    }

    // Process previews
    const newPreviews: string[] = [];
    const validFiles: File[] = [];

    filesArray.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          validFiles.push(file);

          // When all files are processed
          if (validFiles.length === filesArray.length) {
            const updatedPreviews = [...previews, ...newPreviews];
            const updatedFiles = [...formValue, ...validFiles];

            setPreviews(updatedPreviews);
            setValue(name, updatedFiles, { shouldValidate: true });
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleRemoveImage = (index: number, preview: string) => {
    const updatedPreviews = [...previews];
    updatedPreviews.splice(index, 1);

    const updatedFiles = [...formValue];
    updatedFiles.splice(index, 1);

    setPreviews(updatedPreviews);
    setValue(name, updatedFiles, { shouldValidate: true });

    // console.log("remove image link", preview);
    if (setRemovedImages && removeImages) {
      if (initialImages.includes(preview)) {
        setRemovedImages([...removeImages, preview]);
      }
    }

    if (updatedFiles.length === 0) {
      setFileInputKey((prev) => prev + 1);
    }
  };

  // Initialize with initialImages
  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      setPreviews(initialImages);
    }
  }, [initialImages]);

  return (
    <div className={cn(`form-group h-full ${size}`, parentClassName)}>
      {label && <p className={cn("mb-2", labelClassName)}>{label}</p>}
      <Controller
        control={control}
        name={name}
        render={({ fieldState: { error } }) => (
          <>
            {previews.length > 0 && (
              <div
                className={cn(
                  "flex flex-wrap gap-4",
                  previewContainerClassName
                )}
              >
                {previews.map((preview, index) => (
                  <div
                    key={index}
                    className={cn("relative w-fit", previewImageClassName)}
                  >
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      width={200}
                      height={200}
                      className={cn(
                        "rounded-md object-cover",
                        previewImageClassName
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index, preview)}
                      className="px-1 py-1 bg-white bg-opacity-80 !text-secondary rounded-md absolute top-2 right-2 cursor-pointer"
                    >
                      <MdDelete size={20} className="hover:text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {previews.length < maxFiles && (
              <>
                {children ? (
                  <label htmlFor={name} className="h-full w-full">
                    {children}
                  </label>
                ) : null}

                <input
                  key={fileInputKey}
                  id={name}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    e.target.files && handleFilesChange(e.target.files)
                  }
                  className={cn(
                    "w-full rounded-md border border-gray p-2",
                    inputClassName,
                    children && "hidden"
                  )}
                  {...rest}
                />
              </>
            )}

            {error && <small style={{ color: "red" }}>{error.message}</small>}
            {previews.length > 0 && (
              <p className="block pt-2 text-gray font-medium">
                {previews.length}/{maxFiles} files uploaded
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default MyFormMultipleImageUpload;
