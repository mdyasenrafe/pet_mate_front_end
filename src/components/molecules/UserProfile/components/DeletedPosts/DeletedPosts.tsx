"use client";
import { LoadingSpinner, PostFeed } from "@/components/atoms";
import { TPost, useGetPostByUserIdQuery } from "@/redux/features/post";
import React from "react";

type DeletedPostProps = {
  userId: string;
};

export const DeletedPosts: React.FC<DeletedPostProps> = ({ userId }) => {
  const {
    data: MyPosts,
    isLoading,
    isFetching,
  } = useGetPostByUserIdQuery({
    userId: userId,
    params: [{ name: "status", value: "deleted" }],
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
