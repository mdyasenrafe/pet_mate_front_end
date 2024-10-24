"use client";

import { Card, Dropdown, Button } from "antd";
import { FaEllipsisV } from "react-icons/fa";
import { TPost } from "@/redux/features/post/post.type";
import { FeedAuthorInfo, FeedBottom, FeedFiles } from "./components";
import React from "react";
import { Text } from "..";
import { useRouter } from "next/navigation";

type FeedProps = {
  post: TPost;
};

export const Feed: React.FC<FeedProps> = ({ post }) => {
  const router = useRouter();

  const items = [
    {
      label: "Edit Post",
      key: 1,
    },
    {
      label: "Delete Post",
      key: 2,
    },
  ];

  const getTailwindContentStyles = () => ({
    __html: post.content
      .replace(/<h1>/g, '<h1 class="!text-3xl font-bold">')
      .replace(/<h2>/g, '<h2 class="!text-xl font-semibold ">')
      .replace(/<h3>/g, '<h3 class="!text-lg font-semibold">')
      .replace(/<h4>/g, '<h4 class="!text-xl font-semibold">')
      .replace(/<p>/g, '<p class="text-base leading-relaxed">'),
  });

  const handleCardClick = () => {
    router.push(`/post-details/${post._id}`);
  };

  return (
    <Card
      className="mb-6 rounded-md shadow-lg p-6 !cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start mb-3">
        <FeedAuthorInfo post={post} />
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Button
            shape="circle"
            icon={<FaEllipsisV />}
            onClick={(e) => e.stopPropagation()}
          />
        </Dropdown>
      </div>

      <div>
        <Text variant="h4" className="font-bold mb-1 !text-black">
          {post.title}
        </Text>
      </div>

      <div className="mt-4">
        <div
          className="quill-content"
          dangerouslySetInnerHTML={getTailwindContentStyles()}
        />
      </div>

      <FeedFiles files={post.files} />
      <FeedBottom post={post} />
    </Card>
  );
};
