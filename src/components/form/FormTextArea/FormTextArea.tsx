"use client";

import { Form, Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import { Text } from "../../atoms";

type TFormTextAreaProps = {
  name: string;
  label?: string;
};

export const FormTextArea: React.FC<TFormTextAreaProps> = ({ name, label }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={<Text variant="p2">{label}</Text>}>
            <Input.TextArea
              {...field}
              id={name}
              size="large"
              maxLength={2000}
              autoSize={{ minRows: 7, maxRows: 7 }}
              className="font-poppins text-[14px]"
            />
            {error && (
              <Text variant={"p5"} style={{ color: "red" }} className="mt-2">
                {error.message}
              </Text>
            )}
          </Form.Item>
        )}
      />
    </div>
  );
};
