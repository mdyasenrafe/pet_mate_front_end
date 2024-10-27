"use client";

import { useGetUsersQuery } from "@/redux/features/users";
import React, { useState } from "react";
import { SearchBar } from "../PostFeedSection/components";
import { LoadingSpinner, Text } from "@/components/atoms";

type ParamsType = {
  name: string;
  value: any;
};

type TempParamsType = {
  searchTerm?: string;
  category?: string;
  monetization?: string;
};

export const PeopleFeedSection = () => {
  const [params, setParams] = useState<ParamsType[]>([
    { name: "limit", value: 10 },
    { name: "sort", value: "-createdAt" },
  ]);

  const [tempParams, setTempParams] = useState<TempParamsType>({});
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
      {" "}
      <SearchBar
        searchKeyword={searchKeyword}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
        placeholder={"Search by people name"}
      />
      {isLoading || isFetching ? (
        <LoadingSpinner />
      ) : (
        <div>
          {users?.data?.length !== 0 ? (
            <div>
              {users?.data?.map((user) => (
                <div>
                  <Text>{user?.name}</Text>
                </div>
              ))}
            </div>
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
