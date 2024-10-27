"use client";

import {
  useGetUsersQuery,
  useFollowUserMutation,
} from "@/redux/features/users";
import React, { useState } from "react";
import { SearchBar } from "../PostFeedSection/components";
import { LoadingSpinner, Text, Button } from "@/components/atoms";
import { TUser } from "@/redux/features/auth";
import { toast } from "sonner"; // Import toast from sonner

type ParamsType = {
  name: string;
  value: any;
};

export const PeopleFeedSection = () => {
  const [params, setParams] = useState<ParamsType[]>([
    { name: "limit", value: 10 },
    { name: "sort", value: "-createdAt" },
  ]);

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const { data: users, isLoading, isFetching } = useGetUsersQuery(params);

  // Use the followUser mutation hook
  const [followUser] = useFollowUserMutation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = (value: string) => {
    setParams((prevParams) => {
      const filteredParams = prevParams.filter((p) => p.name !== "searchTerm");
      return [...filteredParams, { name: "searchTerm", value }];
    });
  };

  // Follow button click handler with toast notifications
  const handleFollowClick = async (userId: string) => {
    try {
      await followUser(userId).unwrap();
      toast.success("Successfully followed the user!");
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to follow the user. Please try again."
      );
    }
  };

  return (
    <div>
      <SearchBar
        searchKeyword={searchKeyword}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
        placeholder={"Search by people name"}
      />
      {isLoading || isFetching ? (
        <LoadingSpinner />
      ) : (
        <div className="user-list mt-4 space-y-4">
          {users?.data?.length ? (
            users?.data?.map((user: TUser) => (
              <div
                key={user._id}
                className="user-card flex items-center justify-between p-4 bg-white rounded-xl border shadow hover:shadow-lg transition-shadow duration-200"
              >
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
                <Button
                  customColor="primary"
                  className="px-5 py-2 rounded-full text-sm font-semibold bg-purple-600 text-white hover:bg-purple-700 hover:scale-105 transition-all duration-150"
                  onClick={() => handleFollowClick(user._id)}
                >
                  Follow
                </Button>
              </div>
            ))
          ) : (
            <Text variant="p3" className="text-center text-gray-500">
              No users found matching your criteria.
            </Text>
          )}
        </div>
      )}
    </div>
  );
};
