import { Button, Text } from "@/components/atoms";
import { navItems } from "@/utils";
import Link from "next/link";
import React from "react";
import { LuPlusCircle } from "react-icons/lu";

export const LeftSideBar = () => {
  return (
    <aside className="p-4 h-full w-full bg-primary text-center">
      <nav>
        <div className="space-y-2">
          {navItems.map(
            ({ id, label, path, icon: Icon, desktop }) =>
              desktop && (
                <div
                  key={id}
                  className="flex items-center space-x-2 rounded-full cursor-pointer p-3 transition-transform transform hover:scale-105 hover:bg-white/10"
                >
                  <Link href={path} className="flex items-center">
                    <Icon className="text-xl" color="white" />
                    <Text className="ml-2 text-white">{label}</Text>
                  </Link>
                </div>
              )
          )}
        </div>
        <div className="mt-4">
          <Button
            icon={<LuPlusCircle />}
            className="w-3/4 !h-[40px] transition-transform transform hover:scale-105 hover:bg-white/10"
            customColor="white"
          >
            Post
          </Button>
        </div>
      </nav>
    </aside>
  );
};
