"use client";

import type React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { RootState } from "@/redux/store";
import {
  prevStep,
  resetBooking,
  setPayment,
} from "@/redux/features/booking/bookingSlice";
import SuccessModal from "@/components/shared/SuccessModal";

export default function Payment() {
  const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { ticket, personalDetails, addOns } = useSelector(
    (state: RootState) => state.booking
  );

  const [formData, setFormData] = useState({
    paymentMethod: "card",
    cardName: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
    agreeToTerms: false,
    country: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.cardName) newErrors.cardName = "Card name is required";
    if (!formData.cardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    if (!formData.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = "You must agree to the terms of service";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(setPayment(formData));

      // Log all booking data to console
      console.log("Complete Booking Data:", {
        ticket,
        personalDetails,
        addOns,
        payment: formData,
      });
      dispatch(resetBooking());
      setShowSuccessModal(true);
    }
  };

  const handleBack = () => {
    dispatch(prevStep());
  };

  //   const calculateTotal = () => {
  //     let total = ticket.price || 0;

  //     if (addOns.selectedItems) {
  //       addOns.selectedItems.forEach((item) => {
  //         total += item.price;
  //       });
  //     }

  //     return total;
  //   };

  return (
    <div className="bg-white">
      <div className="mb-6">
        <h2 className="text-3xl font-medium text-gray-700">Payment Method</h2>

        <div className="mt-4">
          <RadioGroup
            value={formData.paymentMethod}
            onValueChange={(value) =>
              handleSelectChange("paymentMethod", value)
            }
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-6 w-6 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      {/* Payment Details */}
      <div className="mt-20">
        <h3 className="mb-4 text-xl text-gray-800 font-medium">
          Payment Details
        </h3>
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="mb-6">
            <div className="mb-4">
              <Input
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                className="mt-1"
                placeholder="Enter Name on Card"
              />
              {errors.cardName && (
                <p className="mt-1 text-xs text-red-500">{errors.cardName}</p>
              )}
            </div>

            <div className="mb-4">
              <Input
                id="cardNumber"
                name="cardNumber"
                type="number"
                value={formData.cardNumber}
                onChange={handleChange}
                className="mt-1"
                placeholder="Card Number"
              />
              {errors.cardNumber && (
                <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>
              )}
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Input
                  id="cvv"
                  name="cvv"
                  type="number"
                  value={formData.cvv}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="CVV Code"
                />
                {errors.cvv && (
                  <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>
                )}
              </div>
              <div>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Expiration Date"
                />
                {errors.expiryDate && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.expiryDate}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4 flex items-center space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                By clicking Confirm Payment I agree to the company term of
                service.
              </Label>
            </div>
            {errors.agreeToTerms && (
              <p className="mt-1 text-xs text-red-500">{errors.agreeToTerms}</p>
            )}
          </div>
          <div className="mb-6">
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1"
              placeholder="Country"
            />

            {errors.country && (
              <p className="mt-1 text-xs text-red-500">{errors.country}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={handleBack} className="border px-10 py-2 rounded">
          Back
        </button>
        <button
          className="bg-primary hover:bg-primary/90 text-white px-10 py-2 rounded"
          onClick={handleSubmit}
        >
          Pay securely
        </button>
      </div>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}
