/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { verifyToken } from "@/utils/verifyToken";
import { JwtPayload } from "jwt-decode";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { ButtonLoading } from "@/components/shared/Loading/ButtonLoading";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";

const validationSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters"),
});

interface DecodedUser extends JwtPayload {
  role: string; // Add role explicitly
}

const Login = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (formData: any, reset: any) => {
    const response = await handleAsyncWithToast(async () => {
      return login(formData);
    });
    if (response?.data?.success) {
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

      router.push("/");
      reset();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="flex flex-col items-center space-y-8 w-full">
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={1000}
            height={1000}
            className="h-18 w-24"
          />
        </Link>{" "}
        <div className="w-full max-w-3xl bg-white rounded-2xl border p-8">
          <h1 className="text-2xl font-semibold mb-10">Log In</h1>

          <MyFormWrapper
            onSubmit={handleSubmit}
            resolver={zodResolver(validationSchema)}
            className="space-y-6"
          >
            <div className="rounded-lg space-y-6">
              <MyFormInput name="email" type="email" label="Email" />
              <MyFormInput name="password" type="password" label="Password" />
              <div className="text-end text-sm">
                <Link
                  href="/auth/forgot-password"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forget Password
                </Link>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2.5 rounded-md hover:bg-primary/80 transition-colors duration-200 cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? <ButtonLoading /> : "Log In"}
              </button>

              <div className="text-center text-sm">
                Don’t have an account?
                <Link
                  href="/auth/register"
                  className="text-blue-600 hover:text-blue-700 font-medium ps-1"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </MyFormWrapper>
        </div>
      </div>
    </div>
  );
};

export default Login;
