"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";

interface LoginData {
  password: string;
  confirmPassword: string;
}

const ResetpasswordPage = () => {
  const [resetPassword] = useResetPasswordMutation();

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loginData, setLoginData] = useState<LoginData>({
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { password, confirmPassword } = loginData;

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    const data = {
      password: loginData.password,
    };

    const response = await handleAsyncWithToast(async () => {
      return resetPassword(data);
    });

    if (response?.data?.success) {
      router.push("/auth/login");
    }
    console.log("Password:", password);
    // Proceed with password reset logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-lg bg-white rounded-lg border p-8">
        <h1 className="text-2xl text-center font-semibold mb-2">
          Reset Password
        </h1>
        <p className="text-center mb-8">Please enter your new password.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="space-y-4">
            <label htmlFor="confirmPassword" className="block font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={loginData.confirmPassword}
                onChange={handleInputChange}
                required
                className="pr-10"
              />
              <p>
                {passwordError && (
                  <span className="text-red-700">{passwordError}</span>
                )}
              </p>
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/80 h-10 text-sm md:text-base text-white"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetpasswordPage;
