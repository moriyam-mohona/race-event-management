import { T_Event } from "@/types/Events";

export function EventDescription({ data }: { data: T_Event }) {
  return (
    <div className="mb-8 space-y-10">
      <h2 className="text-2xl font-montserrat font-medium">Description</h2>
      <p className="">{data?.description}</p>
    </div>
  );
}
