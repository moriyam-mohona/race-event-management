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
import { Checkbox } from "@/components/ui/checkbox";
import { RootState } from "@/redux/store";
import {
  prevStep,
  resetBooking,
  setPayment,
} from "@/redux/features/booking/bookingSlice";

export default function Payment() {
  const dispatch = useDispatch();
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
      alert("Payment successful! Your booking is confirmed.");
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
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-6">
        <h2 className="text-xl font-medium">Payment Method</h2>
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

      <div className="mb-6">
        <h3 className="mb-4 text-lg font-medium">Payment Details</h3>

        <div className="mb-4">
          <Label htmlFor="cardName">Card Name or Card</Label>
          <Input
            id="cardName"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            className="mt-1"
            placeholder="John Doe"
          />
          {errors.cardName && (
            <p className="mt-1 text-xs text-red-500">{errors.cardName}</p>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className="mt-1"
            placeholder="1234 5678 9012 3456"
          />
          {errors.cardNumber && (
            <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>
          )}
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="cvv">CVV Code</Label>
            <Input
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              className="mt-1"
              placeholder="123"
            />
            {errors.cvv && (
              <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>
            )}
          </div>
          <div>
            <Label htmlFor="expiryDate">Expiration Date</Label>
            <Input
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="mt-1"
              placeholder="MM/YY"
            />
            {errors.expiryDate && (
              <p className="mt-1 text-xs text-red-500">{errors.expiryDate}</p>
            )}
          </div>
        </div>

        <div className="mb-4 flex items-center space-x-2">
          <Checkbox
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onCheckedChange={handleCheckboxChange}
          />
          <Label htmlFor="agreeToTerms" className="text-sm">
            By clicking Confirm Payment I agree to the company term of service.
          </Label>
        </div>
        {errors.agreeToTerms && (
          <p className="mt-1 text-xs text-red-500">{errors.agreeToTerms}</p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="mb-4 text-lg font-medium">Country</h3>
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

      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Pay securely
        </Button>
      </div>
    </div>
  );
}
