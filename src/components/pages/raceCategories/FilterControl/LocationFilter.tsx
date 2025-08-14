import React from "react";
import { Select } from "antd";
import countries from "world-countries";

const { Option } = Select;

interface LocationFilterProps {
  continent: string;
  country: string;
  region: string;
  onLocationChange: (
    field: "continent" | "country" | "region",
    value: string
  ) => void;
}

// Continents
const continents = [
  { code: "AF", name: "Africa" },
  { code: "AS", name: "Asia" },
  { code: "EU", name: "Europe" },
  { code: "NA", name: "North America" },
  { code: "SA", name: "South America" },
  { code: "OC", name: "Oceania" },
  { code: "AN", name: "Antarctica" },
];

// Countries
const countryList = countries.map((c) => ({
  code: c.cca2,
  name: c.name.common,
  continent: c.region, // region from world-countries
  flagUrl: `https://flagcdn.com/w20/${c.cca2.toLowerCase()}.png`,
}));

const LocationFilter: React.FC<LocationFilterProps> = ({
  continent,
  country,
  region,
  onLocationChange,
}) => {
  const filteredCountries = countryList.filter(
    (c) => !continent || c.continent === continent
  );

  return (
    <div className="space-y-4 mb-4">
      {/* Continent */}
      <div>
        <h3 className="font-medium mb-2">Continent</h3>
        <Select
          showSearch
          value={continent || undefined}
          placeholder="Select a continent"
          onChange={(value) => onLocationChange("continent", value)}
          className="w-full"
          optionFilterProp="label"
          filterOption={(input, option) =>
            !!option?.label &&
            option.label.toString().toLowerCase().includes(input.toLowerCase())
          }
        >
          {continents.map((c) => (
            <Option key={c.code} value={c.name} label={c.name}>
              {c.name}
            </Option>
          ))}
        </Select>
      </div>

      {/* Country */}
      <div>
        <h3 className="font-medium mb-2">Country</h3>
        <Select
          showSearch
          value={country || undefined}
          placeholder="Select a country"
          onChange={(value) => onLocationChange("country", value)}
          className="w-full"
          optionFilterProp="label"
          filterOption={(input, option) =>
            !!option?.label &&
            option.label.toString().toLowerCase().includes(input.toLowerCase())
          }
        >
          {filteredCountries.map((c) => (
            <Option key={c.code} value={c.name} label={c.name}>
              <span className="mr-2">
                <img src={c.flagUrl} alt={c.name} className="inline w-4 h-3" />
              </span>
              {c.name}
            </Option>
          ))}
        </Select>
      </div>

      {/* Region */}
      <div>
        <h3 className="font-medium mb-2">Region</h3>
        <input
          type="text"
          placeholder="Search region"
          value={region}
          onChange={(e) => onLocationChange("region", e.target.value)}
          className="border rounded p-2 w-full text-sm"
        />
      </div>
    </div>
  );
};

export default LocationFilter;
