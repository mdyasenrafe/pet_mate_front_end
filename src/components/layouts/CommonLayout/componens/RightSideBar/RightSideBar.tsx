"use client";

import { Button, Text } from "@/components/atoms";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export const RightSideBar = () => {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/signin");
  };

  return (
    <div className="ml-3 bg-secondary p-3 mt-4 rounded-md !sticky top-4">
      <Text
        className="text-white font-bold mb-2 text-lg lg:text-sm 2xl:text-lg"
        variant="p3"
      >
        Join the Pet Care Community
      </Text>
      <Text variant="p5" color="white">
        Discover expert tips, heartwarming pet stories
      </Text>
      <Button
        className="mt-3 w-full !h-[40px] !border !border-white bg-primary-hover"
        customColor="secondary"
        icon={<FaArrowRightLong />}
        iconPosition="end"
        onClick={handleLoginRedirect}
      >
        <Text className="text-white" variant="p4">
          Get Started
        </Text>
      </Button>
    </div>
  );
};
