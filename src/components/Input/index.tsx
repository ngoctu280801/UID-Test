import { Input as InputAntd, InputProps as InputPropsAntd } from "antd";
import { FieldWrapper } from "../FieldWrapper";
import { IFieldProps } from "../../interfaces";

interface InputProps extends InputPropsAntd, IFieldProps {}

export const Input = ({ label, error, required, ...props }: InputProps) => {
  return (
    <FieldWrapper label={label} error={error} required={required}>
      <InputAntd {...props} />
    </FieldWrapper>
  );
};
