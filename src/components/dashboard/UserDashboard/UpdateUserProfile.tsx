/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import { T_User } from "@/types/User";
import Image from "next/image";
import profile from "@/assets/images/Human.png";
import { Label } from "@/components/ui/label";
import {
  useGetMeQuery,
  useUpdateUserMutation,
} from "@/redux/features/auth/authApi";
import UpdatePassword from "./UpdatePassword";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";

const UpdateUserProfile = () => {
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );

  const [formData, setFormData] = useState<T_User>({
    fullName: "",
    dateOfBirth: undefined,
    gender: "",
    continent: "",
    country: "",
    region: "",
    zipCode: "",
  });

  const { data: getme } = useGetMeQuery({});
  const [updateUser] = useUpdateUserMutation();

  // Populate default values when getme loads
  useEffect(() => {
    if (getme?.data) {
      setFormData({
        fullName: getme?.data?.fullName || "",
        dateOfBirth: getme?.data?.dateOfBirth
          ? parseISO(getme?.data?.dateOfBirth)
          : undefined,
        gender: getme?.data?.gender?.toLowerCase() || "",
        continent: getme?.data?.continent || "",
        country: getme?.data?.country || "",
        region: getme?.data?.region || "",
        zipCode: getme?.data?.zipCode || "",
      });
      if (getme?.data?.profileImage) {
        setProfileImagePreview(getme?.data?.profileImage);
      }
    }
  }, [getme]);

  const handleInputChange = (field: keyof T_User, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = new FormData();

    const data = {
      fullName: formData.fullName,
      dateOfBirth: formData.dateOfBirth
        ? formData.dateOfBirth.toISOString()
        : null,
      gender: formData.gender ? formData.gender.toUpperCase() : null,
      continent: formData.continent,
      country: formData.country,
      region: formData.region,
      zipCode: formData.zipCode,
    };

    payload.append("data", JSON.stringify(data));

    if (profileImageFile) {
      payload.append("profilePic", profileImageFile);
    }
    await handleAsyncWithToast(async () => {
      return updateUser(payload);
    });
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl lg:text-[32px] font-medium text-gray-800 mb-6">
        Edit Your Profile Information
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Profile Photo */}
        <div className="mb-8 flex flex-col md:flex-row justify-start items-start md:gap-10 max-w-2xl bg-white border border-gray-200 rounded-lg p-5">
          <Label className="text-lg">Profile Photo</Label>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              {profileImagePreview ? (
                <Image
                  src={profileImagePreview}
                  width={1000}
                  height={1000}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={profile}
                  alt="Profile"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-sm"
                onClick={() =>
                  document.getElementById("profile-upload")?.click()
                }
              >
                Click to replace
              </Button>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-white border border-gray-200 rounded-lg p-5">
          <div>
            <Label className="text-base md:text-lg mb-2">Full Name</Label>
            <Input
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="bg-gray-50"
            />
          </div>
          <div>
            <Label className="text-base md:text-lg mb-2">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal h-12 text-gray-500 bg-transparent"
                >
                  {formData.dateOfBirth ? (
                    format(formData.dateOfBirth, "PPP")
                  ) : (
                    <span>Date of Birth</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.dateOfBirth}
                  onSelect={(date) => handleInputChange("dateOfBirth", date)}
                  initialFocus
                  className="bg-white"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label className="text-base md:text-lg mb-2">Gender</Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => handleInputChange("gender", value)}
            >
              <SelectTrigger className="bg-gray-50">
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

        {/* Location Details */}
        <h3 className="text-xl md:text-2xl font-medium text-gray-800 mb-4">
          Location Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-white border border-gray-200 rounded-lg p-5">
          <div>
            <Label className="text-base md:text-lg mb-2">Continent</Label>
            <Input
              type="text"
              placeholder="Continent"
              value={formData.continent}
              onChange={(e) => handleInputChange("continent", e.target.value)}
              className="bg-gray-50"
            />
          </div>
          <div>
            <Label className="text-base md:text-lg mb-2">Country</Label>
            <Input
              type="text"
              placeholder="Country"
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              className="bg-gray-50"
            />
          </div>
          <div>
            <Label className="text-base md:text-lg mb-2">Region</Label>
            <Input
              type="text"
              placeholder="Region"
              value={formData.region}
              onChange={(e) => handleInputChange("region", e.target.value)}
              className="bg-gray-50"
            />
          </div>
          <div>
            <Label className="text-base md:text-lg mb-2">
              Zip code/ Postal code
            </Label>
            <Input
              type="text"
              placeholder="Zip code/ Postal code"
              value={formData.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              className="bg-gray-50"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            type="submit"
            className="w-full text-sm md:text-base bg-primary hover:bg-primary/90 py-2 px-4 rounded-md text-white cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>

      <UpdatePassword />
    </div>
  );
};

export default UpdateUserProfile;
