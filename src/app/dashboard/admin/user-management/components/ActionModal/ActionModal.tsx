import React from "react";
import { Modal } from "antd";
import { TUser } from "@/redux/features/auth";
import { Button, Text } from "@/components/atoms";

type ActionModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  actionType: "updateRole" | "delete";
  selectedUser: TUser | null;
  onConfirm: () => void;
};

export const ActionModal: React.FC<ActionModalProps> = ({
  isModalOpen,
  closeModal,
  actionType,
  selectedUser,
  onConfirm,
}) => {
  return (
    <Modal
      title={
        actionType === "updateRole"
          ? "Update User Role to Admin"
          : "Delete User"
      }
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
      centered
    >
      {selectedUser && (
        <>
          {actionType === "updateRole" ? (
            <Text>
              Are you sure you want to update {selectedUser.name}'s role to
              Admin?
            </Text>
          ) : (
            <Text variant="h4">
              Are you sure you want to delete {selectedUser.name}?
            </Text>
          )}

          <div className="mt-6 flex justify-between">
            <Button
              customColor="primary"
              danger
              onClick={onConfirm}
              className="w-[48%]"
            >
              Yes
            </Button>
            <Button onClick={closeModal} className="w-[48%]">
              No
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};
