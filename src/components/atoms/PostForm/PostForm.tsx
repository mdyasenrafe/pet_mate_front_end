"use client";

import {
  FormInput,
  FormReactQuili,
  FormSelect,
  FormUpload,
  FormWrapper,
} from "@/components/form";
import { TPost } from "@/redux/features/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "antd";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { Button, Text } from "..";
import { useAppSelector } from "@/redux";
import { getCurrentUser } from "@/redux/features/auth";
import { toast } from "sonner";
import { createPostValidationSchema } from "@/schema";

interface PostFormProps {
  initialPostValues: Partial<TPost>;
  onSubmit: SubmitHandler<any>;
  isLoading: boolean;
  isUpdate?: boolean;
  isMonetized: boolean;
  setIsMonetized: (val: boolean) => void;
}

export const PostForm: React.FC<PostFormProps> = ({
  isLoading,
  initialPostValues,
  onSubmit,
  isUpdate,
  isMonetized,
  setIsMonetized,
}) => {
  const currentUser = useAppSelector(getCurrentUser);
  const categoryOptions = [
    { value: "tip", label: "Tip" },
    { value: "story", label: "Story" },
  ];

  const handleMonetized = () => {
    if (!currentUser?.isPremium) {
      toast.error("You need a premium account to monetize your post.");
      return;
    }
    setIsMonetized(!isMonetized);
  };
  return (
    <FormWrapper
      onSubmit={onSubmit}
      resolver={zodResolver(createPostValidationSchema)}
      defaultValues={initialPostValues}
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
        <FormUpload
          name="files"
          multiple={true}
          defaultValue={initialPostValues?.files?.map((item) => item.url)}
        />
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
        disabled={isLoading}
        loading={isLoading}
      >
        <Text className="text-white" variant="p3">
          {isUpdate ? "Update Post" : "Publish Post"}
        </Text>
      </Button>
    </FormWrapper>
  );
};
