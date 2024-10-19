"use client";

import { FaLock } from "react-icons/fa";
import { Text, Button } from "@/components/atoms";
import { useRouter } from "next/navigation";
import React from "react";
import { usePathname } from "next/navigation";

export const AuthPrompt = () => {
  const router = useRouter();
  const pathName = usePathname();

  const handleLoginRedirect = () => {
    router.push(`/signin?redirect=${pathName}`);
  };

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex flex-col items-center justify-center p-4 border lg:w-3/4 mx-auto mt-5 rounded-md ">
        <div className="bg-white p-4 rounded-full mb-6 shadow-md">
          <FaLock className="text-6xl text-primary" />
        </div>

        <Text className="text-primary mb-4 text-center" variant="h2">
          Log In Required
        </Text>

        <Text className="text-center text-gray-700 mb-8 max-w-md" variant="p5">
          You need to be logged in to access the Create Post feature. Join our
          community to share your pet care tips and heartwarming stories!
        </Text>

        <Button
          customColor="primary"
          className="w-full max-w-xs !h-[50px] px-6 rounded-full text-lg shadow-lg hover:bg-primary-dark"
          onClick={handleLoginRedirect}
        >
          <Text className="text-white font-semibold" variant="p3">
            Log In
          </Text>
        </Button>
      </div>
    </div>
  );
};
