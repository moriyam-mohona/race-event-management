"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";

interface ForgotPasswordData {
  email: string;
}

const ForgotPasswordPage = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const router = useRouter();
  const [emailData, setEmailData] = useState<ForgotPasswordData>({
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email", emailData);
    const response = await handleAsyncWithToast(async () => {
      return forgotPassword(emailData);
    });
    if (response?.data?.success) {
      router.push(
        `/auth/verify-email?email=${encodeURIComponent(
          emailData.email
        )}&page=forgetpass`
      );
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center min-h-screen p-4">
      <Link href="/">
        <Image
          src={logo}
          alt="logo"
          width={1000}
          height={1000}
          className="h-18 w-24"
        />
      </Link>{" "}
      <div className="w-full max-w-lg bg-white rounded-lg border p-8">
        <h1 className="text-center mb-4 text-2xl font-semibold">
          Enter Your Email
        </h1>
        <p className="text-center mb-10">
          Enter your email address and we will send you a link to reset your
          password
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input
              id="email"
              name="email"
              type="email"
              value={emailData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/80 h-10 text-sm md:text-base text-white cursor-pointer"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
