"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux";
import { getCurrentUser } from "@/redux/features/auth";
import {
  Text,
  AuthPrompt,
  Container,
  PostForm,
  LoadingSpinner,
} from "@/components/atoms";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useFileUploadMutation } from "@/api/updloadApi";
import {
  TCreatePostRequest,
  TCreatePostValue,
  TFile,
  TPost,
  TUpdatePostRequest,
} from "@/redux/features/post/post.type";
import {
  useCreatePostMutation,
  useGetPostDetailsQuery,
  useUpdatePostMutation,
} from "@/redux/features/post/post.api";
import { useRouter } from "next/navigation";

type Props = {
  params: {
    postId: string;
  };
};

const EditPost: React.FC<Props> = ({ params }) => {
  const { postId } = params;
  const currentUser = useAppSelector(getCurrentUser);
  const [isMonetized, setIsMonetized] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  const { data, isLoading: PostDetailsLoading } =
    useGetPostDetailsQuery(postId);
  const [fileUpload, { isLoading: isFileUploading }] = useFileUploadMutation();
  const [updatePost, { isLoading }] = useUpdatePostMutation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();

  if (!currentUser?._id && isMounted) {
    return <AuthPrompt />;
  }

  const onSubmit: SubmitHandler<TCreatePostValue> = async (formData) => {
    try {
      let uploadedFiles: TFile[] = [];

      if (formData.files) {
        for (const file of formData.files) {
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
        ...formData,
        files: uploadedFiles,
        monetization: isMonetized,
        _id: postId,
      };

      const res = await updatePost(bodyData as TUpdatePostRequest).unwrap();
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
        <div>
          <Text variant="h2" className="mb-6 text-center">
            Edit Your Post
          </Text>
          <Text
            variant="p4"
            style={{ textAlign: "center", maxWidth: 600, margin: "auto" }}
            className="text-black pb-16"
          >
            Update the details of your pet care tip or story to keep it fresh
            and relevant for the PetMate community. Share the latest advice,
            tips, or new insights that will help others care for their pets.
          </Text>
        </div>
        {PostDetailsLoading || !isMounted ? (
          <LoadingSpinner />
        ) : (
          <PostForm
            isLoading={isFileUploading || isLoading}
            onSubmit={onSubmit}
            isUpdate={true}
            isMonetized={isMonetized}
            setIsMonetized={setIsMonetized}
            initialPostValues={data?.data as TPost}
          />
        )}
      </div>
    </Container>
  );
};

export default EditPost;
