"use client";

import { AuthPrompt, Container, Text, Button, Feed } from "@/components/atoms";
import { useAppSelector } from "@/redux";
import { getCurrentUser } from "@/redux/features/auth";
import { useGetPostsQuery } from "@/redux/features/post/post.api";
import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { Modal } from "@/components/Modal";
import { useModal } from "@/hooks";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { TPost } from "@/redux/features/post/post.type";

const { Search } = Input;

const SearchPage = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const [isMounted, setIsMounted] = useState(false);
  const { isModalOpen, openModal, closeModal } = useModal();

  const [params, setParams] = useState<{ name: string; value: any }[]>([
    { name: "limit", value: 10 },
    { name: "status", value: "published" },
    { name: "sort", value: "-createdAt" },
  ]);

  const [tempParams, setTempParams] = useState<{
    searchTerm?: string;
    category?: string;
    monetization?: string;
  }>({});

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    data: posts,
    error: getPostsError,
    isLoading: getPostsLoading,
    isFetching,
  } = useGetPostsQuery(params, {
    skip: !currentUser?._id ? true : false,
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
    return <AuthPrompt />;
  }

  return (
    <Container>
      <div className="mt-10 mb-20">
        <Text variant="h2" className="text-center">
          PetMate Search
        </Text>
        <Text
          variant="p4"
          style={{ textAlign: "center", maxWidth: 600, margin: "auto" }}
          className="text-black pb-10 pt-2"
        >
          Browse through our collection of pet care tips and stories. Use the
          filter and sorting options to find exactly what you're looking for.
        </Text>

        <div className="mb-6">
          <Search
            placeholder="Search by title or content"
            enterButton
            onSearch={handleSearch}
            value={searchKeyword}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex justify-between mb-10">
          <Button onClick={openModal} customColor="primary">
            Filter
          </Button>

          <Select
            defaultValue="Sort By"
            style={{ width: 200 }}
            onChange={handleSortChange}
            options={[
              { label: "Most Recent", value: "-createdAt" },
              { label: "Most Upvoted", value: "-upvoteCount" },
              { label: "Most Commented", value: "-commentCount" },
            ]}
          />
        </div>

        {getPostsLoading || !isMounted || isFetching ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {(posts?.data?.length as number) > 0 ? (
              <>
                {posts?.data?.map((post) => (
                  <Feed key={post._id} post={post} />
                ))}
              </>
            ) : (
              <Text variant="p3" className="text-center text-gray-500">
                No posts found matching your criteria.
              </Text>
            )}
          </div>
        )}

        <Modal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          title="Filter Options"
        >
          <div>
            <Text variant="p3" className="mb-4">
              Select filter options to refine your search.
            </Text>

            <label className="block text-sm mb-2">Category</label>
            <Select
              value={tempParams.category}
              defaultValue="Category"
              style={{ width: "100%", marginBottom: "20px" }}
              onChange={(value) => handleTempParamsChange("category", value)}
              options={[
                { label: "Tips", value: "tip" },
                { label: "Stories", value: "story" },
              ]}
            />

            <label className="block text-sm mb-2">Monetization</label>
            <Select
              value={tempParams.monetization}
              defaultValue="Monetization"
              style={{ width: "100%" }}
              onChange={(value) =>
                handleTempParamsChange("monetization", value)
              }
              options={[
                { label: "Monetized", value: true },
                { label: "Non-monetized", value: false },
              ]}
            />
          </div>

          <Button
            onClick={handleApplyFilters}
            customColor="primary"
            className="mt-4"
          >
            Apply Filters
          </Button>

          <Button
            onClick={handleResetFilters}
            customColor="secondary"
            className="mt-4"
          >
            Reset Filters
          </Button>
        </Modal>
      </div>
    </Container>
  );
};

export default SearchPage;
