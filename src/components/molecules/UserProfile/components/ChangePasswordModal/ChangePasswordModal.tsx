"use client";

import React from "react";
import { Modal } from "@/components/Modal";
import { FormInput, FormWrapper } from "@/components/form";
import { Button } from "@/components/atoms";
import { zodResolver } from "@hookform/resolvers/zod";
import { userChangePasswordSchema } from "@/schema";
import { useChangePasswordMutation } from "@/redux/features/auth";
import { toast } from "sonner";
import { SubmitHandler } from "react-hook-form";

type ChangePasswordModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
};

type TChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isModalOpen,
  closeModal,
}) => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleFormSubmit: SubmitHandler<TChangePassword> = async (data) => {
    try {
      const response = await changePassword(data).unwrap();
      toast.success("Password changed successfully");
      closeModal();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      title="Change Password"
    >
      <FormWrapper
        onSubmit={handleFormSubmit}
        resolver={zodResolver(userChangePasswordSchema)}
      >
        <FormInput name="oldPassword" label="Old Password" type="password" />
        <FormInput name="newPassword" label="New Password" type="password" />
        <Button
          customColor="primary"
          className="w-full mt-4"
          loading={isLoading}
          disabled={isLoading}
          htmlType="submit"
        >
          Update Password
        </Button>
      </FormWrapper>
    </Modal>
  );
};
