"use client";

import { Button, LoadingSpinner } from "@/components/atoms";
import { useModal } from "@/hooks";
import { useAppDispatch } from "@/redux";
import { logout } from "@/redux/features/auth";
import { TProps } from "@/types";
import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { Sidebar } from "./components";

const { Header, Content } = Layout;

export const AdminDashboardLayout: React.FC<TProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [isMounted, setIsMounted] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    closeModal();
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <LoadingSpinner />;
  }

  return (
    <Layout style={{ height: "100%" }}>
      <Sidebar />
      <Layout>
        <Header
          style={{
            justifyContent: "flex-end",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button onClick={handleLogout} className="ml-3">
            Logout
          </Button>
        </Header>
        <Content
          style={{
            padding: "24px 0",
            background: "white",
          }}
        >
          <div
            style={{
              minHeight: 360,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
