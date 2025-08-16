"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
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

interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface DecodedUser extends JwtPayload {
  role: string; // Add role explicitly
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await handleAsyncWithToast(async () => {
      return login(loginData);
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

      router.push("/");
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
        <div className="w-full max-w-3xl bg-white rounded-lg border p-8">
          <h1 className="text-2xl font-semibold mb-10">Log In</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label htmlFor="email" className="block font-medium">
                E-mail
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={loginData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-4">
              <label htmlFor="password" className="block font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={loginData.password}
                  onChange={handleInputChange}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-red-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/80 h-12 text-lg text-white cursor-pointer"
            >
              {isLoading ? <ButtonLoading /> : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
