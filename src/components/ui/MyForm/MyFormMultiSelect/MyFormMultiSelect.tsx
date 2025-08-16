"use client";

import { Form, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface MyFormMultiSelectProps {
  label?: string;
  labelClassName?: string;
  name: string;
  disabled?: boolean;
  placeHolder: string;
  className?: string;
  defaultValue?: string[];
  allowClear?: boolean;
  maxTagCount?: number | "responsive";
}

const MyFormMultiSelect = ({
  label,
  labelClassName,
  name,
  disabled,
  placeHolder,
  className,
  defaultValue = [],
  allowClear = true,
  maxTagCount,
}: MyFormMultiSelectProps) => {
  const { control } = useFormContext();
  const [inputValue, setInputValue] = useState("");

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col justify-center">
          {/* Label */}
          {label && (
            <p
              className={cn(
                "text-[#101828] text-base font-normal",
                labelClassName
              )}
            >
              {label}
            </p>
          )}

          {/* Ant Design Multi Select */}
          <Form.Item style={{ marginBottom: "0px" }}>
            <Select
              mode="tags"
              style={{ width: "100%", minHeight: "48px" }}
              className={cn(className, "placeholder:!text-text-secondary")}
              {...field}
              placeholder={placeHolder}
              size="large"
              disabled={disabled}
              maxTagCount={maxTagCount}
              allowClear={allowClear}
              searchValue={inputValue}
              onSearch={setInputValue}
              onInputKeyDown={(e) => {
                if (e.key === "Enter" && inputValue.trim()) {
                  const newValue = [...(field.value || []), inputValue.trim()];
                  field.onChange(newValue);
                  setInputValue("");
                  e.preventDefault();
                }
              }}
              dropdownStyle={{ display: "none" }} // This completely hides the dropdown
              showSearch={true} // Still allows typing
              filterOption={false} // Disables filtering of options
              notFoundContent={null} // Removes the "Not Found" content
            />

            {/* Error Message */}
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        </div>
      )}
    />
  );
};

export default MyFormMultiSelect;
