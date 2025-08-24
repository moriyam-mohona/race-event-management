"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MyFormTextArea from "@/components/ui/MyForm/MyFormTextArea/MyFormTextArea";
import MyFormDatePicker from "@/components/ui/MyForm/MyFormDatePicker/MyFormDatePicker";
import MyFormTimePicker from "@/components/ui/MyForm/MyFormTimePicker/MyFormTimePicker";
import MyFormSelect from "@/components/ui/MyForm/MyFormSelect/MyFormSelect";
import MyFormImageUpload from "@/components/ui/MyForm/MyFormImageUpload/MyFormImageUpload";
import { AiOutlineUpload } from "react-icons/ai";
import FAQFormList from "@/components/ui/MyForm/MyFormFAQFormList/MyFormFAQFormList";
import countries from "world-countries";
import MyFormAddress from "@/components/ui/MyForm/MyFormAddress/MyFormAddress";
import { useCreateEventByVendorMutation } from "@/redux/features/event/eventApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { useRouter } from "next/navigation";

const validationSchema = z.object({
  eventUrl: z.string().min(10, "Event URL is required"),
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  startDate: z.string().nonempty("Start date is required"),
  endDate: z.string().nonempty("End date is required"),
  time: z.string().nonempty("Start time is required"),
  continent: z.string().nonempty("Continent is required"),
  country: z.string().nonempty("Country is required"),
  region: z.string().nonempty("Region is required"),
  address: z.string().nonempty("Address is required"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  category: z.string().nonempty("Category is required"),
  type: z.string().nonempty("Event type is required"),
  venueType: z.string().nonempty("Venue type is required"),
  season: z.string().nonempty("Season is required"),
  size: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ invalid_type_error: "Size must be a number" }).positive()
  ),
  price: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ invalid_type_error: "Price must be a number" }).nonnegative()
  ),
  startAddress: z.string().nonempty("Start address is required"),
  endAddress: z.string().nonempty("End address is required"),
  distance: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ invalid_type_error: "Distance must be a number" }).nonnegative()
  ),
  ageLimit: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ invalid_type_error: "Age must be a number" }).min(1)
  ),
  image: z.any().refine((file) => !!file, "Image is required"),
  frequentlyAskedQuestions: z.array(
    z.object({
      question: z.string().nonempty("Question required"),
      answer: z.string().nonempty("Answer required"),
    })
  ),
});

