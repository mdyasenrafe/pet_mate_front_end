import React from "react";
import { TUser } from "@/redux/features/auth";
import { UserCard } from "@/components/atoms";

type FollowingListProps = {
  following: TUser[];
  isOwner: boolean;
};

export const FollowingList: React.FC<FollowingListProps> = ({
  following,
  isOwner,
}) => {
  return (
    <div className="space-y-4">
      {following.length > 0 ? (
        following.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            isProfilePage={true}
            isOwner={isOwner}
          />
        ))
      ) : (
        <p className="text-gray-500">No following users found.</p>
      )}
    </div>
  );
};
