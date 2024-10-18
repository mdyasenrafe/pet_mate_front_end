import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Form, Image, Upload } from "antd";
import { UploadProps } from "antd/lib/upload";
import { FaUpload } from "react-icons/fa";
import { Button, Text } from "../../atoms";

interface TFormUploadProps {
  name: string; // Use this to differentiate between thumb and cover pictures
  label?: string;
  multiple?: boolean;
  uploadProps?: UploadProps;
  defaultValue?: string | string[];
}

export const FormUpload: React.FC<TFormUploadProps> = React.forwardRef(
  (
    { name, label = "Upload", multiple = false, uploadProps, defaultValue },
    ref
  ) => {
    const { control, setValue } = useFormContext();

    useEffect(() => {
      if (defaultValue?.length !== 0 && defaultValue !== "") {
        if (
          name === "profilePicture" &&
          defaultValue !== "" &&
          defaultValue?.length !== 0 &&
          defaultValue
        ) {
          setValue(name, defaultValue[0], { shouldValidate: true });
        } else {
          setValue(name, defaultValue, { shouldValidate: true });
        }
      }
    }, [defaultValue]);

    const generateDefaultFileList = (urls: string | string[]) => {
      if (!urls || urls == "") return [];

      const fileList = Array.isArray(urls) ? urls : [urls];
      return fileList.map((url, index) => ({
        uid: index.toString(),
        name: url?.split("/").pop() || "image",
        status: "done" as const,
        url,
      }));
    };

    const handleFileChange = async (info: any) => {
      const files = await Promise.all(
        info.fileList.map(async (file: any) => {
          if (file.originFileObj) {
            const base64 = await getBase64(file.originFileObj); // Convert to base64 for form storage
            file.base64 = base64; // Store base64 in the file object for form submission
            file.preview = URL.createObjectURL(file.originFileObj); // Create object URL for preview
          }
          return file.base64;
        })
      );
      setValue(name, multiple ? files : files[0], { shouldValidate: true });
    };
    // Convert file to Base64
    const getBase64 = (file: Blob) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const result = reader.result as string;
          const base64Data = result.split(",")[1];
          resolve(result);
        };
        reader.onerror = (error) => reject(error);
      });

    const isProfilePicture = name === "profilePicture";

    const handlePreview = async (file: any) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as any);
      }
      window.open(file.url || file.preview, "_blank");
    };

    return (
      <div className="mb-5">
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              label={<Text variant="p4">{label}</Text>}
              help={
                error && (
                  <Text variant={"p6"} style={{ color: "red" }}>
                    {error.message}
                  </Text>
                )
              }
            >
              <Upload
                {...field}
                {...uploadProps}
                ref={ref}
                beforeUpload={() => false}
                onChange={handleFileChange}
                multiple={multiple}
                listType={isProfilePicture ? "picture" : "picture-card"}
                maxCount={multiple ? undefined : 1}
                accept=".jpeg,.jpg,.png"
                onPreview={handlePreview}
                defaultFileList={generateDefaultFileList(
                  defaultValue as string | string[]
                )}
              >
                {!isProfilePicture ? (
                  <button
                    className="flex justify-center items-center"
                    type="button"
                  >
                    <FaUpload />
                    <Text variant={"p6"} className="ml-2">
                      Upload
                    </Text>
                  </button>
                ) : (
                  <Button iconPosition="start" icon={<FaUpload />}>
                    Upload
                  </Button>
                )}
              </Upload>
            </Form.Item>
          )}
        />
      </div>
    );
  }
);
