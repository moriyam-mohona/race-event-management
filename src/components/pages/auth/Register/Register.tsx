/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import countries from "world-countries";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { ButtonLoading } from "@/components/shared/Loading/ButtonLoading";

interface PersonalInfo {
  fullName: string;
  dateOfBirth: Date | undefined;
  gender: string;
  email: string;
  password: string;
}

interface LocationInfo {
  continent: string;
  country: string;
  region: string;
  zipCode: string;
}

const Register = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    dateOfBirth: undefined,
    gender: "",
    email: "",
    password: "",
  });
  const [locationInfo, setLocationInfo] = useState<LocationInfo>({
    continent: "",
    country: "",
    region: "",
    zipCode: "",
  });

  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const countryList = countries.map((country) => ({
    code: country.cca2,
    name: country.name.common,
    flagUrl: `https://flagcdn.com/w20/${country.cca2.toLowerCase()}.png`,
  }));

  const continents = [
    { code: "AF", name: "Africa" },
    { code: "AS", name: "Asia" },
    { code: "EU", name: "Europe" },
    { code: "NA", name: "North America" },
    { code: "SA", name: "South America" },
    { code: "OC", name: "Oceania" },
    { code: "AN", name: "Antarctica" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updateState = step === 1 ? setPersonalInfo : setLocationInfo;
    updateState((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setPersonalInfo((prev) => ({ ...prev, dateOfBirth: date }));
  };

  const handleNext = () => setStep(2);
  const handlePrevious = () => setStep(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Data:", { ...personalInfo, ...locationInfo });

    const dataToSUbmit = {
      ...personalInfo,
      ...locationInfo,
    };
    console.log(dataToSUbmit);

    const response = await handleAsyncWithToast(async () => {
      return register(dataToSUbmit);
    });
    if (response?.data?.success && response?.data?.data?.isVerified === false) {
      const email = response?.data?.data?.email; // keep raw email here
      router.push(
        `/auth/verify-email?email=${encodeURIComponent(email)}&page=register`
      );
    }

    console.log(response);
  };

  return (
    <div className="flex justify-center items-center min-h-screen my-10 md:my-20 p-4">
      <div className="flex flex-col items-center space-y-8 w-full">
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={1000}
            height={1000}
            className="h-18 w-24"
          />
        </Link>
        <div className="w-full max-w-4xl bg-white border rounded-lg p-4 md:p-8">
          <h1 className="text-2xl lg:text-[28px] font-semibold mb-8">
            {step === 1 ? "Create Your Account" : "Location Details"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block font-medium text-sm md:text-base">
                      Full Name
                    </label>
                    <Input
                      name="fullName"
                      value={personalInfo.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-medium text-sm md:text-base">
                      Role
                    </label>
                    <Select
                      onValueChange={(val) => handleSelectChange("role", val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USER">User</SelectItem>
                        <SelectItem value="VENDOR">Vendor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block font-medium text-sm md:text-base">
                      Date of Birth
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal h-12"
                        >
                          {personalInfo.dateOfBirth
                            ? format(personalInfo.dateOfBirth, "PPP")
                            : "Pick a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className="w-auto p-0 bg-white"
                      >
                        <Calendar
                          mode="single"
                          selected={personalInfo.dateOfBirth}
                          onSelect={handleDateChange}
                          initialFocus
                          className="bg-white"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <label className="block font-medium text-sm md:text-base">
                      Gender
                    </label>
                    <Select
                      onValueChange={(val) => handleSelectChange("gender", val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block font-medium text-sm md:text-base">
                    Email
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-medium text-sm md:text-base">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={personalInfo.password}
                      onChange={handleChange}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  className="w-full h-12 text-sm md:text-lg bg-primary text-white cursor-pointer"
                  onClick={handleNext}
                >
                  Next
                </Button>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Continent Select */}
                  <div className="space-y-2">
                    <label className="block text-sm md:text-base font-medium">
                      Continent
                    </label>
                    <Select
                      onValueChange={(val) =>
                        setLocationInfo((prev) => ({ ...prev, continent: val }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select continent" />
                      </SelectTrigger>
                      <SelectContent>
                        {continents.map((c) => (
                          <SelectItem key={c.code} value={c.name}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Country Select */}
                  <div className="space-y-2">
                    <label className="block text-sm md:text-base font-medium">
                      Country
                    </label>
                    <Select
                      onValueChange={(val) =>
                        setLocationInfo((prev) => ({ ...prev, country: val }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto">
                        {countryList.map((c) => (
                          <SelectItem key={c.code} value={c.name}>
                            <div className="flex items-center gap-2">
                              <Image
                                src={c.flagUrl}
                                alt={`${c.name} flag`}
                                width={20}
                                height={20}
                                className="w-5 h-4 object-cover"
                              />
                              {c.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Region & Zip Code Inputs */}
                  <div className="space-y-2">
                    <label className="block text-sm md:text-base font-medium">
                      Region
                    </label>
                    <Input
                      name="region"
                      value={locationInfo.region}
                      onChange={handleChange}
                      placeholder="Enter your region"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm md:text-base font-medium">
                      Zip Code
                    </label>
                    <Input
                      name="zipCode"
                      value={locationInfo.zipCode}
                      onChange={handleChange}
                      placeholder="Enter your zip code"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    className="w-full h-12 text-sm md:text-base hover:bg-primary hover:text-white bg-transparent border border-primary text-primary cursor-pointer"
                  >
                    Previous
                  </Button>
                  <Button
                    type="submit"
                    className="w-full h-12 text-sm md:text-lg bg-primary text-white cursor-pointer"
                  >
                    {isLoading ? <ButtonLoading /> : "Sign Up"}
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
