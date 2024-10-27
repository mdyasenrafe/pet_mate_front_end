import React from "react";
import { TUser } from "@/redux/features/auth";
import { UserCard } from "@/components/atoms";

type FollowersListProps = {
  followers: TUser[];
};

export const FollowersList: React.FC<FollowersListProps> = ({ followers }) => {
  return (
    <div className="space-y-4">
      {followers.length > 0 ? (
        followers.map((user) => (
          <UserCard key={user._id} user={user} isProfilePage={true} />
        ))
      ) : (
        <p className="text-gray-500">No followers found.</p>
      )}
    </div>
  );
};
