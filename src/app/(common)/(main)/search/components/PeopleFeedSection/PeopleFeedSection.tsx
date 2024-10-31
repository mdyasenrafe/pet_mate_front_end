"use client";

import { useGetUsersQuery } from "@/redux/features/users";
import React, { useState, useEffect } from "react";
import { SearchBar } from "../PostFeedSection/components";
import { LoadingSpinner, Text, UserCard } from "@/components/atoms";
import { TUser } from "@/redux/features/auth";
import InfiniteScroll from "react-infinite-scroll-component";

type ParamsType = {
  name: string;
  value: any;
};

export const PeopleFeedSection = () => {
  const [params, setParams] = useState<ParamsType[]>([
    { name: "limit", value: 10 },
    { name: "sort", value: "-createdAt" },
  ]);

  const [page, setPage] = useState(1);
  const [allUsers, setAllUsers] = useState<TUser[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const {
    data: usersData,
    isLoading,
    isFetching,
  } = useGetUsersQuery([...params, { name: "page", value: page }], {
    skip: !page,
  });

  useEffect(() => {
    if (usersData?.data) {
      setAllUsers((prevUsers) => [...prevUsers, ...usersData.data]);
      if (usersData.data.length === 0 || usersData.data.length < 10) {
        setHasMore(false);
      }
    }
  }, [usersData]);

  const fetchMoreUsers = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = (value: string) => {
    setParams((prevParams) => {
      const filteredParams = prevParams.filter((p) => p.name !== "searchTerm");
      return [...filteredParams, { name: "searchTerm", value }];
    });
    setPage(1);
    setAllUsers([]);
    setHasMore(true);
  };

  return (
    <div>
      <SearchBar
        searchKeyword={searchKeyword}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
        placeholder="Search by people name"
      />

      <InfiniteScroll
        dataLength={allUsers.length}
        next={fetchMoreUsers}
        hasMore={hasMore}
        loader={<LoadingSpinner />}
        endMessage={<></>}
      >
        <div className="user-list mt-4 space-y-4">
          {allUsers.length ? (
            allUsers.map((user: TUser) => (
              <UserCard key={user._id} user={user} />
            ))
          ) : (
            <Text variant="p3" className="text-center text-gray-500">
              No users found matching your criteria.
            </Text>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};
