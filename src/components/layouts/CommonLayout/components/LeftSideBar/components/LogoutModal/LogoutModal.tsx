import React from "react";
import { Button, Text } from "@/components/atoms";
import { Modal } from "@/components/Modal";

type LogoutModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  onConfirmLogout: () => void;
};

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isModalOpen,
  closeModal,
  onConfirmLogout,
}) => {
  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      title="Confirm Logout"
      centered
    >
      <Text variant="p3">Are you sure you want to logout?</Text>
      <div className="flex justify-end space-x-4 mt-4">
        <Button onClick={closeModal}>No</Button>
        <Button customColor="primary" onClick={onConfirmLogout}>
          Yes
        </Button>
      </div>
    </Modal>
  );
};
