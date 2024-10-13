import { Select as SelectAntd, SelectProps } from "antd";
import { FieldWrapper } from "../FieldWrapper";
import { IFieldProps } from "../../interfaces";

interface ISelectProps extends SelectProps, IFieldProps {}

export const Select = ({ label, ...props }: ISelectProps) => {
  return (
    <FieldWrapper label={label}>
      <SelectAntd
        showSearch
        placeholder="Search to Select"
        optionFilterProp="label"
        {...props}
      />
    </FieldWrapper>
  );
};
