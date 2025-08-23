"use client";

import { ButtonLoading } from "@/components/shared/Loading/ButtonLoading";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";

const StripePaymentCard = ({
  handleNextStep,
  isLoading,
}: {
  handleNextStep: (paymentMethodId: string) => Promise<void>;
  isLoading: boolean;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardHolderName, setCardHolderName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);

  console.log(paymentMethodId);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe is not initialized.");
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) {
      setError("Card details not entered.");
      return;
    }

    // Create a PaymentMethod
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: { name: cardHolderName },
    });

    if (error) {
      setError(error.message as string);
    } else {
      if (paymentMethod && paymentMethod.id) {
        setPaymentMethodId(paymentMethod?.id);
        if (paymentMethod?.id) {
          handleNextStep(paymentMethod.id);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto">
      <div className="mb-6">
        {/* <label className="block font-medium mb-2">Cardholder Name</label> */}
        <input
          type="text"
          value={cardHolderName}
          defaultValue={"Mahdi Hasan"}
          onChange={(e) => setCardHolderName(e.target.value)}
          className="w-full bg-white p-3 rounded-md border"
          placeholder="Enter Cardholder Name"
          required
        />
      </div>

      <div className="mb-6">
        {/* <label className="block font-medium mb-2">Card Number</label> */}
        <div className="bg-white p-3 rounded-md border">
          <CardNumberElement className="w-full" />
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-1/2">
          {/* <label className="block font-medium mb-2">Expiry Date</label> */}
          <div className="bg-white p-3 rounded-md border">
            <CardExpiryElement className="w-full" />
          </div>
        </div>

        <div className="w-1/2">
          {/* <label className="block font-medium mb-2">CVC</label> */}
          <div className="bg-white p-3 rounded-md border">
            <CardCvcElement className="w-full" />
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 mt-2 ">{error}</p>}
      <button
        className="w-full bg-primary !text-white !py-3 rounded-xl hover:bg-primary/80 transition-colors !mt-7 cursor-pointer"
        type="submit"
      >
        {isLoading ? <ButtonLoading /> : `Pay`}
      </button>
    </form>
  );
};

export default StripePaymentCard;
