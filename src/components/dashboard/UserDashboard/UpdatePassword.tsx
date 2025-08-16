/* eslint-disable @typescript-eslint/no-explicit-any */
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";

const validationSchema = z.object({
  oldPassword: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters"),
  newPassword: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters"),
});

const UpdatePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const handleSubmit = async (formData: any, reset: any) => {
    const response = await handleAsyncWithToast(async () => {
      return changePassword(formData);
    });
    if (response?.data?.success) {
      reset();
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-lg p-6">
      <MyFormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(validationSchema)}
        className="space-y-6"
      >
        <MyFormInput name="oldPassword" type="password" label="Old Password" />
        <MyFormInput name="newPassword" type="password" label="New Password" />

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-primary text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:bg-primary/80 transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
        >
          Submit Change
        </button>
      </MyFormWrapper>
    </div>
  );
};

export default UpdatePassword;
