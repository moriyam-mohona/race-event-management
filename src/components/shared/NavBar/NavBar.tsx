/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ProgressProvider } from "@bprogress/next/app";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import Swal from "sweetalert2";
import {
  useLazyGenerateOnBoardingLinkQuery,
  useLazyIsStripeAccountReadyQuery,
} from "@/redux/features/event/eventApi";
import { useRouter } from "next/navigation";
import { Modal, Button, Typography } from "antd";
import { FiAlertTriangle } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { usePathname } from "next/navigation";

const { Text, Paragraph } = Typography;

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);
  const role = user?.role;
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  // Navigation links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Race Categories", href: "/race-categories" },
    { name: "Contact", href: "/contact-us" },
    { name: "Community", href: "/community" },
    { name: "Chat", href: "/chat" },
  ];

  const profileHref =
    role === "USER"
      ? "/dashboard/user/profile"
      : role === "VENDOR"
      ? "/dashboard/vendor/profile"
      : role === "SUPER_ADMIN"
      ? "/dashboard/admin/profile"
      : "/auth/login";

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log out",
    });

    if (result.isConfirmed) {
      try {
        // Redux logout
        await dispatch(logout());

        Swal.fire({
          title: "Logged out!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Logout failed:", error);
        Swal.fire({
          title: "Error!",
          text: "Logout failed. Please try again.",
          icon: "error",
        });
      }
    }
  };

  // other API mutation (the one you want to call if not ready)

  const [triggerIsStripeAccountReady, { isLoading }] =
    useLazyIsStripeAccountReadyQuery();
  const [triggerOnBoardingApi, { isLoading: onboardingLoading }] =
    useLazyGenerateOnBoardingLinkQuery();

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
    <ProgressProvider color="#0B7077">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white lg:bg-white/40  backdrop-blur-md py-4 px-4 md:px-8 shadow-lg">
        <div className="container max-w-[1320px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 xl:gap-10">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                alt="logo"
                height={1000}
                width={1000}
                className="h-18 w-24"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-3 lg:space-x-5 xl:space-x-8">
              {/* {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-sm lg:text-base font-medium xl:font-normal hover:font-semibold"
                >
                  {link.name}
                </Link>
              ))} */}

              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`text-sm lg:text-base font-medium xl:font-normal py-1 rounded-md transition-colors
      ${
        pathname === link.href
          ? "text-primary font-bold"
          : "hover:font-semibold hover:text-primary"
      }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          {/* Mobile Menu Button (shifted to the left) */}
          <button
            className="lg:hidden "
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <div className="space-y-1.5">
                <RxHamburgerMenu className="h-6 w-6" />
              </div>
            )}
          </button>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-24 left-0 right-0 bg-white z-20 lg:hidden shadow-lg"
              >
                <div className="flex flex-col p-4 space-y-4">
                  {/* {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="hover:font-semibold hover:text-primary transition-colors py-2 border-b"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))} */}

                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className={`text-base font-normal px-3 py-1 rounded-md transition-colors
      ${
        pathname === link.href
          ? "text-primary font-bold"
          : "hover:font-semibold hover:text-primary"
      }`}
                    >
                      {link.name}
                    </Link>
                  ))}

                  {user ? (
                    <>
                      <div className="flex items-center justify-between gap-4 w-full">
                        <Link
                          href="/auth/login"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors text-base font-medium"
                        >
                          <FaUser size={18} />
                          Profile
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-base font-medium"
                        >
                          <IoIosLogOut size={18} />
                          Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between gap-5 space-y-2 ">
                        <Link
                          href="/auth/login"
                          className="bg-transparent border border-primary text-primary hover:bg-primary/80 hover:text-white py-2 px-4 rounded-full text-center transition-colors w-full"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Login Now
                        </Link>
                        <Link
                          href="/auth/register"
                          className="bg-transparent border border-primary text-primary hover:bg-primary/80 hover:text-white py-2 px-4 rounded-full text-center transition-colors w-full"
                        >
                          Sign up
                        </Link>
                      </div>
                    </>
                  )}
                  {user?.role === "VENDOR" && (
                    <Button
                      loading={isLoading || onboardingLoading}
                      onClick={handleCreateEvent}
                      className="!bg-primary hover:!bg-transparent hover:!border hover:!border-primary hover:!text-primary hover:!font-semibold !text-white !py-5 !px-5 !rounded-full !text-center !transition-colors !cursor-pointer"
                    >
                      Create Event
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search and Login */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href={profileHref}
                  className="px-5 py-2 rounded-full font-medium bg-gray-100/40 text-gray-700 hover:bg-gray-200 hover:text-primary transition-colors duration-200 flex items-center gap-2"
                >
                  <FaUser />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-full font-medium bg-red-50/30 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors duration-200 flex items-center gap-2"
                >
                  <IoIosLogOut size={20} />
                  Logout
                </button>
              </div>
            ) : (
              <>
                {" "}
                <Link
                  href="/auth/login"
                  className="text-base hover:text-primary hover:font-semibold hover:underline border-r-2 pr-3 border-black "
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="text-base hover:text-primary hover:font-semibold hover:underline"
                >
                  Sign up
                </Link>
              </>
            )}
            {user?.role === "VENDOR" && (
              <Button
                loading={isLoading || onboardingLoading}
                onClick={handleCreateEvent}
                className="!border-none !text-base !bg-primary hover:!bg-primary/80 !text-white !py-5 !px-5 !ml-3 !rounded-full !text-center !transition-colors !cursor-pointer"
              >
                Create Event
              </Button>
            )}
          </div>
        </div>

        {/* Go To stripe acc  */}
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
      </nav>
    </ProgressProvider>
  );
};

export default Navbar;
