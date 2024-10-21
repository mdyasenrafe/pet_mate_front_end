"use client";

import { Container, Feed, Text } from "@/components/atoms";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { useGetRandomPostsQuery } from "@/redux/features/post/post.api";
import { Spin } from "antd";

const Home = () => {
  const { data, error, isLoading } = useGetRandomPostsQuery([]);

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

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {data?.data?.map((post) => (
              <Feed key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Home;
