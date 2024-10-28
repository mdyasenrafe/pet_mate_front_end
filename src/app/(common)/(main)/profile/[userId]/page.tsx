"use client";

import { AuthPrompt, Button, LoadingSpinner, Text } from "@/components/atoms";
import { formatRelativeTime } from "@/utils";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import {
  DeletedPosts,
  FollowersList,
  FollowingList,
  MyPosts,
} from "./components";
import { useMeQuery } from "@/redux/features/users";

type Props = {
  params: {
    userId: string;
  };
};

const ProfilePage: React.FC<Props> = ({ params }) => {
  const { data, isLoading } = useMeQuery(params?.userId as string);
  const currentUser = data?.data;

  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!currentUser?._id && isMounted && !isLoading) {
    return <AuthPrompt />;
  }

  if (!isMounted || isLoading) {
    return <LoadingSpinner />;
  }

  const tabs = [
    { label: "My Posts", value: "posts" },
    { label: "Followers", value: "followers" },
    { label: "Following", value: "following" },
    { label: "Deleted Posts", value: "deleted" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "posts":
        return <MyPosts />;
      case "followers":
        return <FollowersList followers={currentUser?.followers || []} />;
      case "following":
        return <FollowingList following={currentUser?.following || []} />;
      case "deleted":
        return <DeletedPosts />;
      default:
        return <MyPosts />;
    }
  };

  return (
    <section className="mx-0 lg:mx-6 mt-10">
      {/* Profile Header */}
      <div className="flex justify-between items-center pb-4">
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
        <Button
          icon={<FiEdit />}
          iconPosition="start"
          customColor="primary"
          className="h-10 px-4 text-sm"
        >
          Edit Profile
        </Button>
      </div>
      <hr />

      {/* Tabs Navigation */}
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

      <div className="mt-6 p-4 bg-white shadow rounded-lg">
        {renderTabContent()}
      </div>
    </section>
  );
};

export default ProfilePage;
