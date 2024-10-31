"use client";

import React, { useCallback, useState } from "react";
import { Container } from "@/components/atoms";
import { AdminSectionHeader } from "@/components/atoms/AdminSectionHeader";
import { TPost, useGetRandomPostsQuery } from "@/redux/features/post";
import { PostTable } from "./components";

const page = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });

  const { data: postsData, isLoading } = useGetRandomPostsQuery([
    { value: pagination.page, name: "page" },
    { value: pagination.pageSize, name: "limit" },
  ]);

  const handleDelete = (id: string) => {
    console.log("Deleting post with id:", id);
  };

  const handleTableChange = useCallback((paginationData: any) => {
    setPagination({
      page: paginationData.current,
      pageSize: paginationData.pageSize,
    });
  }, []);

  return (
    <Container>
      <AdminSectionHeader
        title="Post Management"
        description="Manage all posts shared within the PetMate community. Here you can review, edit, or remove pet care tips and heartwarming stories to ensure a safe and informative experience for all pet lovers."
      />
      {!isLoading && postsData && (
        <PostTable
          posts={postsData.data as TPost[]}
          onDelete={handleDelete}
          meta={postsData?.meta}
          onTableChange={handleTableChange}
        />
      )}
    </Container>
  );
};

export default page;
