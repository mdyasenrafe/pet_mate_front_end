"use client";
import { LoadingSpinner, PostFeed } from "@/components/atoms";
import { TPost, useGetPostByUserIdQuery } from "@/redux/features/post";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type MyPostsProps = {
  userId: string;
  isOwner: boolean;
};

export const MyPosts: React.FC<MyPostsProps> = ({ userId, isOwner }) => {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<TPost[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: myPostsData,
    isLoading,
    isFetching,
  } = useGetPostByUserIdQuery({
    userId: userId,
    params: [
      { name: "status", value: "published" },
      { name: "page", value: page.toString() },
    ],
  });

  useEffect(() => {
    if (myPostsData?.data) {
      setAllPosts((prevPosts) => [...prevPosts, ...myPostsData.data]);
      if (myPostsData.data.length === 0 || myPostsData.data.length < 5) {
        setHasMore(false);
      }
    }
  }, [myPostsData]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (isLoading && page === 1) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mb-10">
      <InfiniteScroll
        dataLength={allPosts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<LoadingSpinner />}
        endMessage={
          <p className="text-center text-gray-500 mt-4">
            No more posts to load
          </p>
        }
      >
        <PostFeed posts={allPosts} isAuthor={isOwner} />
      </InfiniteScroll>
    </div>
  );
};
