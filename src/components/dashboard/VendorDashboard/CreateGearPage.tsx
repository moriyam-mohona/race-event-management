"use client";

import type React from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addGearItem,
  removeGearItem,
  nextStep,
  prevStep,
  type GearItem,
} from "@/redux/features/event/eventSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Upload } from "lucide-react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

const CreateGearForm = () => {
  const dispatch = useAppDispatch();
  const gearItems = useAppSelector((state) => state.event.gearItems || []);

  const [newGear, setNewGear] = useState<Omit<GearItem, "id">>({
    title: "",
    category: "",
    price: "",
    image: "/placeholder.svg?height=100&width=100",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGear((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setNewGear((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddGear = () => {
    if (newGear.title && newGear.category && newGear.price) {
      const gearItem: GearItem = {
        ...newGear,
        id: uuidv4(),
      };
      dispatch(addGearItem(gearItem));
      setNewGear({
        title: "",
        category: "",
        price: "",
        image: "/placeholder.svg?height=100&width=100",
      });
      setImagePreview(null);

      // Log to console as requested
      console.log("Added new gear item:", gearItem);
      console.log("Updated gear list:", [...gearItems, gearItem]);
    }
  };

  const handleRemoveGear = (id: string) => {
    dispatch(removeGearItem(id));
  };

  const handleNext = () => {
    dispatch(nextStep());
  };

  const handleBack = () => {
    dispatch(prevStep());
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-medium mb-6">Create Needed Gear</h2>

        {gearItems.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Listed gear</h3>
            <div className="space-y-4">
              {gearItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center p-4 border rounded-lg bg-white"
                >
                  <div className="flex-shrink-0 mr-4">
                    <span className="font-medium">{index + 1}.</span>
                  </div>
                  <div className="flex-shrink-0 mr-4">
                    <Image
                      src={item.image || "/placeholder.svg?height=60&width=60"}
                      alt={item.title}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="font-medium">${item.price} USD</p>
                  </div>
                  <button
                    onClick={() => handleRemoveGear(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            <button
              className="flex items-center text-green-500 mt-4 text-sm font-medium"
              onClick={() => document.getElementById("gear-title")?.focus()}
            >
              <Plus size={16} className="mr-1" />
              Add New Gear
            </button>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-xl font-medium mb-6">Create Gear</h3>

          <div className="space-y-4">
            <div>
              <Label htmlFor="gear-title">Gear Title</Label>
              <Input
                id="gear-title"
                name="title"
                value={newGear.title}
                onChange={handleChange}
                placeholder="Title"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="gear-category">Category Name</Label>
              <Input
                id="gear-category"
                name="category"
                value={newGear.category}
                onChange={handleChange}
                placeholder="Category"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="gear-price">Price</Label>
              <Input
                id="gear-price"
                name="price"
                value={newGear.price}
                onChange={handleChange}
                placeholder="0.00"
                type="number"
                min="0"
                step="0.01"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Upload Images</Label>
              <div className="mt-2 border-2 border-dashed border-gray-200 rounded-lg p-6 bg-gray-50">
                <div className="flex flex-col items-center justify-center text-center">
                  {imagePreview ? (
                    <div className="mb-4">
                      <Image
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                      />
                    </div>
                  ) : (
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  )}

                  <p className="text-sm text-gray-500 mb-2">
                    Drag and Drop files to Upload
                    <br />
                    or
                  </p>

                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium">
                      Browse
                    </span>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                  </label>

                  <p className="text-xs text-gray-400 mt-2">
                    Supported files: PNG, JPG, JPEG
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleAddGear}
              className="mt-4 bg-blue-500 hover:bg-blue-600"
              disabled={!newGear.title || !newGear.category || !newGear.price}
            >
              Add Gear
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={handleBack} variant="outline">
          Back
        </Button>
        <Button onClick={handleNext} className="bg-blue-500 hover:bg-blue-600">
          Next
        </Button>
      </div>
    </div>
  );
};

export default CreateGearForm;
