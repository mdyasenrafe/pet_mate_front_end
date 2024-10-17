"use client";

import { Form, TimePicker } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import { Text } from "../../atoms";

type FormTimePickerProps = {
  label: string;
  name: string;
};

export const FormTimePicker: React.FC<FormTimePickerProps> = ({
  label,
  name,
}) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={<Text variant="p2">{label}</Text>}>
          <TimePicker
            {...field}
            style={{ width: "100%" }}
            size={"large"}
            className={`font-poppins text-[14px] `}
            format="h:mm a"
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};
