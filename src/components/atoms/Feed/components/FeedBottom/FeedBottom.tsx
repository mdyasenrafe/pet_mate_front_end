"use client";

import React, { useState } from "react";
import { Text } from "@/components/atoms";
import { TPost } from "@/redux/features/post/post.type";
import {
  FaRegCommentDots,
  FaRegThumbsDown,
  FaRegThumbsUp,
} from "react-icons/fa";
import { useAppSelector } from "@/redux";
import { getCurrentUser } from "@/redux/features/auth";
import {
  useUpvotePostMutation,
  useDownvotePostMutation,
} from "@/redux/features/post/post.api";

type FeedBottomProps = {
  post: TPost;
};

export const FeedBottom: React.FC<FeedBottomProps> = ({ post }) => {
  const currentUser = useAppSelector(getCurrentUser);
  const [hasUpvoted, setHasUpvoted] = useState<boolean>(
    post.upvotedBy.some((user) => user._id === currentUser?._id)
  );
  const [hasDownvoted, setHasDownvoted] = useState<boolean>(
    post.downvotedBy.some((user) => user._id === currentUser?._id)
  );

  // Local state to handle the vote counts
  const [localUpvoteCount, setLocalUpvoteCount] = useState<number>(
    post.upvoteCount
  );
  const [localDownvoteCount, setLocalDownvoteCount] = useState<number>(
    post.downvoteCount
  );

  // API mutation hooks for upvote/downvote
  const [upvotePost] = useUpvotePostMutation();
  const [downvotePost] = useDownvotePostMutation();

  const handleUpvote = async () => {
    if (hasUpvoted) {
      console.log("User has already upvoted");
      // API call for toggling upvote can be added later if required
    } else {
      setLocalUpvoteCount(localUpvoteCount + 1);
      setHasUpvoted(true);

      if (hasDownvoted) {
        setLocalDownvoteCount(localDownvoteCount - 1);
        setHasDownvoted(false);
      }

      // Call the upvote API
      try {
        await upvotePost(post._id).unwrap();
        console.log("User upvoted successfully");
      } catch (error) {
        console.error("Failed to upvote post:", error);
      }
    }
  };

  const handleDownvote = async () => {
    if (hasDownvoted) {
      console.log("User has already downvoted");
      // API call for toggling downvote can be added later if required
    } else {
      setLocalDownvoteCount(localDownvoteCount + 1);
      setHasDownvoted(true);

      if (hasUpvoted) {
        setLocalUpvoteCount(localUpvoteCount - 1);
        setHasUpvoted(false);
      }

      // Call the downvote API
      try {
        await downvotePost(post._id).unwrap();
        console.log("User downvoted successfully");
      } catch (error) {
        console.error("Failed to downvote post:", error);
      }
    }
  };

  return (
    <div className="mt-4 flex justify-between items-center">
      <div className="flex items-center space-x-1 cursor-pointer">
        <FaRegCommentDots className="text-xl" />
        <Text variant="p5">{post?.commentCount}</Text>
      </div>
      <div className="flex items-center space-x-6">
        <div
          className={`flex items-center space-x-1 cursor-pointer ${
            hasUpvoted ? "text-blue-500" : ""
          }`}
          onClick={handleUpvote}
        >
          <FaRegThumbsUp className="text-xl" />
          <Text variant="p5">{localUpvoteCount}</Text>
        </div>

        <div
          className={`flex items-center space-x-1 cursor-pointer ${
            hasDownvoted ? "text-red-500" : ""
          }`}
          onClick={handleDownvote}
        >
          <FaRegThumbsDown className="text-xl" />
          <Text variant="p5">{localDownvoteCount}</Text>
        </div>
      </div>
    </div>
  );
};
