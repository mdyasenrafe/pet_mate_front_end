import React from "react";
import { Table, Badge, Tooltip, Avatar } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { TPayment } from "@/redux/features/premium";
import { TMeta } from "@/redux/features/types";
import { formatRelativeTime } from "@/utils";

interface PaymentTableProps {
  data: TPayment[];
  loading: boolean;
  meta: TMeta | undefined;
  onTableChange: (pagination: any) => void;
}

export const PaymentTable: React.FC<PaymentTableProps> = ({
  data,
  loading,
  onTableChange,
  meta,
}) => {
  const columns: ColumnsType<TPayment> = [
    {
      title: "User",
      dataIndex: ["user", "name"],
      key: "user",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src={record.user?.profilePicture} alt={record.user?.name} />
          <span style={{ marginLeft: 8 }}>
            {record.user?.name || "Unknown User"}
          </span>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <span style={{ textTransform: "capitalize" }}>{type}</span>
      ),
    },
    {
      title: "Payment Intent ID",
      dataIndex: "paymentIntentId",
      key: "paymentIntentId",
      render: (id) => (
        <Tooltip title={id}>
          {id.slice(0, 6)}...{id.slice(-4)}
        </Tooltip>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Badge
          status={isActive ? "success" : "default"}
          text={isActive ? "Active" : "Inactive"}
        />
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => formatRelativeTime(date),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey={(record) => record._id}
      pagination={{
        current: meta?.page || 1,
        pageSize: meta?.limit || 10,
        total: meta?.total || 0,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
      }}
      onChange={onTableChange}
      scroll={{ x: true }}
      style={{ marginTop: 20 }}
    />
  );
};
