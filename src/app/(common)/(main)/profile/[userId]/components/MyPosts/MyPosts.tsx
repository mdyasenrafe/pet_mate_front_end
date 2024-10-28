"use client";
import { LoadingSpinner, PostFeed } from "@/components/atoms";
import { TPost, useGetPostByUserIdQuery } from "@/redux/features/post";
import React from "react";

type MyPostsProps = {
  userId: string;
};

export const MyPosts: React.FC<MyPostsProps> = ({ userId }) => {
  const {
    data: MyPosts,
    isLoading,
    isFetching,
  } = useGetPostByUserIdQuery({
    userId: userId,
    params: [{ name: "status", value: "published" }],
  });

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }
  return (
    <div className="mb-10">
      <PostFeed posts={MyPosts?.data as TPost[]} isAuthor={true} />
    </div>
  );
};
