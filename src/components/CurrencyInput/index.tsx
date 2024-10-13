import Currency, { CurrencyInputProps } from "react-currency-input-field";
import { FieldWrapper } from "../FieldWrapper";
import styles from "./styles.module.scss";
import { IFieldProps } from "../../interfaces";

interface ICurrencyInputProps extends IFieldProps, CurrencyInputProps {}

export const CurrencyInput = ({
  label,
  error,
  required,
  ...props
}: ICurrencyInputProps) => {
  return (
    <FieldWrapper label={label} error={error} required={required}>
      <Currency className={styles.currency} decimalsLimit={2} {...props} />
    </FieldWrapper>
  );
};
