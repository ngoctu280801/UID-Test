import { ReactNode } from "react";
import cl from "classnames";
import styles from "./styles.module.scss";

type TFieldTitleProps = {
  [key: string]: ReactNode;
  required?: boolean;
};
export const FieldTitle = ({
  required,
  children,
  ...props
}: TFieldTitleProps) => {
  return (
    <div className={cl(styles["field-title"])} {...props}>
      {children} {required && <span className={styles.required}>*</span>}
    </div>
  );
};
