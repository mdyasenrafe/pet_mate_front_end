"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux";
import { getCurrentUser } from "@/redux/features/auth";
import {
  FormWrapper,
  FormInput,
  FormSelect,
  FormUpload,
  FormReactQuili,
} from "@/components/form";
import { Button, Text, AuthPrompt, Container } from "@/components/atoms";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";
import { Checkbox } from "antd";
import { useFileUploadMutation } from "@/api/updloadApi";
import { TCreatePostRequest } from "@/redux/features/post/post.type";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type TCreatePostValue = {
  title: string;
  content: string;
  category: string;
  files?: string[];
  monetization?: boolean;
};

type TFile = {
  url: string;
  type: "image" | "pdf";
};

const CreatePost = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const [content, setContent] = useState<string>("");
  const [isMonetized, setIsMonetized] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const [fileUpload, { isLoading: isFileUploading }] = useFileUploadMutation();

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
    let uploadedFiles: TFile[] = [];

    if (data.files) {
      for (const file of data.files) {
        try {
          const fileType = file.split(";")[0].split(":")[1];
          const uploadResult = await fileUpload({
            file: file,
          }).unwrap();
          if (uploadResult?.data?.url) {
            uploadedFiles.push({
              url: uploadResult.data.url,
              type: fileType.startsWith("image") ? "image" : "pdf",
            });
          } else {
            toast.error("Failed to upload a file. Please try again.");
          }
        } catch (error) {
          console.error("Error uploading file:", error);
          toast.error("An error occurred while uploading a file.");
        }
      }
    }

    const bodyData = {
      ...data,
      files: uploadedFiles,
      monetization: isMonetized,
    };

    console.log("Creating post with data:", bodyData);
  };

  const categoryOptions = [
    { value: "tip", label: "Tip" },
    { value: "story", label: "Story" },
  ];

  return (
    <Container>
      <div className="my-10">
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
            <FormReactQuili
              name="content"
              label="Post Content"
              placeholder="Write your post here..."
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

          <Button
            htmlType="submit"
            customColor="primary"
            className="w-full mt-6"
          >
            <Text className="text-white" variant="p3">
              Publish Post
            </Text>
          </Button>
        </FormWrapper>
      </div>
    </Container>
  );
};

export default CreatePost;
