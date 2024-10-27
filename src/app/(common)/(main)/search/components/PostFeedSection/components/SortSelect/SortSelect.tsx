import React from "react";
import { Select } from "antd";

interface SortSelectProps {
  handleSortChange: (value: string) => void;
}

export const SortSelect: React.FC<SortSelectProps> = ({ handleSortChange }) => {
  return (
    <Select
      defaultValue="Sort By"
      style={{ width: 200 }}
      onChange={handleSortChange}
      options={[
        { label: "Most Recent", value: "-createdAt" },
        { label: "Most Upvoted", value: "-upvoteCount" },
        { label: "Most Commented", value: "-commentCount" },
      ]}
    />
  );
};
