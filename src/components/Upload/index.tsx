import { useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload as UploadAntd } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { FieldWrapper } from "../FieldWrapper";
import { IFieldProps } from "../../interfaces";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface IUploadProps extends IFieldProps {
  onChange: (files: UploadFile<File>[]) => void;
}

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
  });

export const Upload = ({ label, onChange, error, required }: IUploadProps) => {
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
    return false;
  };
  return (
    <>
      <FieldWrapper label={label} error={error} required={required}>
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
