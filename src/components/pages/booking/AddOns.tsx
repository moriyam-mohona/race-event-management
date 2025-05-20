"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { RootState } from "@/redux/store";
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
  image: string;
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
      image: "/placeholder.svg?height=100&width=100",
      quantity: 1,
    },
    {
      id: "endurepulse",
      name: "EnduroPulse Racer",
      category: "Shoes",
      price: 124.0,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 1,
    },
    {
      id: "creatine",
      name: "Creatine Powder",
      category: "Nutrition",
      price: 234.0,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 1,
    },
    {
      id: "hydropulse",
      name: "HydroPulse",
      category: "Water Bottle",
      price: 234.0,
      image: "/placeholder.svg?height=100&width=100",
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
    dispatch(setAddOns({ selectedItems }));
    dispatch(nextStep());

    // Log data to console
    console.log("Add-ons Data:", { selectedItems });
  };

  const handleBack = () => {
    dispatch(prevStep());
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {availableItems.map((item) => (
          <div key={item.id} className="rounded-lg border border-gray-200 p-4">
            <div className="mb-2 flex justify-center">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={100}
                height={100}
                className="h-24 w-24 object-contain"
              />
            </div>
            <h3 className="text-lg font-medium">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.category}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-medium">${item.price.toFixed(2)} USD</span>
              {isItemSelected(item.id) ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => handleAddToCart(item)}
                >
                  <span>Add to Cart</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              )}
            </div>
          </div>
        ))}
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
