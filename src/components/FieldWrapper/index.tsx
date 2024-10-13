import React, { ReactNode } from "react";
import styles from "./styles.module.scss";
import { FieldTitle } from "../FieldTitle";
import { IFieldProps } from "../../interfaces";

interface IFieldWrapper extends IFieldProps {
  children: ReactNode;
}
export const FieldWrapper = ({
  required,
  label,
  children,
  error,
}: IFieldWrapper) => {
  return (
    <div className={styles["field-wrapper"]}>
      <FieldTitle required={required}>{label}</FieldTitle>
      {children}
      <p className={styles.error}>{error}</p>
    </div>
  );
};
