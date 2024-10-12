import React, { useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload as UploadAntd } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { FieldWrapper } from "../FieldWrapper";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type TUploadProps = {
  label: string;
  error?: string;
  onChange: (files: UploadFile<File>[]) => void;
};

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const Upload = ({ label, onChange, error }: TUploadProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    onChange(newFileList);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
    </button>
  );

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      return;
    }
    return isImage;
  };
  return (
    <>
      <FieldWrapper label={label} error={error}>
        <UploadAntd
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          multiple
          beforeUpload={beforeUpload}
          accept="image/*"
        >
          {fileList.length >= 8 ? null : uploadButton}
        </UploadAntd>
      </FieldWrapper>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};
