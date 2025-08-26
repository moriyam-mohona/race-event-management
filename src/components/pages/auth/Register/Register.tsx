/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import countries from "world-countries";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { ButtonLoading } from "@/components/shared/Loading/ButtonLoading";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import MyFormSelect from "@/components/ui/MyForm/MyFormSelect/MyFormSelect";
import MyFormDatePicker from "@/components/ui/MyForm/MyFormDatePicker/MyFormDatePicker";

const validationSchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required" })
    .min(2, "Full name must be at least 2 characters"),
  role: z.enum(["USER", "VENDOR"], { required_error: "Role is required" }),
  dateOfBirth: z.string({ required_error: "Date of birth is required" }).refine(
    (val) => {
      const date = new Date(val);
      const today = new Date();
      return !isNaN(date.getTime()) && date < today; // valid date and not in the future
    },
    { message: "Date of birth cannot be in the future" }
  ),

  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    required_error: "Gender is required",
  }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
  continent: z
    .string({ required_error: "Continent is required" })
    .nonempty("Continent is required"),
  country: z
    .string({ required_error: "Country is required" })
    .nonempty("Country is required"),
  region: z
    .string({ required_error: "Region is required" })
    .min(2, "Region must be at least 2 characters"),
  zipCode: z
    .string({ required_error: "Zip code is required" })
    .regex(/^\d{4,10}$/, "Zip code must be 4-10 digits"),
});

const Register = () => {
  const [step, setStep] = useState(1);

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

  const handleSubmit = async (formData: any, reset: any) => {
    const response = await handleAsyncWithToast(async () => {
      return register(formData);
    });
    if (response?.data?.success && response?.data?.data?.isVerified === false) {
      const email = response?.data?.data?.email; // keep raw email here
      router.push(
        `/auth/verify-email?email=${encodeURIComponent(email)}&page=register`
      );
      reset();
    }
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
          <MyFormWrapper
            onSubmit={handleSubmit}
            resolver={zodResolver(validationSchema)}
            className="space-y-6"
          >
            <div
              style={{ display: step === 1 ? "block" : "none" }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MyFormInput
                  label="Full Name"
                  placeHolder="Enter your name"
                  name="fullName"
                />
                <MyFormSelect
                  label="Role"
                  name="role"
                  placeHolder="Select your role"
                  options={[
                    { value: "USER", label: "User" },
                    { value: "VENDOR", label: "Vendor" },
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MyFormDatePicker label="Date of Birth" name="dateOfBirth" />
                <MyFormSelect
                  label="Gender"
                  name="gender"
                  placeHolder="Select your gender"
                  options={[
                    { value: "MALE", label: "Male" },
                    { value: "FEMALE", label: "Female" },
                    { value: "OTHER", label: "Other" },
                  ]}
                />
              </div>

              <MyFormInput
                label="Email"
                name="email"
                placeHolder="Enter your email"
              />
              <MyFormInput
                label="Password"
                name="password"
                placeHolder="Enter your password"
              />
              <Button
                type="button"
                onClick={() => setStep(2)}
                className="mt-10 w-full h-12 text-sm md:text-lg bg-primary text-white cursor-pointer"
              >
                Next
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Login
                </Link>
              </div>
            </div>

            {/* Step 2 Content */}
            <div style={{ display: step === 2 ? "block" : "none" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Continent Select */}
                <MyFormSelect
                  label="Continent"
                  name="continent"
                  placeHolder="Select your continent"
                  options={continents.map((c) => ({
                    value: c.name,
                    label: c.name,
                  }))}
                />
                {/* Country Select */}
                <MyFormSelect
                  label="Country"
                  name="country"
                  placeHolder="Select your country"
                  options={countryList.map((c) => ({
                    value: c.name,
                    label: c.name,
                  }))}
                />

                {/* Region & Zip Code Inputs */}
                <MyFormInput
                  label="Region"
                  name="region"
                  placeHolder="Enter your region"
                />
                <MyFormInput
                  label="Zip Code"
                  name="zipCode"
                  placeHolder="Enter your zip code"
                />
              </div>

              <div className="flex flex-col gap-4 mt-10">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
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
              <div className="text-center text-sm mt-5">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Login
                </Link>
              </div>
            </div>
          </MyFormWrapper>
        </div>
      </div>
    </div>
  );
};

export default Register;
