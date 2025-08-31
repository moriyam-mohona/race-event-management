/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AllEventsByVendor from "@/components/dashboard/VendorDashboard/allEventsByVendor/AllEventsByVendor";
import {
  useLazyGenerateOnBoardingLinkQuery,
  useLazyIsStripeAccountReadyQuery,
} from "@/redux/features/event/eventApi";
import WithRole from "@/role-wrapper/WithRole";
import Link from "next/link";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { IoShareSocialOutline } from "react-icons/io5";
import { Modal, Button, Typography } from "antd";
import { FiAlertTriangle } from "react-icons/fi";
import { useRouter } from "next/navigation";

const { Text, Paragraph } = Typography;

const AllEvents = () => {
  const router = useRouter();
  const [triggerIsStripeAccountReady] = useLazyIsStripeAccountReadyQuery();
  const [triggerOnBoardingApi] = useLazyGenerateOnBoardingLinkQuery();

  const [modalVisible, setModalVisible] = useState(false);
  const [onboardingLink, setOnboardingLink] = useState("");

  const handleCreateEvent = async () => {
    try {
      const response = await triggerIsStripeAccountReady(undefined).unwrap();

      if (response.success) {
        // Account ready → navigate directly
        router.push("/dashboard/vendor/create-event");
      }
    } catch (err: any) {
      // Stripe not ready → call onboarding API
      try {
        const onboardingRes = await triggerOnBoardingApi(undefined).unwrap();

        if (onboardingRes.success && onboardingRes.data?.accountLink) {
          // Save the link and show modal
          setOnboardingLink(onboardingRes.data.accountLink);
          setModalVisible(true);
        }
      } catch (onboardErr) {
        console.error("Error generating onboarding link:", onboardErr);
      }
    }
  };

  const handleGoToStripe = () => {
    if (onboardingLink) {
      window.location.href = onboardingLink;
    }
  };

  return (
    <WithRole allowedRoles={["VENDOR"]}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end gap-4">
          <Link
            href="/dashboard/vendor/create-share-event"
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-base font-medium
             bg-gray-100 border border-gray-300 text-gray-800 shadow-sm
             hover:bg-gray-200 hover:shadow-md hover:scale-[1.02]
             transition-all duration-200"
          >
            <IoShareSocialOutline className="w-5 h-5" />
            Share Event
          </Link>

          <button
            onClick={handleCreateEvent}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-base font-medium
             bg-[#6BCB77] text-white shadow-sm
             hover:bg-[#5bb566] hover:shadow-md hover:scale-[1.02]
             transition-all duration-200"
          >
            <FiPlus className="w-5 h-5" />
            Create Event
          </button>
        </div>
      </div>
      <AllEventsByVendor />
      <Modal
        title={
          <div className="flex items-center gap-2">
            <FiAlertTriangle className="text-yellow-500 text-xl" />
            <span>Complete Your Stripe Account</span>
          </div>
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button
            key="cancel"
            onClick={() => setModalVisible(false)}
            type="default"
            style={{ borderRadius: "8px" }}
          >
            Cancel
          </Button>,
          <Button
            key="go"
            onClick={handleGoToStripe}
            type="primary"
            style={{
              borderRadius: "8px",
              backgroundColor: "#6772e5",
              borderColor: "#6772e5",
            }}
          >
            Go to Stripe
          </Button>,
        ]}
      >
        <Paragraph>
          <Text strong>
            You need to complete your Stripe account before creating an event.
          </Text>
        </Paragraph>
        <Paragraph>
          Click the{" "}
          <Text strong style={{ color: "#6772e5" }}>
            Go to Stripe
          </Text>{" "}
          button below to finish the setup securely.
        </Paragraph>
      </Modal>
    </WithRole>
  );
};

export default AllEvents;
