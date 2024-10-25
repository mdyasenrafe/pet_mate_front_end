"use client";
import { LoadingSpinner, PostFeed } from "@/components/atoms";
import { useGetMyPostsQuery } from "@/redux/features/post/post.api";
import { TPost } from "@/redux/features/post/post.type";
import React from "react";

export const MyPosts = () => {
  const { data: MyPosts, isLoading } = useGetMyPostsQuery([
    { name: "status", value: "published" },
  ]);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="mb-10">
      <PostFeed posts={MyPosts?.data as TPost[]} />
    </div>
  );
};
