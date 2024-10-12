import { Select, Table, Tag } from "antd";
import React, { useMemo } from "react";
import styles from "./styles.module.scss";
import { useQueryParams } from "../../hooks";

const products = [
  {
    id: 1,
    title: "Product One",
    description: "This is the description for product one.",
    price: 29.99,
    productType: "Type A",
    tags: ["tag1", "tag2"],
    images: [
      "https://via.placeholder.com/150/92c952",
      "https://via.placeholder.com/150/771796",
    ],
  },
  {
    id: 2,
    title: "Product Two",
    description: "This is the description for product two.",
    price: 39.99,
    productType: "Type B",
    tags: ["tag2", "tag3"],
    images: [
      "https://via.placeholder.com/150/24f355",
      "https://via.placeholder.com/150/d32776",
    ],
  },
  {
    id: 3,
    title: "Product Three",
    description: "This is the description for product three.",
    price: 19.99,
    productType: "Type A",
    tags: ["tag1", "tag4"],
    images: [
      "https://via.placeholder.com/150/f66b20",
      "https://via.placeholder.com/150/56a8c2",
    ],
  },
  {
    id: 4,
    title: "Product Four",
    description: "This is the description for product four.",
    price: 49.99,
    productType: "Type C",
    tags: ["tag3", "tag4"],
    images: [
      "https://via.placeholder.com/150/4cae4c",
      "https://via.placeholder.com/150/c2c2c2",
    ],
  },
  {
    id: 5,
    title: "Product Five",
    description: "This is the description for product five.",
    price: 99.99,
    productType: "Type D",
    tags: ["tag1", "tag2", "tag5"],
    images: [
      "https://via.placeholder.com/150/5c4d7a",
      "https://via.placeholder.com/150/6b9bd1",
    ],
  },
];

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

  const tags = useMemo(
    () => products.map((product) => product.tags),
    [products]
  );

  const tagOptions = [...new Set(getTags(tags))].map((tag) => ({
    value: tag,
    label: tag,
  }));

  const defaultValues = useMemo(
    () =>
      ((queryParams?.tags as string[]) || [])?.map((tag) => ({
        label: tag,
        value: tag,
      })),
    []
  );

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
