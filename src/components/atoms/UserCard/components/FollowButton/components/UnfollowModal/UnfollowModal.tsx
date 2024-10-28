import React from "react";
import { Button, Text } from "@/components/atoms";
import { Modal } from "@/components/Modal";

type UnfollowModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  onConfirmUnfollow: () => void;
  username?: string;
};

export const UnfollowModal: React.FC<UnfollowModalProps> = ({
  isModalOpen,
  closeModal,
  onConfirmUnfollow,
  username = "this user",
}) => {
  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      title="Confirm Unfollow"
      centered
    >
      <Text variant="p3">Are you sure you want to unfollow {username}?</Text>
      <div className="flex justify-end space-x-4 mt-4">
        <Button onClick={closeModal}>No</Button>
        <Button customColor="primary" onClick={onConfirmUnfollow}>
          Yes, Unfollow
        </Button>
      </div>
    </Modal>
  );
};
