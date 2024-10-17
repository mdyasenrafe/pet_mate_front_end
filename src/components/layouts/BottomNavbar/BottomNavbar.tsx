import React from "react";
import Link from "next/link";
import { navItems } from "@/utils/navItems";
import { Button, Text } from "@/components/atoms";
import { LuPlusCircle } from "react-icons/lu";

export const BottomNavBar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 bg-primary lg:hidden h-[90px] flex items-center justify-between flex-wrap w-full">
      {navItems.map(
        ({ id, label, path, icon: Icon, desktop }) =>
          desktop && (
            <Link href={path} key={id} className="mx-auto">
              <Icon className="text-2xl  mx-auto" color="white" />
              <Text variant="p3" className=" text-white">
                {label}
              </Text>
            </Link>
          )
      )}
    </nav>
  );
};
