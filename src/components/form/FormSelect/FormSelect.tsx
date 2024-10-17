"use client";

import React from "react";
import { Select, Form, SelectProps } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { Text } from "../../atoms";

type TFormSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
} & SelectProps;

export const FormSelect: React.FC<TFormSelectProps> = React.forwardRef(
  ({ name, label, options, ...props }, ref) => {
    const { control } = useFormContext();
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <Form.Item label={<Text variant="p2">{label}</Text>}>
              <Select
                style={{ width: "100%", fontSize: 14 }}
                {...props}
                {...field}
                ref={ref as any}
                options={options}
                size="large"
                allowClear
                className={`font-poppins text-[14px] ${
                  error && "border-red-500"
                }`}
              />
              {error && (
                <Text variant={"p6"} style={{ color: "red" }}>
                  {error.message}
                </Text>
              )}
            </Form.Item>
          );
        }}
      />
    );
  }
);

FormSelect.displayName = "FormSelect";
