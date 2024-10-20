"use client";

import { Text } from "@/components/atoms";
import dynamic from "next/dynamic";
import React from "react";
import { Controller } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type FormReactQuiliProps = {
  label: string;
  name: string;
  placeholder: string;
};

export const FormReactQuili: React.FC<FormReactQuiliProps> = ({
  name,
  label,
  placeholder,
}) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <React.Fragment>
            <Text variant="p4" className="mb-2">
              {label}
            </Text>
            <ReactQuill
              {...field}
              theme="snow"
              placeholder={placeholder}
              value={field.value}
              onChange={(text) => {
                field.onChange(text);
              }}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </React.Fragment>
        );
      }}
    />
  );
};
