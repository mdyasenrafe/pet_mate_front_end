"use client";

import { Button, Text } from "@/components/atoms";
import { useModal } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/redux";
import {
  TUser,
  getCurrentUser,
  logout,
  useCurrentToken,
} from "@/redux/features/auth";
import { navItems, commonItems, adminItems } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuPlusCircle } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { LogoutModal } from "./components";
import { verifyToken } from "@/utils/verifyToken";

export const LeftSideBar = () => {
  const [isMounted, setIsMounted] = useState(false);

  // hooks
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentUser = useAppSelector(getCurrentUser);
  const { isModalOpen, openModal, closeModal } = useModal();
  const token = useAppSelector(useCurrentToken);
  let user;
  let items = navItems;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const profilePath = `/profile/${currentUser?._id}`;
  const adminPath = `/dashboard/admin/profile/${currentUser?._id}`;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  if (user?.role === "user" && isMounted) {
    items = [...navItems, ...commonItems];
  } else if (user?.role == "admin" && isMounted) {
    items = [...navItems, ...adminItems];
  }

  const handleLogout = () => {
    dispatch(logout());
    closeModal();
  };

  return (
    <aside className="h-screen w-full bg-primary text-center pt-8 !sticky overflow-y-hidden top-0 p-4">
      <nav>
        <Link href={"/"} className="justify-center flex mb-4">
          <Image src="/logo.png" width={80} height={80} alt="" />
        </Link>
        <div className="space-y-3">
          {items.map(
            ({ id, label, path, icon: Icon, desktop }) =>
              desktop && (
                <div
                  key={id}
                  className="flex items-center space-x-2 rounded-full cursor-pointer p-3 transition-transform transform hover:scale-105 hover:bg-white/10"
                >
                  <Link
                    href={
                      path === "/profile"
                        ? profilePath
                        : path == "/admin/profile"
                        ? adminPath
                        : path
                    }
                    className="flex items-center"
                  >
                    <Icon className="text-2xl" color="white" />
                    <Text variant="p3" className="ml-2 text-white">
                      {label}
                    </Text>
                  </Link>
                </div>
              )
          )}
        </div>
        <div className="mt-6">
          <Button
            icon={<LuPlusCircle />}
            className="w-3/4 !h-[40px] transition-transform transform hover:scale-105 hover:bg-white/10"
            customColor="white"
            onClick={() => router.push("/create-post")}
          >
            Post
          </Button>
        </div>
        {currentUser?._id && isMounted && (
          <div
            className="fixed bottom-8 flex items-center justify-center space-x-2 cursor-pointer"
            onClick={openModal}
          >
            <MdLogout className="text-2xl text-white" />
            <Text variant="p3" className="text-white">
              Logout
            </Text>
          </div>
        )}
      </nav>

      <LogoutModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        onConfirmLogout={handleLogout}
      />
    </aside>
  );
};
