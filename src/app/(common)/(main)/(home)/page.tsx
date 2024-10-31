"use client";

import { Container, PostFeed, Text } from "@/components/atoms";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { useAppSelector } from "@/redux";
import { getCurrentUser } from "@/redux/features/auth";
import {
  useGetPostsQuery,
  useGetRandomPostsQuery,
  TPost,
} from "@/redux/features/post";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<TPost[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: randomPosts,
    error: randomPostsError,
    isLoading: isRandomPostsLoading,
  } = useGetRandomPostsQuery(
    [
      { name: "status", value: "published" },
      { name: "page", value: page.toString() },
      { name: "limit", value: 5 },
    ],
    {
      skip: currentUser?._id ? true : false,
    }
  );

  const {
    data: posts,
    error: getPostsError,
    isLoading: getPostsLoading,
  } = useGetPostsQuery(
    [
      { name: "status", value: "published" },
      { name: "page", value: page.toString() },
      { name: "limit", value: 5 },
    ],
    {
      skip: !currentUser?._id ? true : false,
    }
  );

  const error = currentUser?._id ? getPostsError : randomPostsError;
  const isLoading = currentUser?._id ? getPostsLoading : isRandomPostsLoading;
  const postData = currentUser?._id ? posts?.data : randomPosts?.data;

  useEffect(() => {
    if (postData) {
      setAllPosts((prevPosts) => [...prevPosts, ...postData]);
      if (postData.length === 0 || postData.length < 5) {
        setHasMore(false);
      }
    }
  }, [postData]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (error) {
    return (
      <Container>
        <div className="text-center text-red-500 mt-10">
          <Text variant="p4">Failed to load posts</Text>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="my-10">
        <div className="mb-10">
          <Text variant="h2" className="text-center">
            PetMate Feed
          </Text>
        </div>

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
          <PostFeed posts={allPosts} />
        </InfiniteScroll>
      </div>
    </Container>
  );
};

export default Home;
