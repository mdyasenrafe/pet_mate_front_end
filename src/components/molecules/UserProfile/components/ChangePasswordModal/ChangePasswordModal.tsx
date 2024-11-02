"use client";

import React from "react";
import { Modal } from "@/components/Modal";
import { FormInput, FormWrapper } from "@/components/form";
import { Button } from "@/components/atoms";

type ChangePasswordModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  onSubmit: (data: { oldPassword: string; newPassword: string }) => void;
};

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isModalOpen,
  closeModal,
  onSubmit,
}) => {
  const handleFormSubmit = (data: {
    oldPassword: string;
    newPassword: string;
  }) => {
    onSubmit(data);
    closeModal();
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      title="Change Password"
    >
      <FormWrapper onSubmit={handleFormSubmit}>
        <FormInput name="oldPassword" label="Old Password" type="password" />
        <FormInput name="newPassword" label="New Password" type="password" />
        <Button customColor="primary" className="w-full mt-4">
          Update Password
        </Button>
      </FormWrapper>
    </Modal>
  );
};
