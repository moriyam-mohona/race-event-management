"use client";

import { useRef } from "react";
import { Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useCreateSubscriberMutation } from "@/redux/features/subscriber/subscriberApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const emailRef = useRef<HTMLInputElement>(null);

  const [createSubscriber] = useCreateSubscriberMutation();

  const handleSubmit = async () => {
    const email = emailRef.current?.value;
    if (!email) return;

    try {
      const data = {
        email: email,
      };
      await handleAsyncWithToast(() => createSubscriber(data));
      // ✅ Clear the input field after submit
      if (emailRef.current) {
        emailRef.current.value = "";
      }
    } catch (error) {
      console.error("Subscription failed:", error);
    }
  };

  return (
    <footer className="w-full bg-gray-100">
      <div className="container mx-auto py-12 px-4 md:px-6 xl:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-20 items-start">
          {/* Logo and Description */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex flex-col gap-5">
              <Link href="/" className="inline-block">
                <Image
                  src={logo}
                  alt="DustiTrainers Logo"
                  width={1000}
                  height={1000}
                  className="h-24 w-auto"
                />
              </Link>
              <p className="text-sm md:text-base text-gray-700">
                DustiTrainers is a global platform that empowers endurance and
                adventure people by simplifying travel, preparation, and
                community connection—making every race smarter, cheaper, and
                stronger.
              </p>
              <div className="flex space-x-4 mt-4">
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <Linkedin className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <Twitter className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <Facebook className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <Instagram className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>

          {/* Links, Contact, Newsletter */}
          <div className="col-span-1 lg:col-span-3 flex flex-col sm:flex-row flex-wrap gap-10 lg:gap-0 justify-between">
            {/* Quick Links */}
            <div className="w-full sm:w-[45%] lg:w-1/3">
              <h3 className="text-xl md:text-2xl font-medium mb-4">
                Quick Link
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/race-categories"
                    className="text-sm md:text-base text-gray-600 hover:underline hover:text-black"
                  >
                    Race Categories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community"
                    className="text-sm md:text-base text-gray-600 hover:underline hover:text-black"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/register"
                    className="text-sm md:text-base text-gray-600 hover:underline hover:text-black"
                  >
                    Create Vendor Account
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="w-full sm:w-[45%] lg:w-1/3">
              <h3 className="text-xl md:text-2xl font-medium mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-600 text-sm md:text-base">
                  +00 000 000
                </li>
                <li className="text-gray-600 text-sm md:text-base">
                  www.company@gmail.com
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="w-full xl:w-1/3">
              <h3 className="text-xl md:text-2xl font-medium mb-4">
                Don&apos;t miss anything
              </h3>
              <div className="flex flex-col space-y-2">
                <div className="flex w-full">
                  <input
                    type="email"
                    ref={emailRef}
                    placeholder="Enter your email"
                    className="flex-grow px-4 py-2 text-sm bg-gray-200 rounded-l-md focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-gray-800 text-white px-4 py-2 rounded-r-md hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
                <p className="text-gray-500 mt-2 text-sm md:text-base">
                  Powered by (then Match My Search Logo below). By Clicking on
                  the Logo you should be directed.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t-2 border-black/70">
          <p className="text-sm md:text-base text-center text-gray-600">
            © {currentYear} Untitled UI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
