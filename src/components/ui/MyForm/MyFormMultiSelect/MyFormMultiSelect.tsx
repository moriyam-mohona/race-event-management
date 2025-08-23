// "use client";

// import { Form, Select } from "antd";
// import { Controller, useFormContext } from "react-hook-form";
// import { cn } from "@/lib/utils";
// import { useState } from "react";

// interface MyFormMultiSelectProps {
//   label?: string;
//   labelClassName?: string;
//   name: string;
//   disabled?: boolean;
//   placeHolder: string;
//   className?: string;
//   defaultValue?: string[];
//   allowClear?: boolean;
//   maxTagCount?: number | "responsive";
// }

// const MyFormMultiSelect = ({
//   label,
//   labelClassName,
//   name,
//   disabled,
//   placeHolder,
//   className,
//   defaultValue = [],
//   allowClear = true,
//   maxTagCount,
// }: MyFormMultiSelectProps) => {
//   const { control } = useFormContext();
//   const [inputValue, setInputValue] = useState("");

//   return (
//     <Controller
//       name={name}
//       control={control}
//       defaultValue={defaultValue}
//       render={({ field, fieldState: { error } }) => (
//         <div className="flex flex-col justify-center">
//           {/* Label */}
//           {label && (
//             <p
//               className={cn(
//                 "text-[#101828] text-base font-normal",
//                 labelClassName
//               )}
//             >
//               {label}
//             </p>
//           )}

//           {/* Ant Design Multi Select */}
//           <Form.Item>
//             <Select
//               mode="tags"
//               style={{ width: "100%" }}
//               className={cn(className, " !h-12")}
//               {...field}
//               placeholder={placeHolder}
//               size="large"
//               disabled={disabled}
//               maxTagCount={maxTagCount}
//               allowClear={allowClear}
//               searchValue={inputValue}
//               onSearch={setInputValue}
//               onInputKeyDown={(e) => {
//                 if (e.key === "Enter" && inputValue.trim()) {
//                   const newValue = [...(field.value || []), inputValue.trim()];
//                   field.onChange(newValue);
//                   setInputValue("");
//                   e.preventDefault();
//                 }
//               }}
//               showSearch={true} // Still allows typing
//               filterOption={false} // Disables filtering of options
//               notFoundContent={null} // Removes the "Not Found" content
//             />

//             {/* Error Message */}
//             {error && <small style={{ color: "red" }}>{error.message}</small>}
//           </Form.Item>
//         </div>
//       )}
//     />
//   );
// };

// export default MyFormMultiSelect;
"use client";

import { Form, Select, Tag, ColorPicker, Popover, Button } from "antd";
import type { Color } from "antd/es/color-picker";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Plus } from "lucide-react";

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
  type?: "text" | "number" | "color" | "mixed";
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
  type = "text",
}: MyFormMultiSelectProps) => {
  const { control } = useFormContext();
  const [pickerOpen, setPickerOpen] = useState(false);

  const isHexColor = (val: string) => /^#([0-9A-F]{3}){1,2}$/i.test(val);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col justify-center">
          {label && (
            <p
              className={cn(
                "text-[#101828] text-base font-normal mb-1",
                labelClassName
              )}
            >
              {label}
            </p>
          )}

          <Form.Item className="mb-0">
            <div className="flex items-center gap-2">
              <Select
                mode="tags"
                style={{ width: "100%" }}
                className={cn(className, " !h-12")}
                {...field}
                placeholder={placeHolder}
                size="large"
                disabled={disabled}
                maxTagCount={maxTagCount}
                allowClear={allowClear}
                open={false} // no dropdown
                tagRender={(props) => {
                  const { label, closable, onClose } = props;
                  const val = String(label);

                  if (
                    (type === "color" || type === "mixed") &&
                    isHexColor(val)
                  ) {
                    return (
                      <Tag
                        closable={closable}
                        onClose={onClose}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          borderRadius: 6,
                          padding: "2px 6px",
                        }}
                      >
                        <span
                          style={{
                            width: 14,
                            height: 14,
                            borderRadius: "50%",
                            backgroundColor: val,
                            display: "inline-block",
                            marginRight: 6,
                            border: "1px solid #ccc",
                          }}
                        />
                        {val.toUpperCase()}
                      </Tag>
                    );
                  }

                  return (
                    <Tag closable={closable} onClose={onClose}>
                      {val}
                    </Tag>
                  );
                }}
              />

              {/* Add Color button only for color mode */}
              {type === "color" && (
                <Popover
                  open={pickerOpen}
                  onOpenChange={setPickerOpen}
                  trigger="click"
                  placement="bottomRight"
                  content={
                    <ColorPicker
                      onChangeComplete={(color: Color) => {
                        const hex = color.toHexString();
                        if (!field.value?.includes(hex)) {
                          field.onChange([...(field.value || []), hex]);
                        }
                      }}
                    />
                  }
                >
                  <Button
                    type="dashed"
                    shape="circle"
                    icon={<Plus size={16} />}
                  />
                </Popover>
              )}
            </div>

            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        </div>
      )}
    />
  );
};

export default MyFormMultiSelect;
