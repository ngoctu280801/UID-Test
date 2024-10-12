import React, { ReactNode } from "react";
import styles from "./styles.module.scss";
import { FieldTitle } from "../FieldTitle";

export const FieldWrapper = ({
  label,
  children,
  error,
}: {
  label: string;
  children: ReactNode;
  error?: string;
}) => {
  return (
    <div className={styles["field-wrapper"]}>
      <FieldTitle>{label}</FieldTitle>
      {children}
      <p className={styles.error}>{error}</p>
    </div>
  );
};
