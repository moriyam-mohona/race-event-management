/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";

const validationSchema = z
  .object({
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string({
        required_error: "Confirm Password is required",
      })
      .min(8, "Confirm Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // show error on confirmPassword field
  });

const ResetpasswordPage = () => {
  const [resetPassword] = useResetPasswordMutation();
  const router = useRouter();

  const handleSubmit = async (formData: any, reset: any) => {
    const data = {
      password: formData.password,
    };

    const response = await handleAsyncWithToast(async () => {
      return resetPassword(data);
    });

    if (response?.data?.success) {
      router.push("/auth/login");
      reset();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-lg bg-white rounded-lg border p-8">
        <h1 className="text-2xl text-center font-semibold mb-2">
          Reset Password
        </h1>
        <p className="text-center mb-8">Please enter your new password.</p>

        <MyFormWrapper
          onSubmit={handleSubmit}
          resolver={zodResolver(validationSchema)}
          className="space-y-6"
        >
          <MyFormInput name="password" type="password" label="Password" />
          <MyFormInput
            name="confirmPassword"
            type="password"
            label="Confirm Password"
          />
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/80 h-10 text-sm md:text-base text-white cursor-pointer"
          >
            Submit
          </Button>
        </MyFormWrapper>
      </div>
    </div>
  );
};

export default ResetpasswordPage;
