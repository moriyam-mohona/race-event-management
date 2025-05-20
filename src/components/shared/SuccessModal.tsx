import React from "react";
import { CheckCircle } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SuccessModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-lg text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800">
          Payment Successful
        </h2>
        <p className="mt-2 text-gray-600">Your booking is confirmed!</p>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
