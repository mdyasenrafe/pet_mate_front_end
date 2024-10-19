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

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// Define the form values
type TCreatePostValue = {
  title: string;
  content: string;
  category: string;
  image?: File;
};

const CreatePost = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const [content, setContent] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!currentUser?._id) {
    return <AuthPrompt />;
  }

  const onSubmit: SubmitHandler<TCreatePostValue> = async (data) => {
    console.log("Creating post with data:", { ...data, content });
  };

  // Category options
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
        {/* Post Title */}
        <FormInput
          name="title"
          label="Post Title"
          placeholder="Enter post title"
          required
          divStyle={{ marginBottom: "20px" }}
        />

        <FormSelect
          name="category"
          label="Category"
          options={categoryOptions}
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
            className="bg-white 1rounded-md !h-[320px] !p-2"
          />
        </div>

        {/* Image Upload */}
        <div className="mt-6 mb-6 bg-gray-100 p-4 rounded-lg">
          <Text variant="p4" className="mb-2">
            Upload Images
          </Text>
          <FormUpload name="files" multiple={true} />
        </div>

        {/* Submit Button */}
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
