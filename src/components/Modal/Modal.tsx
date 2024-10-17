import React, { useCallback } from "react";
import { Modal as RModal, ModalProps as AntModalProps } from "antd";

interface ModalProps
  extends Omit<AntModalProps, "title" | "visible" | "onCancel"> {
  isModalOpen: boolean;
  closeModal: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isModalOpen,
  closeModal,
  title,
  children,
  ...props
}) => {
  const handleOk = useCallback(() => {
    closeModal();
  }, [closeModal]);

  return (
    <RModal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={closeModal}
      footer={null}
      {...props}
    >
      {children}
    </RModal>
  );
};
