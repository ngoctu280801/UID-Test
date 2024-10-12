import { Editor, Input, TagContainer, Upload } from "../../components";
import { Select } from "../../components/Select";
import { CATEGORIES } from "../../constants";
import styles from "./styles.module.scss";

export const CreateProduct = () => {
  return (
    <div className={styles["create-product"]}>
      <Input label="Title" />
      <Editor label="Description" />
      <Upload label="Media" />
      <Select options={CATEGORIES} label="Category" />
      <Input label="Pricing" type="number" />
      <Input label="Product type" />
      <TagContainer label="Tags" />
    </div>
  );
};

export default CreateProduct;
