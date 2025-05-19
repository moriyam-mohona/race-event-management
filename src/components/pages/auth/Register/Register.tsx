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
import SocialLogin from "../SocialLogin/SocialLogin";

interface PersonalInfo {
  firstName: string;
  lastName: string;
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
    firstName: "",
    lastName: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data:", { ...personalInfo, ...locationInfo });
  };

  return (
    <div className="flex justify-center items-center min-h-screen my-20 p-4">
      <div className="w-full max-w-4xl bg-white border rounded-lg p-6 md:p-8">
        <h1 className="text-2xl font-semibold mb-8">
          {step === 1 ? "Create Your Account" : "Location Details"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block font-medium">First Name</label>
                  <Input
                    name="firstName"
                    value={personalInfo.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-medium">Last Name</label>
                  <Input
                    name="lastName"
                    value={personalInfo.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block font-medium">Date of Birth</label>
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
                    <PopoverContent align="start" className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={personalInfo.dateOfBirth}
                        onSelect={handleDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <label className="block font-medium">Gender</label>
                  <Select
                    onValueChange={(val) => handleSelectChange("gender", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-medium">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block font-medium">Password</label>
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
                className="w-full h-12 text-lg bg-primary text-white"
                onClick={handleNext}
              >
                Next
              </Button>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["continent", "country", "region", "zipCode"].map((field) => (
                  <div key={field} className="space-y-2">
                    <label className="block font-medium capitalize">
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <Input
                      name={field}
                      value={(locationInfo as any)[field]}
                      onChange={handleChange}
                      placeholder={`Enter your ${field}`}
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  className="w-full h-12 text-base hover:bg-primary hover:text-white bg-transparent border border-primary text-primary"
                >
                  Previous
                </Button>
                <Button
                  type="submit"
                  className="w-full h-12 text-lg bg-primary text-white"
                >
                  Sign In
                </Button>
              </div>
            </>
          )}

          <div className="relative mt-16">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-gray-500">OR</span>
            </div>
          </div>

          <div className="space-y-4">
            <SocialLogin provider="Google" />
            <SocialLogin provider="Facebook" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
