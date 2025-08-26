/* eslint-disable @typescript-eslint/no-explicit-any */
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { Lock } from "lucide-react";
import { ButtonLoading } from "@/components/shared/Loading/ButtonLoading";

const validationSchema = z.object({
  oldPassword: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
  newPassword: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
});

const UpdatePassword = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleSubmit = async (formData: any, reset: any) => {
    const response = await handleAsyncWithToast(async () => {
      return changePassword(formData);
    });
    if (response?.data?.success) {
      reset();
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 mt-10 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-full bg-primary/10">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Update Password
        </h2>
      </div>

      {/* Form */}
      <MyFormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(validationSchema)}
        className="space-y-6"
      >
        <MyFormInput
          name="oldPassword"
          type="password"
          label="Current Password"
          placeHolder="Enter your current password"
        />
        <MyFormInput
          name="newPassword"
          type="password"
          label="New Password"
          placeHolder="Enter a new password"
        />

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-primary text-white font-semibold py-3 px-4 rounded-xl shadow hover:shadow-md hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
        >
          {isLoading ? (
            <ButtonLoading />
          ) : (
            <>
              {" "}
              <Lock className="h-5 w-5" />
              Save New Password
            </>
          )}
        </button>
      </MyFormWrapper>
    </div>
  );
};

export default UpdatePassword;
