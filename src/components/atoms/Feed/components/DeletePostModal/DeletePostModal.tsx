import { Modal } from "@/components";
import { Button, Text } from "@/components/atoms";
import { useDeletePostMutation } from "@/redux/features/post/post.api";
import { type } from "os";
import React from "react";
import { toast } from "sonner";

type DeletePostModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  postId: string;
};

export const DeletePostModal: React.FC<DeletePostModalProps> = ({
  isModalOpen,
  closeModal,
  postId,
}) => {
  const [deletePost, { isLoading }] = useDeletePostMutation();

  const handleDelete = async () => {
    const res = await deletePost(postId).unwrap();
    toast.success(res?.message || "Post deleted successfully");
    try {
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      title="Confirm Delete"
    >
      <Text>Are you sure you want to delete this post?</Text>
      <div className="mt-6">
        <Button
          danger
          onClick={handleDelete}
          disabled={isLoading}
          loading={isLoading}
        >
          Delete
        </Button>
        <Button onClick={closeModal} className="ml-3">
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
