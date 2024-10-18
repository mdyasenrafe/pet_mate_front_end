"use client";

import { Button, Text } from "@/components/atoms";
import { navItems } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { LuPlusCircle } from "react-icons/lu";

export const LeftSideBar = () => {
  const router = useRouter();
  return (
    <aside className="h-screen w-full bg-primary text-center pt-8 !sticky overflow-y-hidden top-0 p-4">
      <nav>
        <Link href={"/"} className="justify-center flex mb-4">
          <Image src="/logo.png" width={80} height={80} alt="" />
        </Link>
        <div className="space-y-3">
          {navItems.map(
            ({ id, label, path, icon: Icon, desktop }) =>
              desktop && (
                <div
                  key={id}
                  className="flex items-center space-x-2 rounded-full cursor-pointer p-3 transition-transform transform hover:scale-105 hover:bg-white/10"
                >
                  <Link href={path} className="flex items-center">
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
      </nav>
    </aside>
  );
};
