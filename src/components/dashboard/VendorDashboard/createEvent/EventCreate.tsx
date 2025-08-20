/* eslint-disable @typescript-eslint/no-explicit-any */
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
import Image from "next/image";

const validationSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  startDate: z.string().nonempty("Start date is required"),
  endDate: z.string().nonempty("End date is required"),
  time: z.string().nonempty("Start time is required"),

  continent: z.string().nonempty("Continent is required"),
  country: z.string().nonempty("Country is required"),
  region: z.string().nonempty("Region is required"),
  address: z.string().nonempty("Address is required"),

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
  distance: z.string().nonempty("Distance is required"),

  ageLimit: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ invalid_type_error: "Age must be a number" }).min(1)
  ),

  images: z.union([
    z.object({}), // single object
    z.array(z.any()), // or array of files
  ]),

  frequentlyAskedQuestions: z.array(
    z.object({
      question: z.string().nonempty("Question required"),
      answer: z.string().nonempty("Answer required"),
    })
  ),
});

const EventCreate = () => {
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

  const handleSubmit = async (formData: any) => {
    console.log(formData);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl xl:text-4xl font-semibold lg:font-medium mb-6">
          Create Event
        </h2>
      </div>
      <MyFormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(validationSchema)}
        className="space-y-6"
      >
        {/*Set Date & Time */}
        <div>
          <h2 className="font-medium text-xl mb-3">Set Date & Time</h2>
          <div className="border border-gray-200 rounded-lg p-5">
            <MyFormInput name="title" type="text" label="Title" />
            <MyFormTextArea name="description" label="Description" />
          </div>{" "}
        </div>
        {/* Event or Expo Title  */}
        <div>
          <h2 className="font-medium text-xl mb-3">Event or Expo Title</h2>
          <div className="w-full border border-gray-200 rounded-lg p-5 flex items-center justify-between">
            <MyFormDatePicker
              name="startDate"
              label="Start Date"
              inputClassName="!w-[220px] lg:!w-[220px] xl:!w-[350px] 2xl:!w-[500px]"
              disablePastDate
            />
            <MyFormDatePicker
              name="endDate"
              label="End Date"
              inputClassName="!w-[220px] lg:!w-[220px] xl:!w-[350px] 2xl:!w-[500px]"
              disablePastDate
            />
            <MyFormTimePicker
              name="time"
              label="Start Time"
              timePickerClassName="!w-[220px] lg:!w-[220px] xl:!w-[350px] 2xl:!w-[500px]"
            />
          </div>{" "}
        </div>
        {/* Location */}
        <div>
          <h2 className="font-medium text-xl mb-3">Location</h2>
          <div className="w-full border border-gray-200 rounded-lg p-5 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <MyFormSelect
                name="continent"
                label="Continent"
                placeHolder="Select your continent"
                options={continents.map((c) => ({
                  value: c.name,
                  label: c.name,
                }))}
                labelClassName="font-medium"
                className="!w-[770px]"
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
                        priority
                        className="w-5 h-3 object-cover"
                      />
                      <span>{c.name}</span>
                    </div>
                  ),
                }))}
                labelClassName="font-medium"
                className="!w-[770px]"
              />
            </div>
            <div className="flex items-center justify-between w-full gap-4">
              <MyFormInput
                name="region"
                label="Region"
                inputClassName="!w-[770px]"
              />
              <MyFormInput
                name="address"
                label="Address"
                inputClassName="!w-[770px]"
              />
            </div>
          </div>
        </div>
        {/* Race Category, Type, Site, Size, Season & Price  */}
        <div>
          <h2 className="font-medium text-xl mb-3">
            Race Category, Type, Site, Size, Season & Price
          </h2>
          <div className="w-full border border-gray-200 rounded-lg p-5 space-y-5">
            <div className="flex items-center justify-between w-full gap-4">
              <MyFormSelect
                name="category"
                label="Category"
                placeHolder="Select your event category"
                options={[
                  { value: "running", label: "Running" },
                  { value: "cycling", label: "Cycling" },
                  { value: "triathlon", label: "Triathlon" },
                  { value: "swimming", label: "Swimming" },
                  { value: "obstacle", label: "Obstacle & Adventure" },
                  { value: "virtual", label: "Virtual Races" },
                ]}
                labelClassName="font-medium"
                className="!w-[770px]"
              />
              <MyFormSelect
                name="type"
                label="Event Type"
                placeHolder="Select your event type"
                options={[
                  { value: "hybrid", label: "Hybrid" },
                  { value: "onsite", label: "On site" },
                  { value: "virtual", label: "Virtual" },
                ]}
                labelClassName="font-medium"
                className="!w-[770px]"
              />
            </div>
            <div className="flex items-center justify-between w-full gap-4">
              <MyFormSelect
                name="venueType"
                label="Venue type"
                placeHolder="Select your venue type"
                options={[
                  { value: "Mountain", label: "Mountain" },
                  { value: "Hilly", label: "Hilly" },
                ]}
                labelClassName="font-medium"
                className="!w-[770px]"
              />
              <MyFormSelect
                name="season"
                label="Season"
                placeHolder="Select event season"
                options={[
                  { value: "Summer", label: "Summer" },
                  { value: "Winter", label: "Winter" },
                ]}
                labelClassName="font-medium"
                className="!w-[770px]"
              />
            </div>
            <div className="flex items-center justify-between w-full gap-4">
              <MyFormInput
                name="size"
                type="number"
                label="Maximum person"
                inputClassName="!w-[770px]"
              />
              <MyFormInput
                name="price"
                type="number"
                label="Price"
                inputClassName="!w-[770px]"
              />
            </div>
          </div>{" "}
        </div>
        {/* Race Start to Finish Address & Distance */}
        <div>
          <h2 className="font-medium text-xl mb-3">
            Race Start to Finish Address & Distance
          </h2>
          <div className="w-full border border-gray-200 rounded-lg p-5 space-y-5">
            <MyFormInput name="startAddress" label="Start Address" />
            <MyFormInput name="endAddress" label="End Address" />
            <MyFormInput name="distance" label="Distance" />
          </div>{" "}
        </div>
        {/* Set Age Limit */}
        <div>
          <h2 className="font-medium text-xl mb-3">Set Age Limit</h2>
          <MyFormInput
            name="ageLimit"
            type="number"
            placeHolder="Enter age limit "
          />
        </div>
        {/* Set Frequently Asked Questions  */}
        <div>
          <h2 className="font-medium text-xl mb-3">
            Set Frequently Asked Questions
          </h2>
          <div className="border border-gray-200 rounded-lg p-5">
            <FAQFormList />
          </div>
        </div>
        {/* Upload Images  */}
        <div>
          <h2 className="font-medium text-xl mb-3">Upload Image</h2>
          <div className="w-96 h-60 ">
            <MyFormImageUpload name="images">
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
            </MyFormImageUpload>
          </div>
        </div>

        <div className="w-full my-20">
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
    </div>
  );
};

export default EventCreate;
