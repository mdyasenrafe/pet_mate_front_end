"use client";

import React from "react";
import { Button, Text } from "@/components/atoms";
import { Modal } from "@/components/Modal";
import { FormWrapper } from "@/components/form/FormWrapper";
import { FormInput } from "@/components/form/FormInput";
import { FormUpload } from "@/components/form/FormUpload";
import { TUser } from "@/redux/features/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "@/schema";
import { TUpdateValue, useUpdateMutation } from "@/redux/features/users";
import { toast } from "sonner";
import { useFileUploadMutation } from "@/api/updloadApi";

type EditProfileModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  loggedInUser: TUser;
};

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isModalOpen,
  closeModal,
  loggedInUser,
}) => {
  const [editProfile, { isLoading }] = useUpdateMutation();
  const [imageUpload, { isLoading: imageLoading }] = useFileUploadMutation();

  const handleEditProfileSubmit = async (data: TUpdateValue) => {
    try {
      if (data.profilePicture !== loggedInUser?.profilePicture) {
        const thumbRes = await imageUpload({
          file: data.profilePicture,
        }).unwrap();
        data.profilePicture = thumbRes?.data?.url;
      } else {
        data.profilePicture = loggedInUser?.profilePicture;
      }

      const response = await editProfile(data).unwrap();
      toast.success("Profile updated successfully");
      closeModal();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile.");
    }
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      title="Edit Profile"
    >
      <FormWrapper
        onSubmit={handleEditProfileSubmit}
        resolver={zodResolver(updateUserSchema)}
        defaultValues={loggedInUser as TUser}
      >
        <FormInput name="name" label="Name" placeholder="Enter your new name" />
        <FormUpload
          name="profilePicture"
          label="Upload new profile picture"
          defaultValue={[loggedInUser?.profilePicture as string]}
        />

        <Button
          htmlType="submit"
          customColor="primary"
          className="w-full !h-[44px] mt-4"
          loading={isLoading || imageLoading}
          disabled={isLoading || imageLoading}
        >
          <Text className="text-white" variant="p3">
            Save Changes
          </Text>
        </Button>
      </FormWrapper>
    </Modal>
  );
};
