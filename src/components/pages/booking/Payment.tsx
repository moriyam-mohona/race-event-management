"use client";

import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentCard from "../payment/StripePaymentCard";
import { RootState } from "@/redux/store";
import {
  prevStep,
  resetBooking,
  setPayment,
} from "@/redux/features/booking/bookingSlice";
import SuccessModal from "@/components/shared/SuccessModal";
import { FaStripe } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "@/components/ui/label";
import { useCreateBookingMutation } from "@/redux/features/booking/bookingApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
// import Payment from "./Payment";
// import { useCreatePaymentWithInvoiceIDMutation } from "@/redux/features/payment/paymentApi";

const Payment = () => {
  const params = useParams();
  const id = params.id;
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const dispatch = useDispatch();
  //   const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { ticket, personalDetails, addOns } = useSelector(
    (state: RootState) => state.booking
  );

  const [createBooking, { isLoading }] = useCreateBookingMutation();

  if (!stripeKey) {
    console.error(
      "Stripe publishable key is missing. Check your environment variables."
    );
  }
  const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

  const handleNextStep = async (paymentMethodId: string) => {
    const stripeId = {
      payment_method_id: paymentMethodId,
    };
    console.log("Stripe ID:", stripeId);

    if (stripeId) {
      dispatch(setPayment({ stripeId: paymentMethodId }));

      // Log all booking data to console
      dispatch(resetBooking());
      setShowSuccessModal(true);
      //       router.push("/");
    }

    const body = {
      eventId: id,
      totalPersonCount: ticket.quantity,
      gender: personalDetails.gender,
      fullName: personalDetails.fullName,
      dateOfBirth: personalDetails.dateOfBirth,
      nationality: personalDetails.nationality,
      email: personalDetails.email,
      continent: personalDetails.continent,
      country: personalDetails.country,
      region: personalDetails.region,
      zipCode: personalDetails.zipCode,
      address: personalDetails.address,
      phoneNumber: personalDetails.phoneNumber,
      emergencyContact: personalDetails.emergencyContact,
      paymentMethodId: stripeId?.payment_method_id,
      addedGearInfo: addOns.addedGearInfo,
    };

    console.log(body);

    const response = await handleAsyncWithToast(async () => {
      return createBooking(body);
    });

    console.log(response);

    // if (response?.data?.success) {
    //   router.push("/user/payment-history");
    // }
  };

  return (
    <div className="container mx-auto max-w-3xl mt-20">
      <div className="mb-6">
        <button onClick={() => dispatch(prevStep())}>Back</button>
        <h2 className="text-2xl md:text-3xl font-medium text-gray-700">
          Payment Method
        </h2>
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="card" className="flex items-center">
              <FaStripe className="text-4xl bg-[#72C197] text-white rounded-full p-1" />
            </Label>
          </div>
        </div>
      </div>{" "}
      <div className="mx-auto md:px-10 py-10 bg-gray-100 rounded-2xl">
        {/* stripe setup */}
        <div>
          <Elements stripe={stripePromise}>
            <StripePaymentCard
              handleNextStep={handleNextStep}
              isLoading={isLoading}
            />
          </Elements>
        </div>
      </div>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
};

export default Payment;
