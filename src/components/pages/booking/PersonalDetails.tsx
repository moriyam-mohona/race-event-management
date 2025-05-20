"use client";

import type React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RootState } from "@/redux/store";
import {
  nextStep,
  prevStep,
  setPersonalDetails,
} from "@/redux/features/booking/bookingSlice";

export default function PersonalDetails() {
  const dispatch = useDispatch();
  const { personalDetails } = useSelector((state: RootState) => state.booking);

  const [formData, setFormData] = useState({
    gender: personalDetails.gender || "",
    firstName: personalDetails.firstName || "",
    lastName: personalDetails.lastName || "",
    dateOfBirth: personalDetails.dateOfBirth || "",
    nationality: personalDetails.nationality || "",
    email: personalDetails.email || "",
    address: personalDetails.address || "",
    continent: personalDetails.continent || "",
    country: personalDetails.country || "",
    region: personalDetails.region || "",
    zipCode: personalDetails.zipCode || "",
    phoneNumber: personalDetails.phoneNumber || "",
    emergencyContact: personalDetails.emergencyContact || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.nationality)
      newErrors.nationality = "Nationality is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.continent) newErrors.continent = "Continent is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.region) newErrors.region = "Region is required";
    if (!formData.zipCode) newErrors.zipCode = "Zip code is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.emergencyContact)
      newErrors.emergencyContact = "Emergency contact is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      dispatch(setPersonalDetails(formData));
      dispatch(nextStep());

      // Log data to console
      console.log("Personal Details Data:", formData);
    }
  };

  const handleBack = () => {
    dispatch(prevStep());
  };

  return (
    <div className="rounded-lg bg-white">
      <div className="mb-4 flex flex-col justify-between space-y-4">
        <h2 className="text-3xl font-medium text-gray-700">Cycling</h2>
        <div className=" space-y-4">
          <p className="text-gray-600">8-10 Aug, 2025</p>
          <p className="text-orange-500">Participant 01</p>
        </div>
      </div>

      <div className="my-16">
        <h3 className="mb-4 text-xl text-gray-800 font-medium">
          Personal Information
        </h3>

        {/* personal Infos  */}
        <div className="border px-5 py-8 rounded-lg">
          <div className="mb-4 ">
            <RadioGroup
              value={formData.gender}
              onValueChange={(value) => handleSelectChange("gender", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
            {errors.gender && (
              <p className="mt-1 text-xs text-red-500">{errors.gender}</p>
            )}
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Input
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                placeholder="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.dateOfBirth && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.dateOfBirth}
                </p>
              )}
            </div>
            <div>
              <Input
                id="nationality"
                name="nationality"
                placeholder="Nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.nationality && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.nationality}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <Input
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-4 text-xl text-gray-800 font-medium">
          Address & Contact
        </h3>
        <div className="border px-5 py-8 rounded-lg">
          {/* address */}
          <div className="mb-4">
            <Input
              id="address"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1"
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-500">{errors.address}</p>
            )}
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Continent */}
            <div>
              <Input
                id="continent"
                name="continent"
                placeholder="Continent"
                value={formData.continent}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.continent && (
                <p className="mt-1 text-xs text-red-500">{errors.continent}</p>
              )}
            </div>
            <div>
              <Input
                id="country"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.country && (
                <p className="mt-1 text-xs text-red-500">{errors.country}</p>
              )}
            </div>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Input
                id="region"
                name="region"
                placeholder="Continent"
                value={formData.region}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.region && (
                <p className="mt-1 text-xs text-red-500">{errors.region}</p>
              )}
            </div>
            <div>
              <Input
                id="zipCode"
                name="zipCode"
                placeholder="Zip code"
                value={formData.zipCode}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.zipCode && (
                <p className="mt-1 text-xs text-red-500">{errors.zipCode}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.phoneNumber}
                </p>
              )}
            </div>
            <div>
              <Input
                id="emergencyContact"
                name="emergencyContact"
                placeholder="Emergency contact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.emergencyContact && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.emergencyContact}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={handleBack} className="border px-10 py-2 rounded">
          Back
        </button>
        <button
          className="bg-primary hover:bg-primary/90 text-white px-10 py-2 rounded"
          onClick={handleContinue}
        >
          Next
        </button>
      </div>
    </div>
  );
}
