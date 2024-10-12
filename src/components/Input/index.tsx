import { Input as InputAntd, InputProps as InputPropsAntd } from "antd";
import { FieldWrapper } from "../FieldWrapper";

type InputProps = { label: string; error?: string } & InputPropsAntd;

export const Input = ({ label, error, ...props }: InputProps) => {
  return (
    <FieldWrapper label={label} error={error}>
      <InputAntd {...props} />
    </FieldWrapper>
  );
};
