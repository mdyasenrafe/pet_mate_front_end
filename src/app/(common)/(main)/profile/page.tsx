"use client";
import { AuthPrompt, Button, LoadingSpinner, Text } from "@/components/atoms";
import { useAppSelector } from "@/redux";
import { getCurrentUser } from "@/redux/features/auth";
import { formatRelativeTime } from "@/utils";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";

const page = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!currentUser?._id && isMounted) {
    return <AuthPrompt />;
  }

  if (!isMounted) {
    return <LoadingSpinner />;
  }

  const tabs = [
    { label: "My Posts", value: "posts" },
    { label: "Followers", value: "followers" },
    { label: "Deleted Posts", value: "deleted" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "posts":
        return <Text>My Posts Content</Text>;
      case "followers":
        return <Text>Followers Content</Text>;
      case "deleted":
        return <Text>Deleted Posts Content</Text>;
      default:
        return <Text>My Posts Content</Text>;
    }
  };

  return (
    <section className="mx-0 lg:mx-6 mt-10">
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center">
          <div className="h-[100px] w-[100px]">
            <img
              src={currentUser?.profilePicture}
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="ml-2">
            <Text variant="h3">{currentUser?.name}</Text>
            {currentUser?.createdAt && (
              <Text variant="p3">
                Joined {formatRelativeTime(currentUser?.createdAt as string)}
              </Text>
            )}
          </div>
        </div>
        <Button
          icon={<FiEdit />}
          iconPosition="start"
          customColor="primary"
          className="h-[40px]"
        >
          Edit profile
        </Button>
      </div>
      <hr />

      <div className="mt-4 flex space-x-4">
        {tabs.map((tab) => (
          <div
            key={tab.value}
            className={`px-4 py-2 ${
              activeTab === tab.value ? "border-b-2 border-primary" : ""
            } cursor-pointer`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">{renderTabContent()}</div>
    </section>
  );
};

export default page;
