"use client";

import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { Check } from "lucide-react";

export default function StepIndicator() {
  const { currentStep } = useSelector((state: RootState) => state.booking);

  const steps = [
    { id: 1, name: "Select ticket" },
    { id: 2, name: "Personal details" },
    { id: 3, name: "Add-ons" },
    { id: 4, name: "Payment" },
  ];

  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-4xl items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div
              key={step.id}
              className="flex flex-1 flex-col items-center relative"
            >
              {/* Circle */}
              <div
                className={cn(
                  "z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary",
                  isCompleted
                    ? "border-primary bg-primary text-white"
                    : isActive
                    ? "border-primary bg-primary text-white"
                    : "border-gray-300 bg-white text-gray-400"
                )}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>

              {/* Step label */}
              <div
                className={cn(
                  "hidden md:block mt-2 text-sm lg:text-base",
                  isActive ? "text-primary" : "text-gray-400"
                )}
              >
                {step.name}
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-4 mx-auto h-px left-1/2  w-full border-t border-dashed border-red-500",
                    currentStep > step.id ? "border-primary" : "border-gray-300"
                  )}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
