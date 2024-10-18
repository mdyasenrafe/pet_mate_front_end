import { TProps } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign up | PetMate - Pet Care Tips & Stories",
  description:
    "Join PetMate, your go-to platform for expert pet care advice, heartwarming stories, and a community of passionate pet lovers. Sign in to explore tips, stories, and much more.",
};

const layout: React.FC<TProps> = ({ children }) => {
  return <>{children}</>;
};

export default layout;
