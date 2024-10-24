"use client";

import { Form, Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import { Text } from "../../atoms";
import { TextAreaProps } from "antd/es/input";
import { PiDropSimpleLight } from "react-icons/pi";

type TFormTextAreaProps = TextAreaProps & {
  name: string;
  label?: string;
};

export const FormTextArea: React.FC<TFormTextAreaProps> = ({
  name,
  label,
  ...props
}) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item>
            <Input.TextArea
              {...field}
              {...props}
              id={name}
              size="large"
              maxLength={2000}
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
