import { T_Event } from "@/types/Events";
import Image from "next/image";

export function NeededGears({ gears }: T_Event) {
  return (
    <div>
      <div className="space-y-5 mb-6">
        <h2 className="text-2xl font-montserrat font-medium">Needed Gears</h2>
        <p className="text-gray-700 mb-4">This are included in this race</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gears.map((gear) => (
          <div
            key={gear.id}
            className="bg-[#5E7387] rounded-lg px-4 py-8 flex flex-col items-center gap-5"
          >
            <Image
              src={gear.image || "/placeholder.svg"}
              alt={gear.name}
              width={1000}
              height={1000}
              className="mb-2 w-48 h-48 object-cover"
            />
            <h3 className="font-medium text-white text-xl">{gear.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
