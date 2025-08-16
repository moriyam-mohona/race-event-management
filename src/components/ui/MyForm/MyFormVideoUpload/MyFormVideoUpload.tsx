/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { RxCross2 } from "react-icons/rx";

type TVideoUploadProps = {
  name: string;
  label?: string;
  children?: ReactNode;
  size?: string;
  parentClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  previewVideoClassName?: string;
  defaultValue?: string;
  acceptedFormats?: string;
  [key: string]: any; // Allow other props
};

const MyFormVideoUpload = ({
  name,
  label,
  size = "medium",
  parentClassName = "",
  labelClassName = "",
  inputClassName = "",
  previewVideoClassName = "",
  defaultValue,
  acceptedFormats = "video/*",
  children,
  ...rest
}: TVideoUploadProps) => {
  const { control, setValue, resetField } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Set initial preview when defaultValue changes
  useEffect(() => {
    if (defaultValue) {
      setPreview(defaultValue);
      // Set the form value to the URL if it's a string (existing video)
      // if (typeof defaultValue === "string") {
      //   setValue(name, defaultValue, { shouldValidate: false });
      // }
    }
  }, [defaultValue, name, setValue]);

  const handleFileChange = (file: File) => {
    setErrorMessage(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    setValue(name, file);
  };

  const handleRemoveVideo = () => {
    setPreview(null);
    resetField(name);
    setFileInputKey((prev) => prev + 1);
    setErrorMessage(null);
  };

  return (
    <div className={cn(`form-group h-full ${size}`, parentClassName)}>
      {label && <p className={cn("mb-2", labelClassName)}>{label}</p>}
      <Controller
        control={control}
        name={name}
        render={({ fieldState: { error } }) => (
          <>
            {preview ? (
              <div className={cn("relative w-full", previewVideoClassName)}>
                <video
                  controls
                  className={cn(
                    "w-full max-h-64 rounded-md bg-black",
                    previewVideoClassName
                  )}
                >
                  <source src={preview} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <button
                  type="button"
                  onClick={handleRemoveVideo}
                  className="px-2 py-1 bg-white bg-opacity-80 text-white rounded-md absolute top-2 right-2"
                >
                  <RxCross2 size={20} className="hover:text-red-500" />
                </button>
              </div>
            ) : (
              <>
                {children && (
                  <label htmlFor={name} className="h-full w-full">
                    {children}
                  </label>
                )}
                <input
                  key={fileInputKey}
                  id={name}
                  type="file"
                  accept={acceptedFormats}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileChange(file);
                    }
                  }}
                  className={cn(
                    "rounded-md border border-gray-300 p-2",
                    inputClassName,
                    children && "hidden"
                  )}
                  {...rest}
                />
              </>
            )}
            {errorMessage && (
              <small style={{ color: "red" }}>{errorMessage}</small>
            )}
            {error && !errorMessage && (
              <small style={{ color: "red" }}>{error.message}</small>
            )}
          </>
        )}
      />
    </div>
  );
};

export default MyFormVideoUpload;
