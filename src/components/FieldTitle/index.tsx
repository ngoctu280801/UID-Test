import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

type TFieldTitleProps = {
  [key: string]: ReactNode;
};
export const FieldTitle = ({ children, ...props }: TFieldTitleProps) => {
  return (
    <div className={styles["field-title"]} {...props}>
      {children}
    </div>
  );
};
