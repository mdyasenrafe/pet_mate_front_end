"use client";

import React, { useCallback, useState } from "react";
import { Container } from "@/components/atoms";
import { AdminSectionHeader } from "@/components/atoms/AdminSectionHeader";
import { useGetPaymentHistoryQuery } from "@/redux/features/premium";
import type { TablePaginationConfig } from "antd/es/table";
import { PaymentTable } from "./components";

const PaymentHistory: React.FC = () => {
  const [pagination, setPagination] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 1,
    pageSize: 10,
  });

  const { data, isLoading, isFetching } = useGetPaymentHistoryQuery([
    {
      value: pagination.page,
      name: "page",
    },
    {
      value: pagination.pageSize,
      name: "limit",
    },
  ]);
  const handleTableChange = useCallback((paginationData: any) => {
    setPagination({
      page: paginationData.current,
      pageSize: paginationData.pageSize,
    });
  }, []);

  return (
    <React.Fragment>
      <Container>
        <AdminSectionHeader
          title="Payment History"
          description="View and manage payment transactions related to pet care services. Keep track of completed and pending payments for a seamless experience."
        />
        <PaymentTable
          data={data?.data || []}
          loading={isLoading || isFetching}
          meta={data?.meta}
          onTableChange={handleTableChange}
        />
      </Container>
    </React.Fragment>
  );
};

export default PaymentHistory;
