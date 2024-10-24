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
import { toast } from "sonner";
import { Checkbox } from "antd";
import { useFileUploadMutation } from "@/api/updloadApi";
import { TCreatePostRequest, TFile } from "@/redux/features/post/post.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostValidationSchema } from "@/schema";
import { useCreatePostMutation } from "@/redux/features/post/post.api";
import { useRouter } from "next/navigation";

type TCreatePostValue = {
  title: string;
  content: string;
  category: string;
  files?: string[];
  monetization?: boolean;
};

const CreatePost = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const [isMonetized, setIsMonetized] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const [fileUpload, { isLoading: isFileUploading }] = useFileUploadMutation();
  const [createPost, { isLoading }] = useCreatePostMutation();
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const router = useRouter();
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
    try {
      let uploadedFiles: TFile[] = [];

      if (data.files) {
        for (const file of data.files) {
          const fileType = file.split(";")[0].split(":")[1];
          const uploadResult = await fileUpload({ file }).unwrap();

          if (uploadResult?.data?.url) {
            uploadedFiles.push({
              url: uploadResult.data.url,
              type: fileType.startsWith("image") ? "image" : "pdf",
            });
          } else {
            toast.error("Failed to upload a file. Please try again.");
          }
        }
      }

      const bodyData = {
        ...data,
        files: uploadedFiles,
        monetization: isMonetized,
      };

      const res = await createPost(bodyData as TCreatePostRequest).unwrap();
      toast.success(res?.message || "Post created successfully");
      router.push("/");
    } catch (err: any) {
      console.error("Error:", err);
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  const categoryOptions = [
    { value: "tip", label: "Tip" },
    { value: "story", label: "Story" },
  ];

  return (
    <Container>
      <div className="my-10">
        <div className="">
          <Text variant="h2" className="mb-6 text-center">
            Create a New Post
          </Text>
          <Text
            variant="p4"
            style={{ textAlign: "center", maxWidth: 600, margin: "auto" }}
            className="text-black pb-16"
          >
            Share your pet care tips or heartwarming stories with the PetMate
            community. Whether it's advice on pet health, grooming, or just an
            inspiring tale of your pet's journey, let your voice be heard.
          </Text>
        </div>

        <FormWrapper
          onSubmit={onSubmit}
          resolver={zodResolver(createPostValidationSchema)}
        >
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
            disabled={isFileUploading || isLoading}
            loading={isFileUploading || isLoading}
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
