"use client";

import React, { useState, useEffect } from "react";
import { Text, Button, LoadingSpinner, PostFeed } from "@/components/atoms";
import { useAppSelector } from "@/redux";
import { getCurrentUser } from "@/redux/features/auth";
import { useModal } from "@/hooks";
import { TPost, useGetPostsQuery } from "@/redux/features/post";
import { FilterModal, SearchBar, SortSelect } from "./components";
import InfiniteScroll from "react-infinite-scroll-component";

type ParamsType = {
  name: string;
  value: any;
};

type TempParamsType = {
  searchTerm?: string;
  category?: string;
  monetization?: string;
};

type PostFeedSectionProps = {
  isAdmin?: boolean;
};

export const PostFeedSection: React.FC<PostFeedSectionProps> = ({
  isAdmin,
}) => {
  const currentUser = useAppSelector(getCurrentUser);
  const { isModalOpen, openModal, closeModal } = useModal();

  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<TPost[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [params, setParams] = useState<ParamsType[]>([
    { name: "limit", value: 5 },
    { name: "status", value: "published" },
    { name: "sort", value: "-createdAt" },
  ]);

  const [tempParams, setTempParams] = useState<TempParamsType>({});
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const {
    data: posts,
    isLoading,
    isFetching,
  } = useGetPostsQuery([...params, { name: "page", value: page }], {
    skip: !currentUser?._id,
  });

  useEffect(() => {
    if (posts?.data) {
      setAllPosts((prevPosts) => [...prevPosts, ...posts.data]);
      if (posts.data.length === 0 || posts.data.length < 5) {
        setHasMore(false);
      }
    }
  }, [posts]);

  const fetchMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSortChange = (value: string) => {
    setParams((prevParams) =>
      prevParams.map((param) =>
        param.name === "sort" ? { ...param, value } : param
      )
    );
    setPage(1);
    setAllPosts([]);
    setHasMore(true);
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
    setPage(1);
    setAllPosts([]);
    setHasMore(true);
    closeModal();
  };

  const handleResetFilters = () => {
    setTempParams({});
    setSearchKeyword("");
    setParams([
      { name: "limit", value: 5 },
      { name: "status", value: "published" },
      { name: "sort", value: "-createdAt" },
    ]);
    setPage(1);
    setAllPosts([]);
    setHasMore(true);
  };

  const handleSearch = (value: string) => {
    setParams((prevParams) => {
      const filteredParams = prevParams.filter((p) => p.name !== "searchTerm");
      return [...filteredParams, { name: "searchTerm", value }];
    });
    setPage(1);
    setAllPosts([]);
    setHasMore(true);
  };

  return (
    <div>
      <SearchBar
        searchKeyword={searchKeyword}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
        placeholder="Search by title or content"
      />

      <div className="flex justify-between mb-10">
        <Button onClick={openModal} customColor="primary">
          Filter
        </Button>
        <SortSelect handleSortChange={handleSortChange} />
      </div>

      <InfiniteScroll
        dataLength={allPosts.length}
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={<LoadingSpinner />}
        endMessage={<></>}
      >
        <div>
          {allPosts.length !== 0 ? (
            <PostFeed posts={allPosts} isAdmin={isAdmin} />
          ) : (
            !isLoading && (
              <Text variant="p3" className="text-center text-gray-500">
                No posts found matching your criteria.
              </Text>
            )
          )}
        </div>
      </InfiniteScroll>

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
