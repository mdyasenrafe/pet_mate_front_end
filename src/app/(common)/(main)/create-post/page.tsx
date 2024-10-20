"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux";
import { getCurrentUser } from "@/redux/features/auth";
import {
  FormWrapper,
  FormInput,
  FormSelect,
  FormUpload,
} from "@/components/form";
import { Button, Text, AuthPrompt } from "@/components/atoms";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";
import { Checkbox } from "antd";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type TCreatePostValue = {
  title: string;
  content: string;
  category: string;
  files?: string[];
  monetization?: boolean;
};

const CreatePost = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const [content, setContent] = useState<string>("");
  const [isMonetized, setIsMonetized] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!currentUser?._id && isMounted) {
    return <AuthPrompt />;
  }

  const handleMonetized = () => {
    if (!currentUser?.isPremium) {
      toast.error("You need a premium account to monetize your post.");
      return;
    }
    setIsMonetized(!isMonetized);
  };

  const onSubmit: SubmitHandler<TCreatePostValue> = async (data) => {
    console.log("Creating post with data:", {
      ...data,
      content,
      monetization: isMonetized,
    });
    const files = data.files; // based 64 data
    //
  };

  const categoryOptions = [
    { value: "tip", label: "Tip" },
    { value: "story", label: "Story" },
  ];

  return (
    <div className="px-4 lg:px-8 pb-10 max-w-5xl mx-auto">
      <Text variant="h2" className="mb-6 text-center">
        Create a New Post
      </Text>

      <FormWrapper onSubmit={onSubmit}>
        <FormInput
          name="title"
          label="Post Title"
          placeholder="Enter post title"
          divStyle={{ marginBottom: "20px" }}
        />

        <FormSelect
          name="category"
          label="Category"
          options={categoryOptions}
          placeholder="Select Category"
        />

        <div className="mb-10">
          <Text variant="p4" className="mb-2">
            Post Content
          </Text>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="Write your post here..."
            className="bg-white rounded-md !h-[320px] !p-2"
          />
        </div>

        <div className="mt-6 mb-6 bg-gray-100 p-4 rounded-lg">
          <FormUpload name="files" multiple={true} />
        </div>
        <div className="flex items-center space-x-2 mb-6">
          <Checkbox checked={isMonetized} onChange={handleMonetized}>
            <label htmlFor="monetization" className="text-sm text-gray-600">
              Monetize this post (Premium users only)
            </label>
          </Checkbox>
        </div>

        <Button htmlType="submit" customColor="primary" className="w-full mt-6">
          <Text className="text-white" variant="p3">
            Publish Post
          </Text>
        </Button>
      </FormWrapper>
    </div>
  );
};

export default CreatePost;
