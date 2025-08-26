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
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const role = user?.role;
  const dispatch = useAppDispatch();

  // Navigation links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Race Categories", href: "/race-categories" },
    { name: "Contact", href: "/contact-us" },
    { name: "Community", href: "/community" },
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

  return (
    <ProgressProvider color="#0B7077">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white lg:bg-white/40  backdrop-blur-md py-4 px-4 md:px-8">
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
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-sm lg:text-base font-medium xl:font-normal hover:font-semibold"
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
                className="absolute top-24 left-0 right-0 bg-white z-20 lg:hidden"
              >
                <div className="flex flex-col p-4 space-y-4">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="hover:font-semibold hover:text-primary transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}

                  {user ? (
                    <>
                      <div className="flex items-center justify-between gap-5 space-y-2">
                        <Link
                          href="/auth/login"
                          className="bg-transparent border border-primary text-primary hover:bg-primary/80 hover:text-white py-2 px-4 rounded-full text-center transition-colors w-full"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="bg-transparent border border-primary text-primary hover:bg-primary/80 hover:text-white py-2 px-4 rounded-full text-center transition-colors w-full"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between gap-5 space-y-2">
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
                    <Link
                      href="/dashboard/vendor/create-event"
                      className="bg-primary hover:bg-transparent hover:border hover:border-primary hover:text-primary hover:font-semibold text-white py-2 px-5 rounded-full text-center transition-colors"
                    >
                      Create Event
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search and Login */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <>
                {" "}
                <Link
                  href={profileHref}
                  className="text-base hover:text-primary hover:font-semibold hover:underline border-r-2 pr-3 border-black"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-base hover:text-primary hover:font-semibold hover:underline  pr-3 border-black cursor-pointer"
                >
                  Logout
                </button>
              </>
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
              <Link
                href="/dashboard/vendor/create-event"
                className="text-base bg-primary hover:bg-primary/80 text-white py-3 px-5 ml-3 rounded-full text-center transition-colors"
              >
                Create Event
              </Link>
            )}
          </div>
        </div>
      </nav>
    </ProgressProvider>
  );
};

export default Navbar;
