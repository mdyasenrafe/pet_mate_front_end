"use client";

import React, { useState } from "react";
import { Text } from "@/components/atoms";
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
  useUndoVotePostMutation,
  TPost,
} from "@/redux/features/post";
import { toast } from "sonner";
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

  const [localUpvoteCount, setLocalUpvoteCount] = useState<number>(
    post.upvoteCount
  );
  const [localDownvoteCount, setLocalDownvoteCount] = useState<number>(
    post.downvoteCount
  );

  const [upvotePost] = useUpvotePostMutation();
  const [downvotePost] = useDownvotePostMutation();
  const [undoVotePost] = useUndoVotePostMutation();

  const handleUpvote = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) {
      toast.warning("Please log in to vote on posts!");
      return;
    }

    if (hasUpvoted) {
      setLocalUpvoteCount(localUpvoteCount - 1);
      setHasUpvoted(false);
    } else {
      setLocalUpvoteCount(localUpvoteCount + 1);
      setHasUpvoted(true);

      if (hasDownvoted) {
        setLocalDownvoteCount(localDownvoteCount - 1);
        setHasDownvoted(false);
      }
    }

    try {
      if (hasUpvoted) {
        await undoVotePost({ postId: post._id, type: "upvote" }).unwrap();
      } else {
        await upvotePost(post._id).unwrap();
      }
    } catch (error) {
      console.error("Failed to handle upvote:", error);
    }
  };

  const handleDownvote = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) {
      toast.warning("Please log in to vote on posts!");
      return;
    }

    if (hasDownvoted) {
      setLocalDownvoteCount(localDownvoteCount - 1);
      setHasDownvoted(false);
    } else {
      setLocalDownvoteCount(localDownvoteCount + 1);
      setHasDownvoted(true);

      if (hasUpvoted) {
        setLocalUpvoteCount(localUpvoteCount - 1);
        setHasUpvoted(false);
      }
    }

    try {
      if (hasDownvoted) {
        await undoVotePost({ postId: post._id, type: "downvote" }).unwrap();
      } else {
        await downvotePost(post._id).unwrap();
      }
    } catch (error) {
      console.error("Failed to handle downvote:", error);
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
