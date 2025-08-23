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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { nextStep, setEventId } from "@/redux/features/event/eventSlice";
import { useAppDispatch } from "@/redux/hooks";

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
  const dispatch = useAppDispatch();
  const eventId = useSelector((state: RootState) => state.event.eventId);

  const handleSubmit = async (formData: any, reset: any) => {
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
      createGear({ data: dataToSubmit, id: eventId })
    );
    if (response?.data?.success) {
      const newEventId = response?.data?.data?.eventId;
      if (newEventId) dispatch(setEventId(newEventId));
      dispatch(nextStep());
      reset();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Create Needed Gear
      </h2>

      {/* Listed Gear Section */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Listed Gear
        </h3>
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          {/* You can render existing gear list here */}
          <p className="text-gray-500">No gear added yet.</p>
        </div>
      </div>

      {/* Create Gear Form */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Create Gear
        </h3>
        <MyFormWrapper
          onSubmit={handleSubmit}
          resolver={zodResolver(validationSchema)}
          className="space-y-8"
        >
          {/* Gear Title & Category */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h2 className="text-xl font-medium mb-4">Gear Details</h2>
            <div className="space-y-5">
              <MyFormInput name="gearTitle" label="Gear Title" />
              <MyFormInput name="categoryName" label="Category Name" />
            </div>
          </div>

          {/* Price */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h2 className="text-xl font-medium mb-4">Price</h2>
            <MyFormInput
              name="price"
              type="number"
              label="Price"
              placeHolder="Enter the price"
            />
          </div>

          {/* Sizes & Colors */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col lg:flex-row gap-6">
            <div className="w-full">
              <h2 className="text-xl font-medium mb-3">Sizes</h2>
              <MyFormMultiSelect
                name="mixedValues"
                type="mixed"
                placeHolder="Type text, number, or hex color"
              />
            </div>
            <div className="w-full">
              <h2 className="text-xl font-medium mb-3">Colors</h2>
              <MyFormMultiSelect
                name="colors"
                type="color"
                placeHolder="Pick and add gear colors"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h2 className="text-xl font-medium mb-4">Upload Images</h2>
            <MyFormMultipleImageUpload
              name="images"
              maxFiles={10}
              rules={{ required: "At least one image is required" }}
              previewContainerClassName="flex flex-wrap gap-3"
              previewImageClassName="w-32 h-32 object-cover rounded-lg"
            >
              <div className="rounded-2xl border border-dashed bg-green-50 flex flex-col items-center justify-center gap-3 py-10 hover:bg-green-100 transition-colors duration-300">
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

          {/* Submit Button */}
          <div className="w-full my-8">
            <button
              type="submit"
              className="relative mx-auto w-full overflow-hidden rounded-xl 
                bg-primary py-3 px-6 font-semibold text-white shadow-lg
                transition-all duration-300 hover:shadow-xl focus:outline-none active:scale-[0.97] cursor-pointer"
            >
              <span className="relative z-10">Submit</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]" />
            </button>
          </div>
        </MyFormWrapper>
      </div>
    </div>
  );
};

export default GearCreate;
