import { T_Event } from "@/types/Events";

export function EventLocation({ startAddress, finishAddress }: T_Event) {
  return (
    <div className="space-y-14">
      <div className="space-y-5">
        <h2 className="text-2xl font-montserrat font-medium">
          Race Start Address
        </h2>
        <p className="text-gray-700">{startAddress}</p>
      </div>

      <div className="space-y-5">
        <h2 className="text-2xl font-montserrat font-medium">
          Race Finish Address
        </h2>
        <p className="text-gray-700">{finishAddress}</p>
      </div>
    </div>
  );
}
