"use client";

import { Check } from "lucide-react";

interface StepperProps {
  currentStep: number;
  steps: {
    id: number;
    name: string;
  }[];
  onStepClick?: (stepId: number) => void;
}

export function Stepper({ currentStep, steps, onStepClick }: StepperProps) {
  return (
    <div className="w-full py-4 mt-10 mb-20">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <button
                onClick={() =>
                  onStepClick && currentStep >= step.id && onStepClick(step.id)
                }
                disabled={currentStep < step.id}
                className="focus:outline-none"
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep > step.id
                      ? "bg-primary text-white"
                      : currentStep === step.id
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-500"
                  } ${
                    currentStep >= step.id
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check size={16} />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
              </button>
              <span className="ml-2 hidden sm:block">{step.name}</span>
            </div>
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="flex-1 w-24 lg:w-60 mt-5 border-t border-dashed border-gray-300" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
