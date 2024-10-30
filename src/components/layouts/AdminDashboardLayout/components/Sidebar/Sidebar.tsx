"use client";

import { Layout } from "antd";
import { useAppSelector } from "@/redux";
import { TUser, getCurrentUser, useCurrentToken } from "@/redux/features/auth";
import { adminRoutes, verifyToken } from "@/utils";
import Link from "next/link";
import { LoadingSpinner, Text } from "@/components/atoms";
import { FaPaw } from "react-icons/fa";
import React, { useEffect, useState } from "react";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
};

export const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);
  const currentUser = useAppSelector(getCurrentUser);
  const [isMounted, setIsMounted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const profilePath = `/dashboard/admin/profile/${currentUser?._id}`;
  let user;
  let sidebarItems;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  let role = user?.role;

  switch (role) {
    case userRole.ADMIN:
      sidebarItems = adminRoutes;
      break;

    default:
      sidebarItems = adminRoutes;
      break;
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <LoadingSpinner />;
  }

  return (
    <Sider
      collapsible
      breakpoint="lg"
      style={{
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
      }}
      collapsed={collapsed}
      onCollapse={(collapsed) => setCollapsed(collapsed)}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FaPaw className="text-5xl text-white" />
      </div>
      <div className="space-y-3">
        {sidebarItems.map(({ id, name, path, icon: Icon }) => (
          <div
            key={id}
            className="flex items-center space-x-2 rounded-full cursor-pointer p-3 transition-transform transform hover:scale-105"
          >
            <Link
              href={path === "/dashboard/admin/profile" ? profilePath : path}
              className="flex items-center"
            >
              <Icon className="text-xl" color="white" />
              {!collapsed && (
                <Text variant="p5" className="ml-3 text-white">
                  {name}
                </Text>
              )}
            </Link>
          </div>
        ))}
      </div>
    </Sider>
  );
};
