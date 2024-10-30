import React from "react";
import { Text } from "../Text";

interface SectionHeaderProps {
  title: string;
  description: string;
  maxWidth?: number;
  className?: string;
}

export const AdminSectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  maxWidth = 600,
  className = "",
}) => {
  return (
    <div className={`mt-6 ${className}`}>
      <Text variant="h2" className="text-center mb-4 text-black">
        {title}
      </Text>
      <Text
        variant="p3"
        style={{ textAlign: "center", maxWidth: maxWidth, margin: "auto" }}
        className="text-black pb-16"
      >
        {description}
      </Text>
    </div>
  );
};
