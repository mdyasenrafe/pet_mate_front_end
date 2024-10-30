import React from "react";
import { Table, Space } from "antd";
import { TUser } from "@/redux/features/auth";
import { TMeta } from "@/redux/features/types";
import { colors } from "@/theme";
import { Button } from "@/components/atoms";

type UserTableProps = {
  users: TUser[];
  isLoading: boolean;
  onUpdateRole: (user: TUser) => void;
  onDelete: (user: TUser) => void;
  meta: TMeta | undefined;
  onTableChange: (pagination: any) => void;
};

export const UserTable: React.FC<UserTableProps> = ({
  users,
  isLoading,
  onUpdateRole,
  onDelete,
  meta,
  onTableChange,
}) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          style={{
            color: status == "active" ? colors.green : colors.red,
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, user: TUser) => (
        <Space>
          <Button onClick={() => onUpdateRole(user)}>Update Role</Button>
          <Button
            danger
            onClick={() => onDelete(user)}
            disabled={user.status === "deleted"}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      rowKey="_id"
      loading={isLoading}
      pagination={{
        current: meta?.page || 1,
        pageSize: meta?.limit || 10,
        total: meta?.total || 0,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
      }}
      onChange={onTableChange}
      scroll={{ x: true }}
    />
  );
};
