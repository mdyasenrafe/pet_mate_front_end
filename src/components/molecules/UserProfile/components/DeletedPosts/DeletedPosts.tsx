"use client";
import { LoadingSpinner, PostFeed } from "@/components/atoms";
import { TPost, useGetPostByUserIdQuery } from "@/redux/features/post";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type DeletedPostProps = {
  userId: string;
};

export const DeletedPosts: React.FC<DeletedPostProps> = ({ userId }) => {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<TPost[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: deletedPostsData,
    isLoading,
    isFetching,
  } = useGetPostByUserIdQuery({
    userId: userId,
    params: [
      { name: "status", value: "deleted" },
      { name: "page", value: page.toString() },
    ],
  });

  useEffect(() => {
    if (deletedPostsData?.data) {
      setAllPosts((prevPosts) => [...prevPosts, ...deletedPostsData.data]);
      if (
        deletedPostsData.data.length === 0 ||
        deletedPostsData.data.length < 5
      ) {
        setHasMore(false);
      }
    }
  }, [deletedPostsData]);

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
            No more deleted posts to load
          </p>
        }
      >
        <PostFeed posts={allPosts} isAuthor={true} />
      </InfiniteScroll>
    </div>
  );
};
