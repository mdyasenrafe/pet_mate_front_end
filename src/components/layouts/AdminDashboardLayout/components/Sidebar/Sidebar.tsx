"use client";

import { Layout, Menu } from "antd";
import { useAppSelector } from "@/redux";
import { TUser, useCurrentToken } from "@/redux/features/auth";
import { adminRoutes, verifyToken } from "@/utils";
import Link from "next/link";
import { LoadingSpinner, Text } from "@/components/atoms";
import { FaPaw } from "react-icons/fa";
import { useEffect, useState } from "react";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
};

export const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);
  const [isMounted, setIsMounted] = useState(false);
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
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
      }}
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
        {sidebarItems.map(({ id, name, path }) => (
          <div
            key={id}
            className="flex items-center space-x-2 rounded-full cursor-pointer p-3 transition-transform transform hover:scale-105 hover:bg-white/10"
          >
            <Link href={path} className="flex items-center">
              <Text variant="p5" className="ml-2 text-white">
                {name}
              </Text>
            </Link>
          </div>
        ))}
      </div>
    </Sider>
  );
};
