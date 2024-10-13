import { IAllProps, Editor as TinyEditor } from "@tinymce/tinymce-react";
import { FieldWrapper } from "../FieldWrapper";

export type TEditorProps = {
  label: string;
  error?: string;
} & IAllProps;

export const Editor = ({ label, error, ...props }: TEditorProps) => {
  return (
    <FieldWrapper label={label} error={error}>
      <TinyEditor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        init={{
          height: 400,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
            "code",
            "media",
            "image",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "removeformat | help | image media | code",
          file_picker_types: "image media", // Allow both images and videos
          automatic_uploads: true,
          images_upload_url: "", //upload
        }}
        onChange={(e) => console.log("change", e)}
        {...props}
      />
    </FieldWrapper>
  );
};
