"use client";

import { useGetUsersQuery } from "@/redux/features/users";
import React, { useState } from "react";
import { SearchBar } from "../PostFeedSection/components";
import { LoadingSpinner, Text, UserCard } from "@/components/atoms";
import { TUser } from "@/redux/features/auth";

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = (value: string) => {
    setParams((prevParams) => {
      const filteredParams = prevParams.filter((p) => p.name !== "searchTerm");
      return [...filteredParams, { name: "searchTerm", value }];
    });
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
              <UserCard key={user._id} user={user} />
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
