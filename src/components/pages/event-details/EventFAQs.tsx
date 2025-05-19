"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { T_Event } from "@/types/Events";

export function EventFAQs({ faqs }: T_Event) {
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="mb-8 max-w-4xl mx-auto p-8 border rounded-xl">
      <h2 className="text-3xl font-montserrat font-medium mb-4 text-center">
        Frequently Asked Questions
      </h2>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <div key={faq.id} className="border rounded-md overflow-hidden">
            <button
              className="flex justify-between items-center w-full p-4 text-left"
              onClick={() => toggleFaq(faq.id)}
            >
              <span className="font-medium text-green-700">
                {faq.id}. {faq.question}
              </span>
              {openFaq === faq.id ? (
                <ChevronUp className="h-5 w-5 text-green-700" />
              ) : (
                <ChevronDown className="h-5 w-5 text-green-700" />
              )}
            </button>

            {openFaq === faq.id && (
              <div className="p-4 pt-0 text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
