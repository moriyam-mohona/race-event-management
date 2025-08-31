"use client";

import React, { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useLazyGenerateOnBoardingLinkQuery } from "@/redux/features/event/eventApi";

const CreateStripeAccountFailed = () => {
  const router = useRouter();
  const [triggerOnBoardingApi] = useLazyGenerateOnBoardingLinkQuery();
  const [loading, setLoading] = useState(false);

  const handleGoHome = () => {
    router.push("/"); // navigate to home
  };

  const handleGoToStripe = async () => {
    setLoading(true);
    try {
      const onboardingRes = await triggerOnBoardingApi(undefined).unwrap();
      if (onboardingRes.success && onboardingRes.data?.accountLink) {
        window.location.href = onboardingRes.data.accountLink;
      }
    } catch (err) {
      console.error("Error generating onboarding link:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <FiAlertTriangle className="text-yellow-500 text-6xl" />
        </div>
        <h1 className="text-2xl font-bold mb-2">
          Stripe Account Not Completed
        </h1>
        <p className="text-gray-600 mb-6">
          You need to complete your Stripe account before creating an event.
          Please finish the setup to continue.
        </p>

        <div className="flex justify-center gap-4">
          <Button onClick={handleGoHome} type="default" size="large">
            Go Home
          </Button>
          <Button
            onClick={handleGoToStripe}
            type="primary"
            size="large"
            loading={loading}
            style={{ backgroundColor: "#6772e5", borderColor: "#6772e5" }}
          >
            Go to Stripe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateStripeAccountFailed;
