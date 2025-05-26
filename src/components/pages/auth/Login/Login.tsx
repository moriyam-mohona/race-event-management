"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useRouter } from "next/navigation";

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login data:", loginData);
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
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
            className="w-full bg-primary hover:bg-primary/80 h-12 text-lg text-white"
          >
            Login
          </Button>

          <div className="relative mt-16">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-gray-500">OR</span>
            </div>
          </div>

          <SocialLogin provider="Google" />
          <SocialLogin provider="Facebook" />
        </form>
      </div>
    </div>
  );
};

export default Login;
