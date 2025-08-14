import { Button } from "@/components/ui/button";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { TfiFacebook } from "react-icons/tfi";

const SocialLogin = ({ provider }: { provider: string }) => {
  const handleSocialLogin = (provider: string) => {
    console.log(`Continue with ${provider}`);
  };

  return (
    <div>
      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2 text-base font-normal h-12"
        onClick={() => handleSocialLogin(provider)}
      >
        {provider === "Google" ? (
          <div className="bg-white w-6 h-6 flex items-center justify-center rounded-full cursor-pointer">
            <FcGoogle />
          </div>
        ) : (
          <div className="bg-[#4C6ABE] w-6 h-6 flex items-center justify-center rounded-full cursor-pointer">
            <TfiFacebook className="text-white " />
          </div>
        )}
        Continue with {provider}
      </Button>
    </div>
  );
};

export default SocialLogin;
