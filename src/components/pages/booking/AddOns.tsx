"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";
import gear from "@/assets/gear.png";
import { RootState } from "@/redux/store";
import { GoPlus } from "react-icons/go";

import {
  nextStep,
  prevStep,
  setAddOns,
} from "@/redux/features/booking/bookingSlice";

interface AddOnItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string | StaticImageData;
  quantity: number;
}

export default function AddOns() {
  const dispatch = useDispatch();
  const { addOns } = useSelector((state: RootState) => state.booking);

  const [selectedItems, setSelectedItems] = useState<AddOnItem[]>(
    addOns.selectedItems || []
  );

  // Sample add-on items
  const availableItems: AddOnItem[] = [
    {
      id: "speedstorm500",
      name: "SpeedStorm 500",
      category: "Cycle",
      price: 234.0,
      image: gear,
      quantity: 1,
    },
    {
      id: "endurepulse",
      name: "EnduroPulse Racer",
      category: "Shoes",
      price: 124.0,
      image: gear,
      quantity: 1,
    },
    {
      id: "creatine",
      name: "Creatine Powder",
      category: "Nutrition",
      price: 234.0,
      image: gear,
      quantity: 1,
    },
    {
      id: "hydropulse",
      name: "HydroPulse",
      category: "Water Bottle",
      price: 234.0,
      image: gear,
      quantity: 1,
    },
  ];

  const isItemSelected = (id: string) => {
    return selectedItems.some((item) => item.id === id);
  };

  const handleAddToCart = (item: AddOnItem) => {
    if (!isItemSelected(item.id)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleRemoveFromCart = (id: string) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };

  const handleContinue = () => {
    // Convert image property to string if it's a StaticImageData
    const normalizedItems = selectedItems.map((item) => ({
      ...item,
      image: typeof item.image === "string" ? item.image : item.image.src,
    }));
    dispatch(setAddOns({ selectedItems: normalizedItems }));
    dispatch(nextStep());

    // Log data to console
    console.log("Add-ons Data:", { selectedItems: normalizedItems });
  };

  const handleBack = () => {
    dispatch(prevStep());
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {availableItems.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-gray-200 px-6 pt-6 py-6"
          >
            <div className="mb-2 py-6 flex justify-center bg-gray-50">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={1000}
                height={1000}
                className="h-40 w-40 object-contain"
              />
            </div>
            <h3 className="text-lg font-medium">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.category}</p>
            <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
              <span>${item.price.toFixed(2)} USD</span>
            </div>
            <div className="mt-4">
              {isItemSelected(item.id) ? (
                <Button
                  variant="outline"
                  className="text-red-500"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="flex bg-primary text-white items-center gap-1 rounded px-10 py-4"
                  onClick={() => handleAddToCart(item)}
                >
                  <span>Add to Cart</span>
                  <GoPlus />
                </Button>
              )}
            </div>
          </div>
        ))}
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
