"use client";

import React from "react";
import { Text } from "@/components/atoms";
import { TUser } from "@/redux/features/auth";
import { FollowButton } from "./components";
import { useRouter } from "next/navigation";

type UserCardProps = {
  user: TUser;
  isProfilePage?: boolean;
  isOwner?: boolean;
};

export const UserCard: React.FC<UserCardProps> = ({
  user,
  isProfilePage,
  isOwner = true,
}) => {
  const router = useRouter();
  const handleRedirctProfile = () => {
    router.push(`/profile/${user?._id}`);
  };
  return (
    <div
      className="user-card flex items-center justify-between p-4 bg-white rounded-xl border shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={handleRedirctProfile}
    >
      <div className="flex items-center">
        <img
          src={user.profilePicture || "/default-profile.png"}
          alt={`${user.name}'s profile`}
          className="w-12 h-12 rounded-full mr-4"
        />
        <Text variant="h6" className="font-medium text-gray-900">
          {user.name}
        </Text>
      </div>
      <FollowButton
        userId={user?._id}
        isProfilePage={isProfilePage}
        isOwner={isOwner}
      />
    </div>
  );
};
