import { TProps } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Post Details | PetMate - Pet Care Tips & Stories",
  description:
    "Read helpful pet care tips and heartwarming stories from the PetMate community. Discover advice and stories shared by pet lovers like you.",
};

const layout: React.FC<TProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default layout;
