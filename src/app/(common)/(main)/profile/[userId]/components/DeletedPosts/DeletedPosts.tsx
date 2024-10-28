"use client";
import { LoadingSpinner, PostFeed } from "@/components/atoms";
import { TPost, useGetMyPostsQuery } from "@/redux/features/post";
import React from "react";

export const DeletedPosts = () => {
  const {
    data: MyPosts,
    isLoading,
    isFetching,
  } = useGetMyPostsQuery([{ name: "status", value: "deleted" }]);

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }
  return (
    <div className="mb-10">
      <PostFeed posts={MyPosts?.data as TPost[]} isAuthor={true} />
    </div>
  );
};
