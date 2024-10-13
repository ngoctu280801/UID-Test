import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import styles from "./styles.module.scss";

const antIcon = <LoadingOutlined className={styles.spinner__icon} spin />;

export const Spinner = () => {
  return (
    <div className={styles["page-overlay-wrapper"]}>
      <div className={styles["spinner"]}>
        <Spin
          className={styles.loading__icon}
          size="large"
          indicator={antIcon}
        />
      </div>
    </div>
  );
};
