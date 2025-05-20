"use client";

import type React from "react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-medium">Cycling</h2>
        <div className="text-right">
          <p className="text-sm text-gray-600">8-10 Aug, 2025</p>
          <p className="text-sm text-orange-500">Participant 01</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-4 text-lg font-medium">Personal Information</h3>

        <div className="mb-4">
          <RadioGroup
            value={formData.gender}
            onValueChange={(value) => handleSelectChange("gender", value)}
            className="flex gap-4"
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
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1"
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
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
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="mt-1"
            />
            {errors.dateOfBirth && (
              <p className="mt-1 text-xs text-red-500">{errors.dateOfBirth}</p>
            )}
          </div>
          <div>
            <Label htmlFor="nationality">Nationality</Label>
            <Select
              value={formData.nationality}
              onValueChange={(value) =>
                handleSelectChange("nationality", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select nationality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="fr">France</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="es">Spain</SelectItem>
              </SelectContent>
            </Select>
            {errors.nationality && (
              <p className="mt-1 text-xs text-red-500">{errors.nationality}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
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

      <div className="mb-6">
        <h3 className="mb-4 text-lg font-medium">Address & Contact</h3>

        <div className="mb-4">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1"
          />
          {errors.address && (
            <p className="mt-1 text-xs text-red-500">{errors.address}</p>
          )}
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="continent">Continent</Label>
            <Select
              value={formData.continent}
              onValueChange={(value) => handleSelectChange("continent", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select continent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="na">North America</SelectItem>
                <SelectItem value="sa">South America</SelectItem>
                <SelectItem value="eu">Europe</SelectItem>
                <SelectItem value="as">Asia</SelectItem>
                <SelectItem value="af">Africa</SelectItem>
                <SelectItem value="oc">Oceania</SelectItem>
              </SelectContent>
            </Select>
            {errors.continent && (
              <p className="mt-1 text-xs text-red-500">{errors.continent}</p>
            )}
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Select
              value={formData.country}
              onValueChange={(value) => handleSelectChange("country", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="fr">France</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="es">Spain</SelectItem>
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="mt-1 text-xs text-red-500">{errors.country}</p>
            )}
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="region">Region</Label>
            <Select
              value={formData.region}
              onValueChange={(value) => handleSelectChange("region", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ny">New York</SelectItem>
                <SelectItem value="ca">California</SelectItem>
                <SelectItem value="tx">Texas</SelectItem>
                <SelectItem value="fl">Florida</SelectItem>
                <SelectItem value="il">Illinois</SelectItem>
              </SelectContent>
            </Select>
            {errors.region && (
              <p className="mt-1 text-xs text-red-500">{errors.region}</p>
            )}
          </div>
          <div>
            <Label htmlFor="zipCode">Zip code/ Postal code</Label>
            <Select
              value={formData.zipCode}
              onValueChange={(value) => handleSelectChange("zipCode", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select zip code" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10001">10001</SelectItem>
                <SelectItem value="10002">10002</SelectItem>
                <SelectItem value="10003">10003</SelectItem>
                <SelectItem value="10004">10004</SelectItem>
                <SelectItem value="10005">10005</SelectItem>
              </SelectContent>
            </Select>
            {errors.zipCode && (
              <p className="mt-1 text-xs text-red-500">{errors.zipCode}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="phoneNumber">Phone number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1"
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>
            )}
          </div>
          <div>
            <Label htmlFor="emergencyContact">Emergency contact Number</Label>
            <Input
              id="emergencyContact"
              name="emergencyContact"
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

      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-600"
          onClick={handleContinue}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
