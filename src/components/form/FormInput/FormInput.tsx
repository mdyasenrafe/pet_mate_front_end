"use client";

import React from "react";
import { Input, Form, InputProps } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { Text } from "../../atoms";

type TFormInputProps = {
  name: string;
  label?: string;
  divStyle?: React.CSSProperties;
} & InputProps;

export const FormInput: React.FC<TFormInputProps> = React.forwardRef(
  ({ name, label, divStyle, ...props }, ref) => {
    const defaultStyle: React.CSSProperties = {
      marginBottom: "20px",
    };
    return (
      <div style={{ ...defaultStyle, ...divStyle }}>
        <Controller
          name={name}
          render={({ field, fieldState: { error } }) => {
            return (
              <Form.Item
                label={label && <Text variant="p2">{label}</Text>}
                className="font-poppins mb-0 border-0"
              >
                <Input
                  {...field}
                  {...props}
                  ref={ref as any}
                  id={name}
                  size="large"
                  className={`font-poppins text-[14px] `}
                />
                {error && (
                  <Text
                    variant={"p5"}
                    style={{ color: "red" }}
                    className="mt-2"
                  >
                    {error.message}
                  </Text>
                )}
              </Form.Item>
            );
          }}
        />
      </div>
    );
  }
);
