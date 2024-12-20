"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux";
import { getCurrentUser } from "@/redux/features/auth";
import { Text, AuthPrompt, Container, PostForm } from "@/components/atoms";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useFileUploadMutation } from "@/api/updloadApi";
import { TCreatePostRequest, TFile } from "@/redux/features/post/post.type";
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

        <PostForm
          isLoading={isFileUploading || isLoading}
          onSubmit={onSubmit}
          isUpdate={false}
          isMonetized={isMonetized}
          setIsMonetized={setIsMonetized}
          initialPostValues={{}}
        />
      </div>
    </Container>
  );
};

export default CreatePost;
