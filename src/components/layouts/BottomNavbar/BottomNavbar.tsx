"use client";

import React from "react";
import Link from "next/link";
import { navItems } from "@/utils/navItems";
import { Text } from "@/components/atoms";
import { getCurrentUser } from "@/redux/features/auth";
import { useAppSelector } from "@/redux";

export const BottomNavBar: React.FC = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const profilePath = `/profile/${currentUser?._id}`;

  return (
    <nav className="fixed bottom-0 left-0 bg-primary lg:hidden h-[90px] flex items-center justify-between flex-wrap w-full">
      {navItems.map(({ id, label, path, icon: Icon, desktop }) => (
        <Link href={path} key={id} className="mx-auto">
          <Icon className="text-lg  mx-auto" color="white" />
          <Text variant="p5" className=" text-white mt-1">
            {label}
          </Text>
        </Link>
      ))}
    </nav>
  );
};
