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

const CreateEventDetails = () => {
  const dispatch = useAppDispatch();
  const eventData = useAppSelector((state) => state.event);

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
        <h2 className="text-4xl font-medium">Create Event</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Event Title & Description */}
        <div>
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
