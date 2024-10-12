import { Select as SelectAntd, SelectProps } from "antd";
import { FieldWrapper } from "../FieldWrapper";

type TSelectProps = {
  label: string;
} & SelectProps;

export const Select = ({ label, ...props }: TSelectProps) => {
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
