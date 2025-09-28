"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SelectTicket from "./SelectTicket";
import PersonalDetails from "./PersonalDetails";
import AddOns from "./AddOns";
import { RootState } from "@/redux/store";
import StepIndicator from "./StepIndicator";
import OrderSummary from "./OrderSummary";
import { GrLocation } from "react-icons/gr";
import { useParams } from "next/navigation";
import { useGetSingleEventQuery } from "@/redux/features/event/eventApi";
import Payment from "./Payment";
import Loading from "@/components/shared/Loading/Loading";

export default function BookingFlow() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const {
    data: detailEventData,
    isLoading,
    isFetching,
  } = useGetSingleEventQuery({ id });

  const { currentStep } = useSelector((state: RootState) => state.booking);
  const dispatch = useDispatch();

  // Reset booking when component unmounts
  useEffect(() => {
    return () => {};
  }, [dispatch]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <SelectTicket />;
      case 2:
        return <PersonalDetails />;
      case 3:
        return <AddOns />;
      case 4:
        return <Payment />;
      default:
        return <SelectTicket />;
    }
  };

  if (isLoading || isFetching) return <Loading />;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6">
      <div className="mb-14 text-center space-y-2 lg:space-y-4">
        <p className="text-lg font-medium text-gray-700">Registration for</p>
        <h1 className="text-2xl md:text-3xl font-semibold font-montserrat">
          {detailEventData?.data?.title}
        </h1>
        <div className="text-base md:text-lg font-medium text-gray-700 mt-1 flex items-center justify-center">
          <GrLocation className="mr-1 font-bold text-secondary text-2xl" />
          {detailEventData?.data?.location?.address}
        </div>
      </div>

      <StepIndicator />

      <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">{renderStep()}</div>
        <div className="md:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
