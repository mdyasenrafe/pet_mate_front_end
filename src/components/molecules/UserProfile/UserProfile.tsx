"use client";

import React, { useEffect, useState } from "react";
import { AuthPrompt, Button, LoadingSpinner, Text } from "@/components/atoms";
import { formatRelativeTime } from "@/utils";
import { FiEdit, FiLock } from "react-icons/fi";
import {
  DeletedPosts,
  FollowersList,
  FollowingList,
  MyPosts,
  EditProfileModal,
  ChangePasswordModal,
} from "./components";
import { useMeQuery } from "@/redux/features/users";
import { useAppSelector } from "@/redux";
import { TUser, getCurrentUser } from "@/redux/features/auth";
import { useModal } from "@/hooks";

type UserProfileProps = {
  userId: string;
};

export const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const {
    isModalOpen: isChangePasswordOpen,
    openModal: openChangePassword,
    closeModal: closeChangePassword,
  } = useModal();
  const { data, isLoading, isFetching } = useMeQuery(userId);
  const currentUser = data?.data;
  const loggedInUser = useAppSelector(getCurrentUser);

  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsOwner(loggedInUser?._id === currentUser?._id);
  }, [loggedInUser, currentUser]);

  if (!currentUser?._id && isMounted && !isLoading) {
    return <AuthPrompt />;
  }

  if (!isMounted || isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  const tabs = [
    { label: "My Posts", value: "posts" },
    { label: "Followers", value: "followers" },
    { label: "Following", value: "following" },
    ...(isOwner ? [{ label: "Deleted Posts", value: "deleted" }] : []),
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "posts":
        return <MyPosts userId={userId} isOwner={isOwner} />;
      case "followers":
        return (
          <FollowersList
            followers={currentUser?.followers || []}
            isOwner={isOwner}
          />
        );
      case "following":
        return (
          <FollowingList
            following={currentUser?.following || []}
            isOwner={isOwner}
          />
        );
      case "deleted":
        return <DeletedPosts userId={userId} />;
      default:
        return <MyPosts userId={userId} isOwner={isOwner} />;
    }
  };

  return (
    <section className="mx-0 lg:mx-6 mt-10">
      <div className="lg:flex justify-between items-center pb-4">
        <div className="flex items-center space-x-4">
          <div className="h-24 w-24 rounded-full overflow-hidden">
            <img
              src={currentUser?.profilePicture || "/default-profile.png"}
              alt={`${currentUser?.name}'s profile`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <Text variant="h3" className="font-semibold text-gray-800">
              {currentUser?.name}
            </Text>
            {currentUser?.createdAt && (
              <Text variant="p3" className="text-gray-500">
                Joined {formatRelativeTime(currentUser?.createdAt as string)}
              </Text>
            )}
          </div>
        </div>
        {isOwner && (
          <div className="flex space-x-2 mt-4 lg:mt-0">
            <Button
              icon={<FiEdit />}
              iconPosition="start"
              customColor="primary"
              className="h-10 px-4 text-sm"
              onClick={() => openModal()}
            >
              Edit Profile
            </Button>
            <Button
              icon={<FiLock />}
              iconPosition="start"
              customColor="secondary"
              className="h-10 px-4 text-sm"
              onClick={() => openChangePassword()}
            >
              Change Password
            </Button>
          </div>
        )}
      </div>
      <hr />

      <div className="mt-4 flex space-x-4 border-b border-gray-200">
        {tabs.map((tab) => (
          <div
            key={tab.value}
            className={`px-4 py-2 font-medium text-sm cursor-pointer ${
              activeTab === tab.value
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <EditProfileModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        loggedInUser={currentUser as TUser}
      />

      <ChangePasswordModal
        isModalOpen={isChangePasswordOpen}
        closeModal={closeChangePassword}
      />

      <div className="mt-6 p-4 bg-white shadow rounded-lg">
        {renderTabContent()}
      </div>
    </section>
  );
};
