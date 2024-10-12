import { IAllProps, Editor as TinyEditor } from "@tinymce/tinymce-react";
import { FieldWrapper } from "../FieldWrapper";

export type TEditorProps = {
  label: string;
} & IAllProps;

export const Editor = ({ label, ...props }: TEditorProps) => {
  return (
    <FieldWrapper label={label}>
      <TinyEditor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        init={{
          height: 400,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
        }}
        {...props}
      />
    </FieldWrapper>
  );
};
