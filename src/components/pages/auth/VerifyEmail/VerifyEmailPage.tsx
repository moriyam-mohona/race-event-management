"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { useOtpMutation } from "@/redux/features/auth/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { setUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { useAppDispatch } from "@/redux/hooks";
import { JwtPayload } from "jwt-decode";
import { ButtonLoading } from "@/components/shared/Loading/ButtonLoading";

interface DecodedUser extends JwtPayload {
  role: string;
}

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const page = searchParams.get("page");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [verifyOtp, { isLoading }] = useOtpMutation();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  // const router = useRouter();

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newCode = [...code];

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newCode[i] = pastedData[i];
      }
    }

    setCode(newCode);

    const nextEmptyIndex = newCode.findIndex((digit) => digit === "");
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join("");
    if (verificationCode.length === 6) {
      console.log("Verification code:", verificationCode);
      const data = {
        email: email,
        otp: verificationCode,
      };
      const response = await handleAsyncWithToast(async () => {
        return verifyOtp(data);
      });
      if (response?.data?.success) {
        console.log(response);
        const user = (await verifyToken(
          response?.data?.data?.accessToken
        )) as DecodedUser;
        console.log(user);
        await dispatch(
          setUser({
            user: user,
            access_token: response?.data?.data?.accessToken,
            refresh_token: response?.data?.data?.refreshToken,
          })
        );
        // reset();
        if (page === "register") {
          router.push("/");
        } else {
          router.push("/auth/reset-password");
        }
      }

      // router.push("/auth/login");
    } else {
      console.log("Please enter all 6 digits");
    }
  };

  // const handleResendCode = () => {
  //   console.log("Resend code clicked");
  //   // Trigger resend logic here
  // };

  return (
    <div className="flex flex-col justify-center items-center gap-4 min-h-screen p-4">
      <Link href="/">
        <Image
          src={logo}
          alt="Logo"
          width={100}
          height={100}
          className="mr-4 flex items-center"
        />
      </Link>
      <div>
        <div className="w-full max-w-lg bg-white rounded-lg border p-8">
          <h1 className="text-2xl font-semibold text-center mb-5">
            Verify your email address
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-10">
            We have sent you an email with your verification code. Please
            don&apos;t share your code with anyone.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="code" className="block font-medium">
                  Verification Code
                </label>
                {/* <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-sm font-medium text-red-700 hover:underline"
                  >
                    Resend Code
                  </button> */}
              </div>
              <div className="flex justify-center space-x-3">
                {code.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    aria-label={`Digit ${index + 1}`}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  />
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/80 h-12 text-sm md:text-base text-white cursor-pointer"
            >
              {isLoading ? <ButtonLoading /> : "Submit"}
            </Button>

            <div className="relative mt-5 mb-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
            </div>
            <p className="text-sm text-center">
              You may{" "}
              <Link href="/contact-us" className="text-red-700 underline">
                contact us
              </Link>{" "}
              for help restoring access to your account.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
