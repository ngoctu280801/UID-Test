/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Editor, Input, TagContainer, Upload } from "../../components";
import { Select } from "../../components/Select";
import { CATEGORIES } from "../../constants";
import styles from "./styles.module.scss";
import { Button } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./schema";

export const CreateProduct = () => {
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        className={styles["create-product"]}
        onSubmit={handleSubmit((data) => console.log("submit", data))}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input label="Title" {...field} error={errors?.title?.message} />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Editor
              label="Description"
              value={field.value}
              onEditorChange={(content) => field.onChange(content)}
              error={errors?.description?.message}
            />
          )}
        />

        <Upload
          label="Media"
          error={errors?.media?.message}
          onChange={(files) => setValue("media", files as any)}
        />
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select options={CATEGORIES} label="Category" {...field} />
          )}
        />
        <Controller
          name="pricing"
          control={control}
          render={({ field }) => (
            <Input
              label="Pricing"
              type="number"
              {...field}
              error={errors?.pricing?.message}
            />
          )}
        />
        <Controller
          name="productType"
          control={control}
          render={({ field }) => <Input label="Product type" {...field} />}
        />

        <TagContainer
          label="Tags"
          onChange={(tags) => setValue("tags", tags as any)}
        />
        <Button htmlType="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default CreateProduct;
