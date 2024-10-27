"use client";

import React from "react";
import { Text } from "@/components/atoms";
import { TUser } from "@/redux/features/auth";
import { FollowButton } from "./components";

type UserCardProps = {
  user: TUser;
  isProfilePage?: boolean;
};

export const UserCard: React.FC<UserCardProps> = ({ user, isProfilePage }) => {
  return (
    <div className="user-card flex items-center justify-between p-4 bg-white rounded-xl border shadow hover:shadow-lg transition-shadow duration-200">
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
      <FollowButton userId={user?._id} isProfilePage={isProfilePage} />
    </div>
  );
};
