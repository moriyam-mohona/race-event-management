/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  nextStep,
  prevStep,
  setPersonalDetails,
} from "@/redux/features/booking/bookingSlice";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MyFormRadio from "@/components/ui/MyForm/MyFormRadio/MyFormRadio";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormDatePicker from "@/components/ui/MyForm/MyFormDatePicker/MyFormDatePicker";

export const personalDetailsSchema = z.object({
  gender: z.string({ required_error: "Gender is required" }),
  fullName: z.string({ required_error: "First name is required" }),
  dateOfBirth: z.string({ required_error: "Date of birth is required" }),
  nationality: z.string({ required_error: "Nationality is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Email is invalid"),
  address: z.string({ required_error: "Address is required" }),
  continent: z.string({ required_error: "Continent is required" }),
  country: z.string({ required_error: "Country is required" }),
  region: z.string({ required_error: "Region is required" }),
  zipCode: z.string({ required_error: "Zip code is required" }),
  phoneNumber: z.string({ required_error: "Phone number is required" }),
  emergencyContact: z.string({
    required_error: "Emergency contact is required",
  }),
});

export default function PersonalDetails() {
  const dispatch = useDispatch();
  const { ticket } = useSelector((state: RootState) => state.booking);

  const handleSubmit = (formData: any) => {
    console.log("Form submitted:", formData);
    dispatch(setPersonalDetails(formData));
    dispatch(nextStep());
  };

  const handleBack = () => {
    dispatch(prevStep());
  };

  return (
    <div className="rounded-lg bg-white">
      <div className="mb-4 flex flex-col space-y-2">
        <h2 className="text-2xl md:text-3xl font-medium text-gray-700">
          {ticket.eventType}
        </h2>
        <p className="text-gray-600">{ticket.date}</p>
        <div className="flex justify-between">
          <p className="text-orange-500">Participant {ticket.quantity}</p>
          <p className="text-gray-600 font-semibold">
            ${ticket.price?.toFixed(2)} USD
          </p>
        </div>
      </div>

      <MyFormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(personalDetailsSchema)}
        className="space-y-6"
      >
        {/* Personal Information */}
        <div className="my-6">
          <h3 className="mb-4 text-xl text-gray-800 font-medium">
            Personal Information
          </h3>
          <div className="border px-5 py-8 rounded-lg">
            <div className="mb-4 ">
              <MyFormRadio
                name="gender"
                options={[
                  { value: "MALE", label: "Male" },
                  { value: "FEMALE", label: "Female" },
                ]}
              />
            </div>
            <div className="mb-4 grid grid-cols-1">
              <MyFormInput name="fullName" placeHolder="Full Name" />
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <MyFormDatePicker name="dateOfBirth" />
              <MyFormInput name="nationality" placeHolder="Nationality" />
            </div>

            <div className="mb-4">
              <MyFormInput name="email" placeHolder="Email" />
            </div>
          </div>
        </div>

        {/* Address & Contact */}
        <div className="mb-6">
          <h3 className="mb-4 text-xl text-gray-800 font-medium">
            Address & Contact
          </h3>
          <div className="border px-5 py-8 rounded-lg">
            {/* address */}
            <div className="mb-4">
              <MyFormInput name="address" placeHolder="Address" />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <MyFormInput name="continent" placeHolder="Continent" />
              <MyFormInput name="country" placeHolder="Country" />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <MyFormInput name="region" placeHolder="Region" />
              <MyFormInput name="zipCode" placeHolder="Zip Code" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <MyFormInput name="phoneNumber" placeHolder="Phone Number" />
              <MyFormInput
                name="emergencyContact"
                placeHolder="Emergency Contact"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={handleBack}
            className="border px-10 py-2 rounded cursor-pointer"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-white px-10 py-2 rounded cursor-pointer"
          >
            Next
          </button>
        </div>
      </MyFormWrapper>
    </div>
  );
}