const CreateShareEvent = () => {
  const continents = [
    { code: "AF", name: "Africa" },
    { code: "AS", name: "Asia" },
    { code: "EU", name: "Europe" },
    { code: "NA", name: "North America" },
    { code: "SA", name: "South America" },
    { code: "OC", name: "Oceania" },
    { code: "AN", name: "Antarctica" },
  ];

  const countryList = countries.map((country) => ({
    code: country.cca2,
    name: country.name.common,
    flagUrl: `https://flagcdn.com/w20/${country.cca2.toLowerCase()}.png`,
  }));

  const [eventCreate] = useCreateEventByVendorMutation();
  const router = useRouter();

  const handleSubmit = async (formData: any, reset: any) => {
    const dataToSend = new FormData();
    const data = {
      eventUrl: formData.eventUrl,
      title: formData.title,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      time: formData.time,
      continent: formData.continent,
      country: formData.country,
      region: formData.region,
      address: formData.address,
      latitude: formData.latitude,
      longitude: formData.longitude,
      category: formData.category,
      type: formData.type,
      venueType: formData.venueType,
      season: formData.season,
      size: formData.size,
      price: formData.price,
      startAddress: formData.startAddress,
      endAddress: formData.endAddress,
      distance: formData.distance,
      ageLimit: String(formData.ageLimit),
      frequentlyAskedQuestions: formData.frequentlyAskedQuestions,
    };
    dataToSend.append("data", JSON.stringify(data));
    if (formData.image) dataToSend.append("event-file", formData.image);

    const response = await handleAsyncWithToast(() => eventCreate(dataToSend));
    if (response?.data?.success) {
      reset();
      router.push(`/dashboard/vendor/all-events`);
    }
    console.log(formData);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Share Event</h2>

      <MyFormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(validationSchema)}
        className="space-y-8"
      >
        {/* Event URL */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Event URL
          </h2>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <MyFormInput name="eventUrl" type="text" label="Event Url" />
          </div>
        </div>
        {/* Set Date & Time */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Set Date & Time
          </h2>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <MyFormInput name="title" type="text" label="Title" />
            <MyFormTextArea name="description" label="Description" />
          </div>
        </div>

        {/* Event or Expo Title */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Event or Expo Title
          </h2>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow duration-300">
            <MyFormDatePicker
              name="startDate"
              label="Start Date"
              inputClassName="!w-full lg:!w-[350px]"
              disablePastDate
            />
            <MyFormDatePicker
              name="endDate"
              label="End Date"
              inputClassName="!w-full lg:!w-[350px]"
              disablePastDate
            />
            <MyFormTimePicker
              name="time"
              label="Start Time"
              timePickerClassName="!w-full lg:!w-[350px]"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Location</h2>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col lg:flex-row gap-4">
              <MyFormSelect
                name="continent"
                label="Continent"
                placeHolder="Select your continent"
                options={continents.map((c) => ({
                  value: c.name,
                  label: c.name,
                }))}
                labelClassName="font-medium"
                className="!w-full lg:!w-[520px]"
              />
              <MyFormSelect
                name="country"
                label="Country"
                placeHolder="Select your country"
                options={countryList.map((c) => ({
                  value: c.code,
                  label: (
                    <div className="flex items-center gap-2">
                      <Image
                        src={c.flagUrl}
                        alt={c.name}
                        width={20}
                        height={20}
                        className="w-5 h-3 object-cover"
                      />
                      <span>{c.name}</span>
                    </div>
                  ),
                }))}
                labelClassName="font-medium"
                className="!w-full lg:!w-[520px]"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <MyFormInput
                name="region"
                label="Region"
                inputClassName="!w-full lg:!w-[520px]"
              />
              <MyFormAddress
                name="address"
                label="Address"
                placeHolder="Enter your address"
                inputClassName="!w-full lg:!w-[520px]"
              />
            </div>
          </div>
        </div>

        {/* Race Category, Type, Site, Size, Season & Price */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Race Category, Type, Site, Size, Season & Price
          </h2>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col lg:flex-row gap-4">
              <MyFormSelect
                name="category"
                label="Category"
                placeHolder="Select your event category"
                options={[
                  { value: "RUNNING", label: "Running" },
                  { value: "CYCLING", label: "Cycling" },
                  { value: "TRIATHLON", label: "Triathlon" },
                  { value: "SWIMMING", label: "Swimming" },
                  {
                    value: "OBSTACLE_ADVENTURE",
                    label: "Obstacle & Adventure",
                  },
                  { value: "VIRTUAL_RACE", label: "Virtual Races" },
                ]}
                labelClassName="font-medium"
                className="!w-full lg:!w-[520px]"
              />
              <MyFormSelect
                name="type"
                label="Event Type"
                placeHolder="Select your event type"
                options={[{ value: "SHARED", label: "Shared" }]}
                labelClassName="font-medium"
                className="!w-full lg:!w-[520px]"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <MyFormSelect
                name="venueType"
                label="Venue type"
                placeHolder="Select your venue type"
                options={[
                  { value: "MOUNTAIN", label: "Mountain" },
                  { value: "HILLY", label: "Hilly" },
                ]}
                labelClassName="font-medium"
                className="!w-full lg:!w-[520px]"
              />
              <MyFormSelect
                name="season"
                label="Season"
                placeHolder="Select event season"
                options={[
                  { value: "SUMMER", label: "Summer" },
                  { value: "WINTER", label: "Winter" },
                  { value: "AUTUMN", label: "Autumn" },
                  { value: "SPRING", label: "Spring" },
                ]}
                labelClassName="font-medium"
                className="!w-full lg:!w-[520px]"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <MyFormInput
                name="size"
                type="number"
                label="Maximum person"
                placeHolder="Enter maximum person"
                inputClassName="!w-full lg:!w-[520px]"
              />
              <MyFormInput
                name="price"
                type="number"
                label="Price"
                placeHolder="Enter price"
                inputClassName="!w-full lg:!w-[520px]"
              />
            </div>
          </div>
        </div>

        {/* Race Start to Finish Address & Distance */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Race Start to Finish Address & Distance
          </h2>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow duration-300">
            <MyFormInput name="startAddress" label="Start Address" />
            <MyFormInput name="endAddress" label="End Address" />
            <MyFormInput name="distance" type="number" label="Distance" />
          </div>
        </div>

        {/* Set Age Limit */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Set Age Limit
          </h2>
          <MyFormInput
            name="ageLimit"
            type="number"
            placeHolder="Enter age limit"
            inputClassName="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
          />
        </div>

        {/* Frequently Asked Questions */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Set Frequently Asked Questions
          </h2>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <FAQFormList />
          </div>
        </div>

        {/* Upload Images */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Upload Image
          </h2>
          <div className="w-96 h-60">
            <MyFormImageUpload name="image">
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
            </MyFormImageUpload>
          </div>
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
  );
};

export default CreateShareEvent;
