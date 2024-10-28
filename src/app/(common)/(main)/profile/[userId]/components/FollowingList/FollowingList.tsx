import React from "react";
import { TUser } from "@/redux/features/auth";
import { UserCard } from "@/components/atoms";

type FollowingListProps = {
  following: TUser[];
};

export const FollowingList: React.FC<FollowingListProps> = ({ following }) => {
  return (
    <div className="space-y-4">
      {following.length > 0 ? (
        following.map((user) => (
          <UserCard key={user._id} user={user} isProfilePage={true} />
        ))
      ) : (
        <p className="text-gray-500">No following users found.</p>
      )}
    </div>
  );
};
