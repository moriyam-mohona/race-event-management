/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { RootState } from "@/redux/store";
import { GoPlus } from "react-icons/go";
import { Modal } from "antd";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  nextStep,
  prevStep,
  setAddOns,
} from "@/redux/features/booking/bookingSlice";
import { useParams } from "next/navigation";
import { useGetSingleEventQuery } from "@/redux/features/event/eventApi";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormSelect from "@/components/ui/MyForm/MyFormSelect/MyFormSelect";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import { AddedGearInfo, AddOnItem } from "@/types/Common";
import MyFormTextArea from "@/components/ui/MyForm/MyFormTextArea/MyFormTextArea";
import Loading from "@/components/shared/Loading/Loading";
import { RiDeleteBin6Line } from "react-icons/ri";

// Schema for gear selection form
const gearSelectionSchema = z.object({
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  size: z.string().min(1, "Size is required"),
  color: z.string().min(1, "Color is required"),
  message: z.string().optional(),
});

export default function AddOns() {
  const dispatch = useDispatch();
  const { addOns } = useSelector((state: RootState) => state.booking);

  const params = useParams();
  const id = params.id;
  const {
    data: detailEventData,
    isLoading,
    isFetching,
  } = useGetSingleEventQuery(id);

  const [availableItems, setAvailableItems] = useState<AddOnItem[]>([]);
  const [addedGearInfo, setAddedGearInfo] = useState<AddedGearInfo[]>(
    addOns.addedGearInfo || []
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [currentGear, setCurrentGear] = useState<any>(null);

  useEffect(() => {
    if (detailEventData?.data?.Gear) {
      const mappedItems = detailEventData.data.Gear.map((gear: any) => ({
        id: gear.id,
        name: gear.gearTitle,
        category: gear.categoryName,
        price: gear.price,
        image: gear.gearImages?.[0] || "/placeholder.svg",
        quantity: 1,
        sizes: gear.sizes || [],
        colors: gear.colors || [],
      }));
      setAvailableItems(mappedItems);
    }
  }, [detailEventData]);

  const handleAddToCart = (item: any) => {
    setCurrentGear(item);
    setModalOpen(true);
  };

  const handleModalSubmit = (formData: any, reset: any) => {
    if (!currentGear) return;

    const newGear: AddedGearInfo = {
      gearId: currentGear.id,
      quantity: Number(formData.quantity),
      size: formData.size,
      color: formData.color,
      message: formData.message || "",
      price: currentGear?.price,
      title: currentGear?.name,
    };

    setAddedGearInfo([...addedGearInfo, newGear]);
    setModalOpen(false);
    reset();
  };

  const handleContinue = () => {
    dispatch(
      setAddOns({
        addedGearInfo,
      })
    );
    dispatch(nextStep());
    console.log("Add-ons Data:", { addedGearInfo });
  };

  const handleBack = () => {
    dispatch(prevStep());
  };

  // Remove a gear item
  const removeGearItem = (index: number) => {
    const updatedGearInfo = [...addedGearInfo];
    updatedGearInfo.splice(index, 1);
    setAddedGearInfo(updatedGearInfo);
  };

  if (!detailEventData?.data?.Gear || detailEventData.data.Gear.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Gears</h2>
        <p className="text-gray-500">No Gears available for this event.</p>
        <div className="mt-8 flex justify-between">
          <button
            onClick={handleBack}
            className="border px-10 py-2 rounded cursor-pointer"
          >
            Back
          </button>
          <button
            className="bg-primary hover:bg-primary/90 text-white px-10 py-2 rounded cursor-pointer transition"
            onClick={handleContinue}
          >
            {addedGearInfo.length > 0 ? "Next" : "Skip & Continue"}
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || isFetching) return <Loading />;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      {/* Gear Cards */}
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {availableItems.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-gray-200 px-6 pt-6 py-6"
          >
            <div className="mb-2 py-6 flex justify-center bg-gray-50">
              <Image
                src={item.image}
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
              <Button
                variant="outline"
                className="flex bg-primary text-white items-center gap-1 rounded px-10 py-4 cursor-pointer"
                onClick={() => handleAddToCart(item)}
              >
                <span>Add Item</span>
                <GoPlus />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Added Gear List */}
      {addedGearInfo.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-medium mb-4">Added Gear Items</h3>
          <ul className="space-y-2">
            {addedGearInfo.map((gear, idx) => {
              const gearInfo = availableItems.find(
                (item) => item.id === gear.gearId
              );
              return (
                <li
                  key={idx}
                  className="border p-4 rounded flex justify-between items-center"
                >
                  <div className="flex-1">
                    <span className="font-medium">{gearInfo?.name}</span> - Qty:{" "}
                    {gear.quantity} - Size: {gear.size} - Color:{" "}
                    <span
                      className="inline-block w-4 h-4 rounded-full mr-1 border border-gray-300"
                      style={{ backgroundColor: gear.color }}
                    ></span>
                    {gear.color}
                    {gear.message && (
                      <div className="text-sm text-gray-500 mt-1">
                        Message: {gear.message}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeGearItem(idx)}
                    className="text-red-500 hover:text-red-700 ml-4 cursor-pointer"
                  >
                    <RiDeleteBin6Line className="text-xl" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Ant Design Modal */}
      <Modal
        title={currentGear ? `Add ${currentGear.name}` : "Add Gear"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={400}
      >
        <MyFormWrapper
          onSubmit={handleModalSubmit}
          resolver={zodResolver(gearSelectionSchema)}
          // defaultValues={{
          //   quantity: 1,
          //   size: "",
          //   color: "",
          //   message: "I must need this product",
          // }}
          className="space-y-4"
        >
          <MyFormInput name="quantity" type="number" label="Quantity" />

          {/* Dynamic Size Select */}
          <MyFormSelect
            name="size"
            label="Size"
            options={
              currentGear?.sizes?.map((size: string) => ({
                value: size,
                label: size,
              })) || []
            }
            placeHolder="Select a size"
          />

          {/* Dynamic Color Select with color preview */}
          <div>
            <label className="block text-sm font-medium mb-1">Color</label>
            <MyFormSelect
              name="color"
              options={
                currentGear?.colors?.map((color: string) => ({
                  value: color,
                  label: (
                    <div className="flex items-center">
                      <span
                        className="inline-block w-4 h-4 rounded-full mr-2 border border-gray-300"
                        style={{ backgroundColor: color }}
                      ></span>
                      {color}
                    </div>
                  ),
                })) || []
              }
              placeHolder="Select a color"
            />
          </div>

          <MyFormTextArea name="message" label="Message (Optional)" />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 border rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded cursor-pointer"
            >
              Add
            </button>
          </div>
        </MyFormWrapper>
      </Modal>

      <div className="mt-8 flex justify-between">
        <button
          onClick={handleBack}
          className="border px-10 py-2 rounded cursor-pointer"
        >
          Back
        </button>
        <button
          className="bg-primary hover:bg-primary/90 text-white px-10 py-2 rounded cursor-pointer transition"
          onClick={handleContinue}
        >
          {addedGearInfo.length > 0 ? "Next" : "Skip & Continue"}
        </button>
      </div>
    </div>
  );
}
