"use client";

import { useState } from "react";
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
import { CalendarIcon, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";
import { T_User } from "@/types/User";
import Image from "next/image";
import profile from "@/assets/images/Human.png";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
const UpdateUserProfile = () => {
  const router = useRouter();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<T_User>({
    firstName: "",
    lastName: "",
    dateOfBirth: undefined,
    gender: "",
    email: "demo@gmail.com",
    continent: "",
    country: "",
    region: "",
    zipCode: "",
    oldPassword: "",
    newPassword: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (field: keyof T_User, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Log the form data to the console
    console.log("Profile Update Data:", {
      ...formData,
      profileImage: profileImage ? "Image data exists" : "No image uploaded",
    });

    router.push("/dashboard/user/profile");
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl lg:text-[32px] font-medium text-gray-800 mb-6">
        Edit Your Profile Information
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Profile Photo */}
        <div className="mb-8 flex flex-col md:flex-row justify-start items-start md:gap-10 max-w-2xl border border-gray-200 rounded-lg p-5">
          <Label className="text-lg">Profile Photo</Label>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <Image
                  src={profileImage}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border border-gray-200 rounded-lg p-5">
          {/* First Name */}
          <div>
            <Label className="text-base md:text-lg mb-2">First Name</Label>
            <Input
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="bg-gray-50"
            />
          </div>
          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2"></label>
            <Label className="text-base md:text-lg mb-2">Last Name</Label>
            <Input
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="bg-gray-50"
            />
          </div>
          {/* Date of Birth */}
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
                />
              </PopoverContent>
            </Popover>
          </div>
          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2"></label>
            <Label className="text-base md:text-lg mb-2">Gender</Label>
            <Select
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
          {/* E-mail */}
          <div>
            <Label className="text-base md:text-lg mb-2">E-mail</Label>
            <Input
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="bg-gray-50"
            />
          </div>
        </div>

        {/* Location Details */}
        <h3 className="text-xl md:text-2xl font-medium text-gray-800 mb-4">
          Location Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border border-gray-200 rounded-lg p-5">
          {/* Continent */}
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
          {/* Country */}
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
          {/* Region */}
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
          {/* Zip code/ Postal code */}
          <div>
            <Label className="text-base md:text-lg mb-2">
              Zip code/ Postal code
            </Label>
            <Input
              type="text"
              placeholder="Zip code/ Postal code  "
              value={formData.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              className="bg-gray-50"
            />
          </div>
        </div>

        {/* Password */}
        <div className="grid grid-cols-1 gap-6 mb-8 border border-gray-200 rounded-lg p-5">
          <div>
            <Label className="text-base md:text-lg mb-2">Old Password</Label>
            <div className="relative">
              <Input
                name="password"
                type={showOldPassword ? "text" : "password"}
                placeholder="••••••••••"
                value={formData.oldPassword}
                onChange={(e) =>
                  handleInputChange("oldPassword", e.target.value)
                }
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                tabIndex={-1}
              >
                {showOldPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <div>
            <Label className="text-base md:text-lg mb-2">New Password</Label>
            <div className="relative">
              <Input
                name="password"
                type={showNewPassword ? "text" : "password"}
                placeholder="••••••••••"
                value={formData.newPassword}
                onChange={(e) =>
                  handleInputChange("newPassword", e.target.value)
                }
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                tabIndex={-1}
              >
                {showNewPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            className="text-sm md:text-base py-2 px-6 rounded-md border"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-sm md:text-base bg-primary hover:bg-primary/90 py-2 px-4 rounded-md text-white"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserProfile;
