import { Flex, Spin } from "antd";
import { SpinSize } from "antd/es/spin";
import React from "react";

type LoadingSpinnerProps = {
  size?: SpinSize;
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "large",
}) => {
  return (
    <Flex align="center" gap="middle" justify="center" className="h-[200px]">
      <Spin size={size} />
    </Flex>
  );
};
