import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  CurrencyInput,
  Editor,
  Input,
  Spinner,
  TagContainer,
  Upload,
} from "../../components";

import styles from "./styles.module.scss";
import { Button } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./schema";
import useProductApi from "../../hooks/useProductApi";
import { useNavigate } from "react-router-dom";

export const CreateProduct = () => {
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });
  // Simulate loading
  const navigate = useNavigate();
  const { addProduct, loading } = useProductApi({});

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  const onSubmit = async (data: {
    category?: string;
    tags?: string[];
    productType?: string;
    title: string;
    description: string;
    media: File[];
    pricing: number;
  }) => {
    try {
      const formatData = {
        tags: data.tags || [],
        productType: data.productType || "",
        title: data.title,
        description: data.description, // will upload file when have real api
        images: [
          "https://via.placeholder.com/150/92c952",
          "https://via.placeholder.com/150/771796",
        ], // will upload image and get url when have real api
        price: data.pricing,
        id: Math.random(),
      };
      addProduct(formatData);
      navigate("/products");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <Spinner />;

  return (
    <FormProvider {...methods}>
      <form
        className={styles["create-product"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              label="Title"
              {...field}
              error={errors?.title?.message}
              required
            />
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
              required
            />
          )}
        />

        <Upload
          label="Media"
          error={errors?.media?.message}
          onChange={(files) => setValue("media", files)}
          required
        />

        <Controller
          name="pricing"
          control={control}
          render={({ field }) => (
            <CurrencyInput
              label="Pricing"
              onValueChange={field.onChange}
              error={errors?.pricing?.message}
              required
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
          value={watch("tags")}
          onChange={(tags) => setValue("tags", tags)}
        />
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default CreateProduct;
