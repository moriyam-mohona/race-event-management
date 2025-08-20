/* eslint-disable @typescript-eslint/no-explicit-any */
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import React from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MyFormMultiSelect from "@/components/ui/MyForm/MyFormMultiSelect/MyFormMultiSelect";
import MyFormMultipleImageUpload from "@/components/ui/MyForm/MyFormMultipleImageUpload/MyFormMultipleImageUpload";
import { useCreateGearMutation } from "@/redux/features/event/eventApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";

const validationSchema = z.object({
  gearTitle: z.string().min(3, "Gear Title is required"),
  categoryName: z.string().min(3, "Category Name is required"),
  price: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ invalid_type_error: "Price must be a number" }).nonnegative()
  ),
  sizes: z.array(z.string().nonempty()).min(1),
  colors: z.array(z.string().nonempty()).min(1),
  images: z.array(z.instanceof(File)).min(1),
});

const GearCreate = () => {
  const [createGear] = useCreateGearMutation();
  const handleSubmit = async (formData: any, reset: any) => {
    const id = "68a5656a25bc1c53bbed6efe";

    const dataToSubmit = new FormData();
    const body = {
      gearTitle: formData.gearTitle,
      categoryName: formData.categoryName,
      price: formData.price,
      sizes: formData.sizes,
      colors: formData.colors,
    };

    dataToSubmit.append("data", JSON.stringify(body));
    formData.images.forEach((image: any) =>
      dataToSubmit.append("gear-file", image)
    );
    const response = await handleAsyncWithToast(() =>
      createGear({ data: dataToSubmit, id })
    );
    if (response?.data?.success) {
      reset();
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl xl:text-4xl font-medium mb-6">
          Create Needed Gear
        </h2>
      </div>
      <h3 className="text-xl font-medium mt-10 mb-4">Listed gear</h3>
      <div>
        <h3 className="text-xl font-medium mt-10 mb-4">Create Gear</h3>
        <MyFormWrapper
          onSubmit={handleSubmit}
          resolver={zodResolver(validationSchema)}
          className="space-y-6"
        >
          {/* Write Gear Title */}
          <div>
            <h2 className="font-medium text-xl mb-3">Write Gear Title</h2>
            <div className="w-full border border-gray-200 rounded-lg p-5 space-y-5">
              <MyFormInput name="gearTitle" label="Gear Title" />
              <MyFormInput name="categoryName" label="Category Name" />
            </div>{" "}
          </div>
          <div>
            <h2 className="font-medium text-xl mb-3">Price</h2>
            <MyFormInput name="price" type="number" />
          </div>

          <div className="flex w-full gap-5 items-center justify-between">
            <div className="w-full">
              <h2 className="font-medium text-xl mb-3">Size</h2>
              <MyFormMultiSelect
                name="sizes"
                placeHolder="Type and press Enter to add gear sizes"
              />
            </div>

            <div className="w-full">
              <h2 className="font-medium text-xl mb-3">Color</h2>
              <MyFormMultiSelect
                name="colors"
                placeHolder="Type and press Enter to add gear colors"
              />
            </div>
          </div>

          <div className="mt-10">
            <MyFormMultipleImageUpload
              name="images"
              maxFiles={10}
              rules={{ required: "At least one image is required" }}
              previewContainerClassName="flex flex-wrap gap-3"
              previewImageClassName="w-32 h-32  object-cover rounded-lg"
            >
              <div className="rounded-2xl border border-dashed bg-green-50 flex flex-col items-center justify-center gap-3 py-10">
                <AiOutlineUpload className="text-gray-500 text-3xl" />
                <h2 className="font-medium text-lg">
                  Drag and Drop files to Upload or
                </h2>
                <div className="bg-primary text-white py-2 px-8 rounded-full cursor-pointer">
                  Browse
                </div>
                <p className="text-sm text-gray-500">
                  Supported files: PNG, JPG, JPEG
                </p>
              </div>
            </MyFormMultipleImageUpload>
          </div>

          <div className="w-full my-10">
            <button
              type="submit"
              className="relative mx-auto w-full overflow-hidden rounded-xl 
               bg-primary
               py-3 px-6 font-semibold text-white shadow-lg
               transition-all duration-300 hover:shadow-xl 
               focus:outline-none active:scale-[0.97] cursor-pointer"
            >
              <span className="relative z-10">Submit</span>

              {/* Shimmer effect */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]" />
            </button>
          </div>
        </MyFormWrapper>
      </div>{" "}
    </div>
  );
};

export default GearCreate;
