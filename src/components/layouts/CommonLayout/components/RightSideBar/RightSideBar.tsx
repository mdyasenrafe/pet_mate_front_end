"use client";

import { Button, Text } from "@/components/atoms";
import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux";
import { getCurrentUser } from "@/redux/features/auth";

export const RightSideBar = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLoginRedirect = () => {
    router.push("/signin");
  };

  const handlePremiumRedirect = () => {
    router.push("/premium");
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-3 bg-secondary p-3 mt-4 rounded-md !sticky top-4">
      {currentUser?._id ? (
        currentUser.isPremium ? (
          <>
            <Text
              className="text-white font-bold mb-2 text-lg lg:text-sm 2xl:text-lg"
              variant="p3"
            >
              🎉 You’re a Premium Member! 🎉
            </Text>
            <Text variant="p5" color="white">
              Enjoy exclusive pet care tips, personalized advice, and access to
              all premium features. Thank you for being a valued member!
            </Text>
          </>
        ) : (
          <>
            <Text
              className="text-white font-bold mb-2 text-lg lg:text-sm 2xl:text-lg"
              variant="p3"
            >
              Unlock Premium Features
            </Text>
            <Text variant="p5" color="white">
              Access exclusive tips, personalized pet care, and more by
              upgrading to premium.
            </Text>
            <Button
              className="mt-3 w-full !h-[40px] !border !border-white bg-primary-hover"
              customColor="secondary"
              icon={<FaArrowRightLong />}
              iconPosition="end"
              onClick={handlePremiumRedirect}
            >
              <Text className="text-white" variant="p4">
                Upgrade Now
              </Text>
            </Button>
          </>
        )
      ) : (
        <>
          <Text
            className="text-white font-bold mb-2 text-lg lg:text-sm 2xl:text-lg"
            variant="p3"
          >
            Join the Pet Care Community
          </Text>
          <Text variant="p5" color="white">
            Discover expert tips, heartwarming pet stories.
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
        </>
      )}
    </div>
  );
};
