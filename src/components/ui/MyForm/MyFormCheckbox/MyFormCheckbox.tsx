// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';
// import { cn } from "@/lib/utils";
// import { Checkbox, Form } from "antd";
// import { useEffect } from "react";
// import { Controller, useFormContext, useWatch } from "react-hook-form";

// const MyFormCheckbox = ({
//   name,
//   label,
//   labelClassName,
//   checkboxClassName,
//   value,
//   onValueChange,
// }: {
//   name: string;
//   label?: any;
//   labelClassName?: string;
//   checkboxClassName?: string;
//   value?: boolean;
//   onValueChange?: (newValue: boolean) => void;
// }) => {
//   const { setValue, control } = useFormContext();

//   // Watch the checkbox value
//   const checkboxValue = useWatch({
//     control,
//     name,
//   });

//   useEffect(() => {
//     setValue(name, value, { shouldValidate: false });
//   }, [value, name, setValue]);

//   useEffect(() => {
//     if (onValueChange) {
//       onValueChange(checkboxValue); // Trigger the callback whenever the value changes
//     }
//   }, [checkboxValue, onValueChange]);

//   return (
//     <div>
//       <Controller
//         name={name}
//         control={control}
//         rules={{
//           required: false, // Adjust validation as needed
//         }}
//         render={({ field, fieldState: { error } }) => (
//           <div className="flex flex-col justify-center w-full">
//             <Form.Item style={{ marginBottom: "0px" }}>
//               <Checkbox
//                 {...field}
//                 id={name}
//                 checked={field.value}
//                 className={cn("text-[#101828]  ", checkboxClassName)}
//               >
//                 <span className={cn("text-base font-normal leading-6", labelClassName)}>
//                   {label}
//                 </span>
//               </Checkbox>
//             </Form.Item>
//             {error && <small style={{ color: "red" }}>{error.message}</small>}
//           </div>
//         )}
//       />
//     </div>
//   );
// };

// export default MyFormCheckbox;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { Checkbox } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type MyFormCheckboxProps = {
  name: string;
  label?: React.ReactNode;
  labelClassName?: string;
  checkboxClassName?: string;
  itemValue?: string;
  onValueChange?: (checked: boolean, allValues: any, setValue: any) => void;
};

const MyFormCheckbox = ({
  name,
  label,
  labelClassName,
  checkboxClassName,
  itemValue,
  onValueChange,
}: MyFormCheckboxProps) => {
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field }) => {
        const allValues = getValues(name);
        const isArrayField = Array.isArray(allValues);
        const isChecked = isArrayField
          ? allValues.includes(itemValue)
          : !!field.value;

        const handleChange = (checked: boolean) => {
          if (onValueChange) {
            onValueChange(checked, getValues(), setValue);
          } else {
            field.onChange(checked); // ✅ This will be true or false
          }
        };
        return (
          <div>
            <Checkbox
              checked={isChecked}
              onChange={(e) => handleChange(e.target.checked)}
              className={cn("text-[#101828]", checkboxClassName)}
            >
              <span
                className={cn(
                  "text-base font-normal leading-6",
                  labelClassName
                )}
              >
                {label}
              </span>
            </Checkbox>
            {errors[name] && (
              <p className="mt-1 text-sm text-red-600">
                {errors[name]?.message as string}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default MyFormCheckbox;
