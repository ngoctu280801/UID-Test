import { Input as InputAntd, InputProps as InputPropsAntd } from "antd";
import { FieldWrapper } from "../FieldWrapper";

type InputProps = { label: string } & InputPropsAntd;
export const Input = ({ label, ...props }: InputProps) => {
  return (
    <FieldWrapper label={label}>
      <InputAntd {...props} />
    </FieldWrapper>
  );
};
