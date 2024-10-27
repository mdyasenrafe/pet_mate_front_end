// components/PostFeedSection.tsx
"use client";

import React, { useState } from "react";
import { Text, Button, LoadingSpinner, PostFeed } from "@/components/atoms";
import { useAppSelector } from "@/redux";
import { getCurrentUser } from "@/redux/features/auth";
import { useModal } from "@/hooks";
import { TPost, useGetPostsQuery } from "@/redux/features/post";
import { FilterModal, SearchBar, SortSelect } from "./components";

interface ParamsType {
  name: string;
  value: any;
}

interface TempParamsType {
  searchTerm?: string;
  category?: string;
  monetization?: string;
}

type PostFeedSectionProps = {
  isMounted: boolean;
};

export const PostFeedSection: React.FC<PostFeedSectionProps> = ({
  isMounted,
}) => {
  const currentUser = useAppSelector(getCurrentUser);
  const { isModalOpen, openModal, closeModal } = useModal();

  const [params, setParams] = useState<ParamsType[]>([
    { name: "limit", value: 10 },
    { name: "status", value: "published" },
    { name: "sort", value: "-createdAt" },
  ]);

  const [tempParams, setTempParams] = useState<TempParamsType>({});
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const {
    data: posts,
    isLoading,
    isFetching,
  } = useGetPostsQuery(params, {
    skip: !currentUser?._id,
  });

  const handleSortChange = (value: string) => {
    setParams((prevParams) =>
      prevParams.map((param) =>
        param.name === "sort" ? { ...param, value } : param
      )
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleTempParamsChange = (name: string, value: any) => {
    setTempParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    let newParams = [...params];
    if (tempParams.searchTerm) {
      newParams = newParams.filter((p) => p.name !== "searchTerm");
      newParams.push({ name: "searchTerm", value: tempParams.searchTerm });
    }
    if (tempParams.category) {
      newParams = newParams.filter((p) => p.name !== "category");
      newParams.push({ name: "category", value: tempParams.category });
    }
    if (tempParams.monetization !== undefined) {
      newParams = newParams.filter((p) => p.name !== "monetization");
      newParams.push({ name: "monetization", value: tempParams.monetization });
    }
    setParams(newParams);
    closeModal();
  };

  const handleResetFilters = () => {
    setTempParams({});
    setSearchKeyword("");
    setParams([
      { name: "limit", value: 10 },
      { name: "status", value: "published" },
      { name: "sort", value: "-createdAt" },
    ]);
  };

  const handleSearch = (value: string) => {
    setParams((prevParams) => {
      const filteredParams = prevParams.filter((p) => p.name !== "searchTerm");
      return [...filteredParams, { name: "searchTerm", value }];
    });
  };

  if (!currentUser?._id && isMounted) {
    return (
      <Text variant="p3" className="text-center text-gray-500">
        Please log in to view posts.
      </Text>
    );
  }

  return (
    <div>
      <SearchBar
        searchKeyword={searchKeyword}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
      />

      <div className="flex justify-between mb-10">
        <Button onClick={openModal} customColor="primary">
          Filter
        </Button>
        <SortSelect handleSortChange={handleSortChange} />
      </div>

      {isLoading || isFetching ? (
        <LoadingSpinner />
      ) : (
        <div>
          {posts?.data?.length !== 0 ? (
            <PostFeed posts={posts?.data as TPost[]} />
          ) : (
            <Text variant="p3" className="text-center text-gray-500">
              No posts found matching your criteria.
            </Text>
          )}
        </div>
      )}

      <FilterModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        tempParams={tempParams}
        handleTempParamsChange={handleTempParamsChange}
        handleApplyFilters={handleApplyFilters}
        handleResetFilters={handleResetFilters}
      />
    </div>
  );
};
