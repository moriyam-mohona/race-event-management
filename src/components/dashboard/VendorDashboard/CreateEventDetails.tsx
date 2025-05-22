/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setEventDetails, nextStep } from "@/redux/features/event/eventSlice";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const CreateEventDetails = () => {
  const dispatch = useAppDispatch();
  const eventData = useAppSelector((state) => state.event);

  type Faq = { question: string; answer: string };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    timezone: "",
    continent: "",
    region: "",
    city: "",
    season: "",
    country: "",
    category: "",
    venue: "",
    event_type: "",
    size: "",
    prize: "",
    startAddress: "",
    finishAddress: "",
    distance: "",
    ageLimit: "",
    faqs: [] as Faq[],
    images: [] as { file: File; preview: string }[],
  });

  // Load data from Redux when component mounts
  useEffect(() => {
    setFormData({
      title: eventData.title || "",
      description: eventData.description || "",
      startDate: eventData.startDate || "",
      startTime: eventData.startTime || "",
      endDate: eventData.endDate || "",
      endTime: eventData.endTime || "",
      timezone: eventData.timezone || "",
      continent: eventData.continent || "",
      country: eventData.country || "",
      region: eventData.region || "",
      city: eventData.city || "",
      category: eventData.category || "",
      event_type: eventData.event_type || "",
      venue: eventData.venue || "",
      season: eventData.season || "",
      size: eventData.size || "",
      prize: eventData.prize || "",
      startAddress: eventData.startAddress || "",
      finishAddress: eventData.finishAddress || "",
      distance: eventData.distance || "",
      ageLimit: eventData.ageLimit || "",
      faqs: eventData.faqs || [],
      images: eventData.images || [],
    });
  }, [eventData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    return () => {
      formData.images.forEach((img: any) => URL.revokeObjectURL(img.preview));
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setEventDetails(formData));

    // Log to console as requested
    console.log("Event details saved:", formData);

    dispatch(nextStep());
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-medium mb-6">Create Event</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Event Title & Description */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Event or Expo Title</h3>
          <div className="border rounded-lg p-6 space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
                required
              />
            </div>
            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter event description"
                className="h-40"
                rows={12}
              />
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Set Date & Time</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded-lg p-6">
            {/* Start Date */}
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            {/* End Date */}
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
            {/* Time */}
            <div className="space-y-2">
              <Label htmlFor="timezone">Time</Label>
              <Select
                value={formData.timezone}
                onValueChange={(value) => handleSelectChange("timezone", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">EST</SelectItem>
                  <SelectItem value="pst">PST</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-lg p-6">
            {/* Continent{" "} */}
            <div className="space-y-2">
              <Label htmlFor="continent">Continent</Label>
              <Input
                id="continent"
                name="continent"
                value={formData.continent}
                onChange={handleChange}
                placeholder="Enter continent"
              />
            </div>
            {/* Country */}
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter country"
              />
            </div>
            {/* Region */}
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Input
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                placeholder="Enter region"
              />
            </div>
            {/* City */}
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
              />
            </div>
          </div>
        </div>

        {/* Race Category */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Race Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-lg p-6">
            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Running">Running</SelectItem>
                  <SelectItem value="Cycling">Cycling</SelectItem>
                  <SelectItem value="Triathlon">Triathlon</SelectItem>
                  <SelectItem value="Swimming">Swimming</SelectItem>
                  <SelectItem value="Obstacle & Adventure">
                    Obstacle & Adventure
                  </SelectItem>
                  <SelectItem value="Virtual Races">Virtual Races</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor="event_type">Type</Label>
              <Select
                value={formData.event_type}
                onValueChange={(value) =>
                  handleSelectChange("event_type}", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                  <SelectItem value="On site">On site</SelectItem>
                  <SelectItem value="Virtual">Virtual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Venue Type */}
            <div className="space-y-2">
              <Label htmlFor="venue">Venue Type</Label>
              <Select
                value={formData.venue}
                onValueChange={(value) => handleSelectChange("venue", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select venue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mountain">Mountain</SelectItem>
                  <SelectItem value="Hilly">Hilly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Season */}
            <div className="space-y-2">
              <Label htmlFor="season">Season</Label>
              <Select
                value={formData.season}
                onValueChange={(value) => handleSelectChange("season", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select season type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Summer">Summer</SelectItem>
                  <SelectItem value="Winter">Winter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* size */}
            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Input
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="Enter size"
              />
            </div>
            {/* prize */}
            <div className="space-y-2">
              <Label htmlFor="prize">Prize</Label>
              <Input
                id="prize"
                name="prize"
                value={formData.prize}
                onChange={handleChange}
                placeholder="Enter size"
              />
            </div>
          </div>
        </div>

        {/* Race Start to Finish Address & Distance */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium">
            Race Start to Finish Address & Distance
          </h3>
          <div className="grid grid-cols-1 gap-4 border rounded-lg p-6">
            {/* Start address */}
            <div className="space-y-2">
              <Label htmlFor="startAddress">Start address</Label>
              <Input
                id="startAddress"
                name="startAddress"
                value={formData.startAddress}
                onChange={handleChange}
                placeholder="Enter distance"
              />
            </div>
            {/* Finish address */}
            <div className="space-y-2">
              <Label htmlFor="finishAddress">Finish address </Label>
              <Input
                id="finishAddress"
                name="finishAddress"
                value={formData.finishAddress}
                onChange={handleChange}
                placeholder="Enter distance"
              />
            </div>
            {/* Distance */}
            <div className="space-y-2">
              <Label htmlFor="distance">Distance</Label>
              <Input
                id="distance"
                name="distance"
                type="number"
                value={formData.distance}
                onChange={handleChange}
                placeholder="Enter distance"
              />
            </div>
          </div>
        </div>

        {/* Age Limit */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Set Age Limit</h3>
          <div className="space-y-2">
            <Select
              value={formData.ageLimit}
              onValueChange={(value) => handleSelectChange("ageLimit", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select age limit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ages</SelectItem>
                <SelectItem value="18+">18+</SelectItem>
                <SelectItem value="21+">21+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium">
            Set Frequently Asked Questions
          </h3>
          <div className="border rounded-lg p-6 space-y-4">
            {formData.faqs.map((faq, index) => (
              <div key={index} className="space-y-2 relative border-b pb-4">
                <Label>Question {index + 1}</Label>
                <Input
                  value={faq.question}
                  onChange={(e) => {
                    const updated = [...formData.faqs];
                    updated[index].question = e.target.value;
                    setFormData((prev) => ({ ...prev, faqs: updated }));
                  }}
                  placeholder="Write question"
                />
                <Textarea
                  value={faq.answer}
                  onChange={(e) => {
                    const updated = [...formData.faqs];
                    updated[index].answer = e.target.value;
                    setFormData((prev) => ({ ...prev, faqs: updated }));
                  }}
                  placeholder="Write answer"
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 text-red-500"
                  onClick={() => {
                    const updated = formData.faqs.filter((_, i) => i !== index);
                    setFormData((prev) => ({ ...prev, faqs: updated }));
                  }}
                >
                  🗑️
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-green-600 text-sm"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  faqs: [...prev.faqs, { question: "", answer: "" }],
                }))
              }
            >
              + Add New
            </button>
          </div>
        </div>

        {/* Upload Images */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Upload Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-lg p-6 bg-green-50">
            {/* Upload Box */}
            <div className="flex flex-col items-center justify-center border border-dashed p-4 rounded-md">
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                id="imageUpload"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  const previews = files.map((file) => ({
                    file,
                    preview: URL.createObjectURL(file),
                  }));
                  setFormData((prev) => ({
                    ...prev,
                    images: [...prev.images, ...previews],
                  }));
                }}
              />
              <label
                htmlFor="imageUpload"
                className="cursor-pointer text-blue-600"
              >
                Drag and Drop files to Upload or{" "}
                <span className="underline">Browse</span>
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Supported files: PNG, JPG, JPEG
              </p>
            </div>

            {/* Image Previews */}
            <div className="space-y-2">
              <h4 className="font-medium">Uploaded Files</h4>
              <div className="flex flex-wrap gap-2">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative w-20 h-20">
                    <Image
                      src={img.preview}
                      alt="preview"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...formData.images];
                        updated.splice(index, 1);
                        setFormData((prev) => ({ ...prev, images: updated }));
                      }}
                      className="absolute top-0 right-0 text-red-500 bg-white rounded-full px-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="px-6 py-2 rounded-lg text-white bg-primary hover:bg-primary"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventDetails;
