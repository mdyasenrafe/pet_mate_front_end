"use client";

import { useAppSelector } from "@/redux";
import { getCurrentUser } from "@/redux/features/auth";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthPrompt } from "@/components/atoms";

const CreatePost = () => {
  const currentUser = useAppSelector(getCurrentUser);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!currentUser?._id) {
    return <AuthPrompt />;
  }

  return <div className="px-0 lg:px-4"></div>;
};

export default CreatePost;
