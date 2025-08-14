import { T_Event } from "@/types/Events";

export function EventLocation({ data }: { data: T_Event }) {
  return (
    <div className="space-y-14">
      <div className="space-y-5">
        <h2 className="text-2xl font-montserrat font-medium">
          Race Start Address
        </h2>
        <p className="text-gray-700">{data?.startAddress}</p>
      </div>

      <div className="space-y-5">
        <h2 className="text-2xl font-montserrat font-medium">
          Race Finish Address
        </h2>
        <p className="text-gray-700">{data?.endAddress}</p>
      </div>
    </div>
  );
}
