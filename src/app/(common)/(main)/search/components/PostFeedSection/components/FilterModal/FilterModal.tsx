import React from "react";
import { Select } from "antd";
import { Modal } from "@/components/Modal";
import { Button, Text } from "@/components/atoms";

type FilterModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  tempParams: { category?: string; monetization?: string };
  handleTempParamsChange: (name: string, value: any) => void;
  handleApplyFilters: () => void;
  handleResetFilters: () => void;
};

export const FilterModal: React.FC<FilterModalProps> = ({
  isModalOpen,
  closeModal,
  tempParams,
  handleTempParamsChange,
  handleApplyFilters,
  handleResetFilters,
}) => {
  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      title="Filter Options"
    >
      <div>
        <Text variant="p3" className="mb-4">
          Select filter options to refine your search.
        </Text>

        <label className="block text-sm mb-2">Category</label>
        <Select
          value={tempParams.category}
          defaultValue="Category"
          style={{ width: "100%", marginBottom: "20px" }}
          onChange={(value) => handleTempParamsChange("category", value)}
          options={[
            { label: "Tips", value: "tip" },
            { label: "Stories", value: "story" },
          ]}
        />

        <label className="block text-sm mb-2">Monetization</label>
        <Select
          value={tempParams.monetization}
          defaultValue="Monetization"
          style={{ width: "100%" }}
          onChange={(value) => handleTempParamsChange("monetization", value)}
          options={[
            { label: "Monetized", value: true },
            { label: "Non-monetized", value: false },
          ]}
        />
      </div>

      <Button
        onClick={handleApplyFilters}
        customColor="primary"
        className="mt-4 mr-4"
      >
        Apply Filters
      </Button>

      <Button onClick={handleResetFilters} className="mt-4">
        Reset Filters
      </Button>
    </Modal>
  );
};
