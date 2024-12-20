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
import { useAppSelector } from "@/redux";
import { getCurrentUser } from "@/redux/features/auth";

type FeedProps = {
  post: TPost;
  isAuthor: boolean;
  isAdmin?: boolean;
};

export const Feed: React.FC<FeedProps> = ({ post, isAuthor, isAdmin }) => {
  const router = useRouter();
  const { isModalOpen, openModal, closeModal } = useModal();
  const premiumPost = post?.monetization;
  const loggedInUser = useAppSelector(getCurrentUser);
  const isPremiumUser = loggedInUser?.isPremium;

  const handleEdit = useCallback(() => {
    router.push(`/edit-post/${post._id}`);
  }, [router, post._id]);

  const handleDelete = useCallback(() => {
    openModal();
  }, [openModal]);

  const handleUpgradeRedirect = useCallback(() => {
    router.push("/premium");
  }, [router]);

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
    if (isPremiumUser || !premiumPost) {
      router.push(`/post-details/${post._id}`);
    }
  }, [router, post._id, isPremiumUser, premiumPost]);

  return (
    <>
      <Card
        className="mb-6 rounded-md shadow-lg p-6 relative"
        onClick={handleCardClick}
      >
        {premiumPost && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
            Premium Post
          </div>
        )}

        {premiumPost && !isPremiumUser ? (
          <div className="flex flex-col items-center justify-center text-center p-4 rounded-md ">
            <Text variant="h4" className="text-black font-bold mb-2">
              Premium Content
            </Text>
            <Text variant="p5" className="text-gray-700 mb-4">
              Only premium users can view this post.
            </Text>
            <Button
              className="bg-yellow-500 text-white font-bold"
              onClick={(e) => {
                e.stopPropagation();
                handleUpgradeRedirect();
              }}
            >
              Upgrade Now
            </Button>
          </div>
        ) : (
          <>
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
            {!isAdmin && <FeedBottom post={post} />}
          </>
        )}
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
