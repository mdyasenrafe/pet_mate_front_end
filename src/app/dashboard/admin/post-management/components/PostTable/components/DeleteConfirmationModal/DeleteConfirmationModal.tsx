import React from "react";
import { Button } from "@/components/atoms/Button";
import { Space } from "antd";
import { Modal } from "@/components";

type DeleteConfirmationModalProps = {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const DeleteConfirmationModal: React.FC<
  DeleteConfirmationModalProps
> = ({ isVisible, onConfirm, onCancel }) => {
  return (
    <Modal
      title="Confirm Deletion"
      isModalOpen={isVisible}
      closeModal={onCancel}
    >
      <p>Are you sure you want to delete this post?</p>
      <Space style={{ marginTop: 16 }}>
        <Button customColor="red" onClick={onConfirm}>
          Confirm
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Space>
    </Modal>
  );
};
