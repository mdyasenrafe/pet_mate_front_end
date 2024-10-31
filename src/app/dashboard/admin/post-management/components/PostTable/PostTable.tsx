// PostTable.tsx
"use client";

import React, { useState } from "react";
import { Table, Space } from "antd";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { TPost } from "@/redux/features/post";
import { useDeletePostMutation } from "@/redux/features/post";
import { useModal } from "@/hooks";
import { DeleteConfirmationModal } from "./components";

type PostTableProps = {
  posts: TPost[];
  onDelete: (id: string) => void;
  meta?: any;
  onTableChange: (pagination: any) => void;
};

export const PostTable: React.FC<PostTableProps> = ({
  posts,
  onDelete,
  meta,
  onTableChange,
}) => {
  const router = useRouter();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [deletePost] = useDeletePostMutation();

  const handleDeleteClick = (id: string) => {
    setSelectedPostId(id);
    openModal();
  };

  const confirmDelete = async () => {
    if (selectedPostId) {
      await deletePost(selectedPostId); // Call the delete mutation
      closeModal();
      setSelectedPostId(null);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: "Author",
      dataIndex: ["author", "name"],
      key: "author",
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Text color={status === "published" ? "green" : "red"}>{status}</Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: TPost) => (
        <Space size="middle">
          <Button onClick={() => router.push(`/post-details/${record._id}`)}>
            View Details
          </Button>
          <Button
            customColor="red"
            onClick={() => handleDeleteClick(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={posts}
        rowKey={(record) => record._id}
        pagination={{
          current: meta?.page || 1,
          pageSize: meta?.pageSize || 10,
          total: meta?.total || 0,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        onChange={onTableChange}
      />

      <DeleteConfirmationModal
        isVisible={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={() => {
          closeModal();
          setSelectedPostId(null);
        }}
      />
    </>
  );
};
