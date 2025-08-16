import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import { GiCycling } from "react-icons/gi";
import { PiMountainsLight } from "react-icons/pi";
import { SiStreamrunners } from "react-icons/si";
import { TiWeatherWindy } from "react-icons/ti";
import { IoLocationOutline } from "react-icons/io5";
// import { T_Event } from "@/types/Events";
import Link from "next/link";
import { format, isSameMonth, isSameYear } from "date-fns";
import { FaRegBookmark } from "react-icons/fa";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { useAddEventToSavedMutation } from "@/redux/features/event/eventApi";
import { useParams } from "next/navigation";

// export function EventHeader({ title, eventImage, registration }: T_Event) {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function EventHeader({ data }: { data: any }) {
  const start = data?.startDate ? new Date(data.startDate) : null;
  const end = data?.endDate ? new Date(data.endDate) : null;

  let displayDate = "";
  if (start && end) {
    displayDate = isSameYear(start, end)
      ? isSameMonth(start, end)
        ? `${format(start, "d")}-${format(end, "d MMM, yyyy")}` // 8-10 Aug, 2025
        : `${format(start, "d MMM")} - ${format(end, "d MMM, yyyy")}` // 28 Aug - 2 Sep, 2025
      : `${format(start, "d MMM, yyyy")} - ${format(end, "d MMM, yyyy")}`;
  }
  const id = useParams().id;
  const [addEventToSaved] = useAddEventToSavedMutation();

  const handleAddToBookmark = () => {
    const res = handleAsyncWithToast(() => {
      return addEventToSaved(id);
    });
    console.log(res);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-8">
      <div className="md:w-1/3">
        <Image
          src={data?.eventImages[0] || "/placeholder.svg"}
          alt={data?.title}
          width={1000}
          height={1000}
          className="bg-gray-100 w-[486px] h-[443px] rounded-lg object-cover"
        />
      </div>
      <div className="md:w-2/3 space-y-4">
        <div className="flex justify-between items-start ">
          <div className="flex items-center gap-4">
            <p className="font-semibold">Registered From : </p>
            <p className="text-gray-600">
              Location ·
              <span className="font-semibold text-black">
                {" "}
                {data?.address} |{" "}
              </span>
            </p>
            <p className="text-gray-600">
              Hosted country ·
              <span className="font-semibold text-black">
                {" "}
                {data?.country} |{" "}
              </span>
            </p>
            <p className="text-gray-600">
              Entryfy ·{" "}
              <span className="font-semibold text-black">
                {data?.eventStatus}
              </span>
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center ">
          <h1 className="text-3xl font-semibold">{data?.title}</h1>
          <button onClick={handleAddToBookmark}>
            <FaRegBookmark className="text-xl font-semibold" />
          </button>
        </div>

        <div className="mt-8 space-y-2">
          {/* Location  */}
          <div className="flex items-center gap-3">
            <IoLocationOutline className="w-6 h-6 text-secondary/80" />
            <span className="font-medium text-gray-600">
              {data?.address}, {data?.region}, {data?.country},{" "}
              {data?.continent}
            </span>
          </div>
          {/* Date  */}
          <div className="flex items-center gap-4">
            <SlCalender className="w-5 h-5 text-secondary/80" />
            <span className="font-medium text-gray-600">
              {displayDate || "Date not available"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <GiCycling className="w-5 h-5 text-secondary/80" />
            <span className="font-medium text-gray-600">{data?.category}</span>
          </div>
          <div className="flex items-center gap-4">
            <TiWeatherWindy className="w-5 h-5 text-secondary/80" />

            <span className="font-medium text-gray-600">{data?.venueType}</span>
          </div>
          <div className="flex items-center gap-4">
            <PiMountainsLight className="w-5 h-5 text-secondary/80" />

            <span className="font-medium text-gray-600">
              {data?.size} runners
            </span>
          </div>
          <div className="flex items-center gap-4">
            <SiStreamrunners className="w-5 h-5 text-secondary/80" />
            <span className="font-medium text-gray-600">{data?.season}</span>
          </div>

          <div className="mt-10">
            <p className="text-xl font-semibold text-gray-700">
              ${data?.price} USD
            </p>
          </div>

          <div className="flex gap-3 mt-4">
            <Link
              href="/community"
              className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-2 rounded-lg text-lg"
            >
              Community
            </Link>
            <Link
              href="/booking"
              className="hover:border hover:border-primary hover:bg-primary/20 hover:text-primary bg-primary text-white px-8 py-2 rounded-lg text-lg"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
