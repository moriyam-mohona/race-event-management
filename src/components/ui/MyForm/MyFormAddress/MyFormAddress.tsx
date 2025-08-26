/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ui/MyForm/MyFormAddress/MyFormAddress.tsx
"use client";

import { cn } from "@/lib/utils";
import { AutoComplete, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

interface MyFormAddressProps {
  name: string;
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  placeHolder?: string;
  value?: any;
  onValueChange?: (newValue: any) => void;
  readOnly?: boolean;
}

export default function MyFormAddress({
  name,
  label,
  labelClassName,
  inputClassName,
  placeHolder = "Search for a place...",
  value,
  onValueChange,
  readOnly = false,
}: MyFormAddressProps) {
  const { setValue, control } = useFormContext();
  const [options, setOptions] = useState<
    { value: string; label: string; place: any }[]
  >([]);

  // Watch the input field's value
  const inputValue = useWatch({ control, name });

  useEffect(() => {
    if (value) {
      setValue(name, value, { shouldValidate: false });
    }
  }, [value, name, setValue]);

  useEffect(() => {
    if (onValueChange) {
      onValueChange(inputValue);
    }
  }, [inputValue, onValueChange]);

  const fetchSuggestions = async (val: string) => {
    if (!val) {
      setOptions([]);
      return;
    }

    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        val
      )}.json?access_token=${
        process.env.NEXT_PUBLIC_MAPBOX_TOKEN
      }&autocomplete=true&limit=5`
    );
    const data = await res.json();

    const formatted = (data.features || []).map((place: any) => ({
      value: place.place_name,
      label: place.place_name,
      place,
    }));

    setOptions(formatted);
  };

  const handleSelect = (_: string, option: any) => {
    const place = option.place;

    // Consoling the selected place
    // console.log("Selected place:", place);
    // console.log("Full geometry:", place.geometry);
    // console.log("Coordinates:", place.center);

    // Save into form
    setValue(name, place.place_name);
    setValue("latitude", place.center[1]);
    setValue("longitude", place.center[0]);
  };

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col justify-center w-full">
            {label && (
              <p
                className={cn(
                  "ps-1 mb-2 text-[#101828] 2xl:text-base font-normal",
                  labelClassName
                )}
              >
                {label}
              </p>
            )}
            <Form.Item
              style={{ marginBottom: 0 }}
              validateStatus={error ? "error" : ""}
              help={error?.message}
            >
              <AutoComplete
                {...field}
                options={options}
                onSearch={fetchSuggestions}
                onSelect={handleSelect}
                value={value ?? field.value}
                style={{ width: "100%" }}
              >
                <Input
                  size="large"
                  readOnly={readOnly}
                  className={cn(
                    "w-full placeholder:!text-text-secondary h-12",
                    readOnly && "cursor-not-allowed",
                    inputClassName
                  )}
                  placeholder={placeHolder}
                />
              </AutoComplete>
            </Form.Item>

            {error && (
              <small className="mt-1" style={{ color: "red" }}>
                {error.message}
              </small>
            )}
          </div>
        )}
      />
    </div>
  );
}
