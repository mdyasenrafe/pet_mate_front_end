"use client";

import { Card, Dropdown, MenuProps } from "antd";
import { FaEllipsisV } from "react-icons/fa";
import { TPost } from "@/redux/features/post/post.type";
import {
  DeletePostModal,
  FeedAuthorInfo,
  FeedBottom,
  FeedFiles,
} from "./components";
import React, { useCallback, useMemo } from "react";
import { Button, Text } from "..";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks";
import { Modal } from "@/components";

type FeedProps = {
  post: TPost;
  isAuthor: boolean;
};

export const Feed: React.FC<FeedProps> = ({ post, isAuthor }) => {
  const router = useRouter();
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleEdit = useCallback(() => {
    router.push(`/edit/${post._id}`);
  }, [router, post._id]);

  const handleDelete = useCallback(() => {
    openModal();
  }, [openModal]);

  const handleDropdownClick: MenuProps["onClick"] = useCallback(
    (e: any) => {
      e.domEvent.stopPropagation();
      if (e.key === "edit") handleEdit();
      if (e.key === "delete") handleDelete();
    },
    [handleEdit, handleDelete]
  );

  const items = [
    {
      label: "Edit Post",
      key: "edit",
    },
    {
      label: "Delete Post",
      key: "delete",
    },
  ];

  const getTailwindContentStyles = useMemo(
    () => ({
      __html: post.content
        .replace(/<h1>/g, '<h1 class="!text-3xl font-bold">')
        .replace(/<h2>/g, '<h2 class="!text-xl font-semibold">')
        .replace(/<h3>/g, '<h3 class="!text-lg font-semibold">')
        .replace(/<h4>/g, '<h4 class="!text-xl font-semibold">')
        .replace(/<p>/g, '<p class="text-base leading-relaxed">'),
    }),
    [post.content]
  );

  const handleCardClick = useCallback(() => {
    router.push(`/post-details/${post._id}`);
  }, [router, post._id]);

  return (
    <>
      <Card
        className="mb-6 rounded-md shadow-lg p-6 !cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="flex justify-between items-start mb-3">
          <FeedAuthorInfo post={post} />
          {isAuthor && (
            <Dropdown
              menu={{ items, onClick: handleDropdownClick }}
              trigger={["click"]}
            >
              <Button
                shape="circle"
                icon={<FaEllipsisV />}
                onClick={(e) => e.stopPropagation()}
              />
            </Dropdown>
          )}
        </div>

        <div>
          <Text variant="h4" className="font-bold mb-1 !text-black">
            {post.title}
          </Text>
        </div>

        <div className="mt-4">
          <div
            className="quill-content"
            dangerouslySetInnerHTML={getTailwindContentStyles}
          />
        </div>

        <FeedFiles files={post.files} />
        <FeedBottom post={post} />
      </Card>

      {isModalOpen && (
        <DeletePostModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          postId={post?._id}
        />
      )}
    </>
  );
};
