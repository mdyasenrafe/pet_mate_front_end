import React, { useEffect, useState } from "react";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/redux/features/users";
import { Button } from "@/components/atoms";
import { toast } from "sonner";
import { useAppSelector } from "@/redux";
import { getCurrentUser } from "@/redux/features/auth";
import { useModal } from "@/hooks/useModal";
import { UnfollowModal } from "./components";

type FollowButtonProps = {
  userId: string;
  isProfilePage?: boolean;
  isOwner?: boolean;
  username?: string;
};

export const FollowButton: React.FC<FollowButtonProps> = ({
  userId,
  isProfilePage = false,
  isOwner = true,
  username = "this user",
}) => {
  const currentUser = useAppSelector(getCurrentUser);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollower, setIsFollower] = useState(false);

  const [followUser, { isLoading: isFollowLoading }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: isUnfollowLoading }] =
    useUnfollowUserMutation();
  const { isModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    if (currentUser?._id) {
      const isAlreadyFollowing = currentUser.following.some(
        (user) => user._id === userId
      );
      const isAlreadyFollower = currentUser.followers.some(
        (user) => user._id === userId
      );
      setIsFollowing(isAlreadyFollowing);
      setIsFollower(isAlreadyFollower);
    }
  }, [currentUser, userId]);

  const handleFollowClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (isFollowing || isProfilePage) {
        openModal();
      } else {
        await followUser(userId).unwrap();
        toast.success("Successfully followed the user!");
        setIsFollowing(true);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          `Failed to ${
            isFollowing ? "unfollow" : "follow"
          } the user. Please try again.`
      );
    }
  };

  const confirmUnfollow = async () => {
    try {
      await unfollowUser(userId).unwrap();
      toast.success("Successfully unfollowed the user!");
      setIsFollowing(false);
      closeModal();
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to unfollow the user. Please try again."
      );
    }
  };

  return (
    isOwner && (
      <>
        <Button
          customColor="primary"
          className="px-5 py-2 rounded-full text-sm font-semibold bg-purple-600 text-white hover:bg-purple-700 hover:scale-105 transition-all duration-150"
          onClick={handleFollowClick}
          disabled={isFollowLoading || isUnfollowLoading}
          loading={isFollowLoading || isUnfollowLoading}
        >
          {isProfilePage && isFollowing
            ? "Remove"
            : isFollowing
            ? "Following"
            : isProfilePage && isFollower
            ? "Remove"
            : isFollower
            ? "Follow Back"
            : "Follow"}
        </Button>

        <UnfollowModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          onConfirmUnfollow={confirmUnfollow}
          username={username}
        />
      </>
    )
  );
};
