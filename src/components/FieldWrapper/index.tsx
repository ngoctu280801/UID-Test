import React, { ReactNode } from "react";
import styles from "./styles.module.scss";
import { FieldTitle } from "../FieldTitle";

export const FieldWrapper = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  return (
    <div className={styles["field-wrapper"]}>
      <FieldTitle>{label}</FieldTitle>
      {children}
    </div>
  );
};
