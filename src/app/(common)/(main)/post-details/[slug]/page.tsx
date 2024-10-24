"use client";

import { Button, Container, Feed, Text } from "@/components/atoms";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { FormTextArea, FormWrapper } from "@/components/form";
import { useAppSelector } from "@/redux";
import { getCurrentUser } from "@/redux/features/auth";
import {
  useGetPostDetailsQuery,
  useAddCommentMutation,
} from "@/redux/features/post/post.api";
import { TCreateCommentRequest, TPost } from "@/redux/features/post/post.type";
import { formatRelativeTime } from "@/utils";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  params: {
    slug: string;
  };
};

type CommentFormData = {
  content: string;
};

const PostPage: React.FC<Props> = ({ params }) => {
  const { slug } = params;
  const currentUser = useAppSelector(getCurrentUser);
  const { data, error, isLoading } = useGetPostDetailsQuery(slug);
  const [addComment] = useAddCommentMutation();

  const handleSubmit: SubmitHandler<CommentFormData> = async (formData) => {
    try {
      const commentPayload = {
        post: slug,
        author: currentUser?._id as string,
        content: formData.content,
      };
      const result = await addComment(commentPayload).unwrap();
      toast.success("Comment added successfully!");
      console.log(result);
    } catch (error) {
      toast.error("Failed to add comment. Please try again.");
      console.error("Error adding comment:", error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Text variant="body">Failed to load post details.</Text>;
  }

  return (
    <Container>
      <div className="mb-16 lg:mb-10 mt-6 max-w-4xl mx-auto">
        {/* Post Details Section */}
        <div className="mb-10 text-center">
          <Text variant="h2" className="font-bold text-gray-800 text-3xl">
            Post Details
          </Text>
        </div>

        {/* Post Content */}
        <div className="">
          <Feed post={data?.data as TPost} />
        </div>

        <div className="mt-8 bg-gray-50 shadow-sm rounded-lg p-6">
          <Text
            variant="h3"
            className="text-gray-700 font-semibold text-xl border-b pb-3 mb-4"
          >
            Replies
          </Text>

          <FormWrapper onSubmit={handleSubmit}>
            <FormTextArea
              name="content"
              placeholder="Write your thoughts or feedback here..."
              id="reply"
              required={true}
              className="w-full p-4 border rounded-lg mb-4"
            />
            <div className="flex justify-end">
              <Button
                htmlType="submit"
                customColor="primary"
                className=" !text-white !rounded-full hover:!bg-purple-500  duration-200 ease-in-out transition-transform transform hover:!scale-105"
              >
                Submit
              </Button>
            </div>
          </FormWrapper>

          <div className="mb-10 mt-6">
            {data?.data?.comments?.length ? (
              <div className="space-y-6">
                {data?.data?.comments.map((comment, index: number) => (
                  <div
                    key={index}
                    className="bg-white  rounded-lg p-4 flex space-x-4 items-start border"
                  >
                    <img
                      src={comment?.author?.profilePicture}
                      alt={comment.author?.name || "Anonymous"}
                      className="rounded-full h-12 w-12 object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <Text
                          variant="body"
                          className="font-semibold text-gray-800"
                        >
                          {comment.author?.name || "Anonymous"}
                        </Text>
                        <Text variant="body" className="text-gray-500 text-sm">
                          {formatRelativeTime(comment.createdAt)}
                        </Text>
                      </div>
                      <Text variant="body" className="mt-2 text-gray-600">
                        {comment.content}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Text variant="body" className="text-center text-gray-500">
                No replies yet.
              </Text>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PostPage;
