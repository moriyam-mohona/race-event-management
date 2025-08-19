"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCurrentStep } from "@/redux/features/event/eventSlice";
import CreateGearForm from "./CreateGearPage";
import PublishEvent from "./PublishEventPage";
import { Stepper } from "./Stepper";
import EventCreate from "./EventCreate";

const steps = [
  { id: 1, name: "Create Event" },
  { id: 2, name: "Create Gear" },
  { id: 3, name: "Publish" },
];

const CreateEventPage = () => {
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector((state) => state.event.currentStep);

  const handleStepClick = (stepId: number) => {
    dispatch(setCurrentStep(stepId));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <EventCreate />;
      case 2:
        return <CreateGearForm />;
      case 3:
        return <PublishEvent />;
      default:
        return <EventCreate />;
    }
  };

  return (
    <div className="">
      <Stepper
        currentStep={currentStep}
        steps={steps}
        onStepClick={handleStepClick}
      />
      {renderStep()}
    </div>
  );
};

export default CreateEventPage;
