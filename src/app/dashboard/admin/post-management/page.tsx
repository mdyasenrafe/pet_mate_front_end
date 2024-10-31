"use client";

import React, { useCallback, useState } from "react";
import { Container } from "@/components/atoms";
import { AdminSectionHeader } from "@/components/atoms/AdminSectionHeader";
import { TPost, useGetRandomPostsQuery } from "@/redux/features/post";
import { PostTable } from "./components";

const Page = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });
  const [filters, setFilters] = useState<{
    status?: string[];
    category?: string[];
  }>({});

  const {
    data: postsData,
    isLoading,
    isFetching,
  } = useGetRandomPostsQuery([
    { value: pagination.page, name: "page" },
    { value: pagination.pageSize, name: "limit" },
    ...(filters.status
      ? filters.status.map((status) => ({ name: "status", value: status }))
      : []),
    ...(filters.category
      ? filters.category.map((category) => ({
          name: "category",
          value: category,
        }))
      : []),
  ]);

  const handleDelete = (id: string) => {
    console.log("Deleting post with id:", id);
  };

  const handleTableChange = useCallback((paginationData: any, filters: any) => {
    setPagination({
      page: paginationData.current,
      pageSize: paginationData.pageSize,
    });
    setFilters({
      status: filters.status as string[] | undefined,
      category: filters.category as string[] | undefined,
    });
  }, []);

  return (
    <Container>
      <AdminSectionHeader
        title="Post Management"
        description="Manage all posts shared within the PetMate community. Here you can review, edit, or remove pet care tips and heartwarming stories to ensure a safe and informative experience for all pet lovers."
      />
      {postsData && (
        <PostTable
          posts={postsData.data as TPost[]}
          meta={postsData?.meta}
          onTableChange={handleTableChange}
          isLoading={isLoading || isFetching}
        />
      )}
    </Container>
  );
};

export default Page;
