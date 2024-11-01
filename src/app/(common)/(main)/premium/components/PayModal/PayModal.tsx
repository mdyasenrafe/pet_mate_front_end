import { Modal } from "@/components";
import { PaymentSection } from "@/components/atoms";
import React from "react";

type PayModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  clientSecret: string;
  paymentIntentId: string;
};

export const PayModal: React.FC<PayModalProps> = ({
  isModalOpen,
  closeModal,
  clientSecret,
  paymentIntentId,
}) => {
  return (
    <Modal
      title="Complete Your Payment"
      isModalOpen={isModalOpen}
      closeModal={closeModal}
    >
      <PaymentSection
        clientSecret={clientSecret}
        paymentIntentId={paymentIntentId}
      />
    </Modal>
  );
};
