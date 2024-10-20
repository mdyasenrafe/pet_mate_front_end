"use client";

import { Container, Feed, Text } from "@/components/atoms";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { useAppSelector } from "@/redux";
import { getCurrentUser } from "@/redux/features/auth";
import {
  useGetPostsQuery,
  useGetRandomPostsQuery,
} from "@/redux/features/post/post.api";

const Home = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const {
    data: randomPosts,
    error: randomPostsError,
    isLoading: isRandomPostsLoading,
  } = useGetRandomPostsQuery([{ name: "status", value: "published" }], {
    skip: currentUser?._id ? true : false,
  });
  const {
    data: posts,
    error: getPostsError,
    isLoading: getPostsLoading,
  } = useGetPostsQuery([], { skip: !currentUser?._id ? true : false });

  const error = currentUser?._id ? getPostsError : randomPostsError;
  const isLoading = currentUser?._id ? getPostsLoading : isRandomPostsLoading;
  const postData = currentUser?._id ? posts?.data : randomPosts?.data;

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
            {postData?.map((post) => (
              <Feed key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Home;
