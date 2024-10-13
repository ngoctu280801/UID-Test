import Currency, { CurrencyInputProps } from "react-currency-input-field";
import { FieldWrapper } from "../FieldWrapper";
import styles from "./styles.module.scss";

type TCurrencyInputProps = {
  label: string;
  error?: string;
} & CurrencyInputProps;

export const CurrencyInput = ({
  label,
  error,
  ...props
}: TCurrencyInputProps) => {
  return (
    <FieldWrapper label={label} error={error}>
      <Currency className={styles.currency} decimalsLimit={2} {...props} />
    </FieldWrapper>
  );
};
