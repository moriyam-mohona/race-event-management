/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Mail } from "lucide-react";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormTextArea from "@/components/ui/MyForm/MyFormTextArea/MyFormTextArea";
import { useCreateContactMutation } from "@/redux/features/contact/contactApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { useRouter } from "next/navigation";
import { ButtonLoading } from "@/components/shared/Loading/ButtonLoading";

const validationSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  address: z
    .string({ required_error: "Address is required" })
    .min(5, "Address must be at least 5 characters"),
  subject: z
    .string({ required_error: "Subject is required" })
    .min(3, "Subject must be at least 3 characters"),
  message: z
    .string({ required_error: "Message is required" })
    .min(10, "Message must be at least 10 characters"),
});

const ContactPage: React.FC = () => {
  const router = useRouter();
  const [createContact, { isLoading }] = useCreateContactMutation();

  const handleSubmit = async (formData: any, reset: any) => {
    const response = await handleAsyncWithToast(async () => {
      return createContact(formData);
    });
    if (response?.data?.success) {
      router.push("/");
      reset();
    }
  };

  return (
    <div className="container mx-auto max-w-[1320px] py-12">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-6 xl:gap-24">
        {/* Contact Information */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold font-montserrat">
            Contact Us
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm xl:text-base">
            Reach out via the form below, or contact us directly via email or
            phone. We look forward to connecting with you and ensuring your next
            race experience is amazing!
          </p>

          <div className="space-y-4 text-sm xl:text-base">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-gray-700">info@dustitrainers.com</span>
            </div>
            {/* Location  */}
            {/* <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-gray-700">
                The Race Shop · New York, NY 10001
              </span>
            </div> */}
            {/* Phone  */}
            {/* <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <span className="text-gray-700">124 214 4521</span>
            </div> */}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl shadow-lg p-5 lg:p-8 xl:p-12 border border-gray-100">
          <MyFormWrapper
            onSubmit={handleSubmit}
            resolver={zodResolver(validationSchema)}
            className="space-y-6"
          >
            <MyFormInput name="name" label="Name" />
            <MyFormInput name="email" label="E-mail" type="email" />
            <MyFormInput name="address" label="Address" />
            <MyFormInput name="subject" label="Subject" />
            <MyFormTextArea name="message" label="Message" />

            <button
              disabled={isLoading}
              className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:scale-105 hover:shadow-xl transform transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {isLoading ? <ButtonLoading /> : "Send Message"}
            </button>
          </MyFormWrapper>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
