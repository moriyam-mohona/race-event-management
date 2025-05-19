interface LocationFilterProps {
  continent: string;
  country: string;
  region: string;
  onLocationChange: (
    field: "continent" | "country" | "region",
    value: string
  ) => void;
}

const LocationFilter: React.FC<LocationFilterProps> = ({
  continent,
  country,
  region,
  onLocationChange,
}) => {
  return (
    <div className="space-y-4 mb-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Continent</h3>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search continent"
            value={continent}
            onChange={(e) => onLocationChange("continent", e.target.value)}
            className="border rounded p-2 w-full text-sm pr-8"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Country</h3>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search country"
            value={country}
            onChange={(e) => onLocationChange("country", e.target.value)}
            className="border rounded p-2 w-full text-sm pr-8"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Region</h3>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search region"
            value={region}
            onChange={(e) => onLocationChange("region", e.target.value)}
            className="border rounded p-2 w-full text-sm pr-8"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationFilter;
