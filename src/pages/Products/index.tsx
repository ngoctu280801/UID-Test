import { Select, Table, Tag } from "antd";
import { useMemo } from "react";
import styles from "./styles.module.scss";
import { useQueryParams } from "../../hooks";
import useFetchProducts from "../../hooks/useFetchProducts";

const columns = [
  {
    title: "Image",
    dataIndex: "images",
    key: "image",
    render: (images: string) => (
      <img src={images[0]} alt="Product" width={50} />
    ),
  },
  {
    title: "Product Title",
    dataIndex: "title",
    key: "title",
    render: (title: string) => (
      <span>{title.length > 50 ? title.slice(0, 50) + "..." : title}</span>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price: number) => <span>${price.toFixed(2)}</span>,
  },
  {
    title: "Product Type",
    dataIndex: "productType",
    key: "productType",
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    render: (tags: string[]) => (
      <>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </>
    ),
  },
];

const getTags = (tagList: string[][]) => {
  let result: string[] = [];
  for (let i = 0; i < tagList.length; i++) {
    result = [...result, ...tagList[i]];
  }
  return result;
};

export const Products = () => {
  const { appendQueryParams, queryParams } = useQueryParams();

  const defaultValues = useMemo(
    () =>
      ((queryParams?.tags as string[]) || [])?.map((tag) => ({
        label: tag,
        value: tag,
      })),
    []
  );

  const { products, error, loading } = useFetchProducts();

  const tags = useMemo(
    () => products.map((product) => product.tags),
    [products]
  );

  const tagOptions = [...new Set(getTags(tags))].map((tag) => ({
    value: tag,
    label: tag,
  }));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className={styles.products}>
      <Select
        labelInValue
        filterOption={false}
        options={tagOptions}
        style={{ width: "100%" }}
        mode="multiple"
        defaultValue={defaultValues}
        onChange={(tags) => {
          appendQueryParams({
            tags: tags?.map((tag: { value: string }) => tag.value),
          });
        }}
      />
      <Table columns={columns} dataSource={products} />
    </div>
  );
};

export default Products;
