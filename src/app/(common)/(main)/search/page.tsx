"use client";

import React, { useState, useEffect } from "react";
import {
  AuthPrompt,
  Text,
  Container,
  LoadingSpinner,
} from "@/components/atoms";
import { useAppSelector } from "@/redux";
import { getCurrentUser } from "@/redux/features/auth";
import { PostFeedSection } from "./components";

const SearchPage: React.FC = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("post");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!currentUser?._id && isMounted) {
    return <AuthPrompt />;
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  if (!isMounted) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-10 mb-20">
      <Text variant="h2" className="text-center">
        PetMate Search
      </Text>
      <Text
        variant="p4"
        style={{ textAlign: "center", maxWidth: 600, margin: "auto" }}
        className="text-black pb-10 pt-2"
      >
        Browse through our collection of pet care tips, stories, and community
        members.
      </Text>

      <div className="flex justify-center mb-6 border-b border-gray-200">
        <div
          onClick={() => handleTabChange("post")}
          className={`px-4 py-2 font-semibold focus:outline-none transition-colors duration-300 cursor-pointer ${
            activeTab === "post"
              ? "text-green-600 border-b-4 border-green-600"
              : " hover:text-gray-800 "
          }`}
        >
          Posts
        </div>
        <div
          onClick={() => handleTabChange("people")}
          className={`px-4 py-2 font-semibold focus:outline-none transition-colors duration-300 cursor-pointer ${
            activeTab === "people"
              ? "text-green-600 border-b-4 border-green-600"
              : " hover:text-gray-800 "
          }`}
        >
          People
        </div>
      </div>

      <Container>
        {activeTab === "post" ? (
          <PostFeedSection isMounted={isMounted} />
        ) : (
          <div></div>
        )}
      </Container>
    </div>
  );
};

export default SearchPage;
