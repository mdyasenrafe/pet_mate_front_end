import React from "react";
import { useFollowUserMutation } from "@/redux/features/users";
import { Button } from "@/components/atoms";
import { toast } from "sonner";
import { useAppSelector } from "@/redux";
import { getCurrentUser } from "@/redux/features/auth";
export const FollowButton: React.FC = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const [followUser, { isLoading }] = useFollowUserMutation();

  const handleFollowClick = async () => {
    try {
      await followUser(currentUser?._id as string).unwrap();
      toast.success("Successfully followed the user!");
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to follow the user. Please try again."
      );
    }
  };

  return (
    <Button
      customColor="primary"
      className="px-5 py-2 rounded-full text-sm font-semibold bg-purple-600 text-white hover:bg-purple-700 hover:scale-105 transition-all duration-150"
      onClick={handleFollowClick}
      disabled={isLoading}
      loading={isLoading}
    >
      Follow
    </Button>
  );
};
