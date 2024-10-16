import { Select, Table, TablePaginationConfig, Tag } from "antd";
import { useMemo, useState } from "react";
import styles from "./styles.module.scss";
import { useQueryParams } from "../../hooks";
import useProductApi from "../../hooks/useProductApi";
import { Spinner } from "../../components";
import { DeleteOutlined } from "@ant-design/icons";
import { DeleteModal } from "./DeleteModal";

const getTags = (tagList: string[][]) => {
  let result: string[] = [];
  for (let i = 0; i < tagList.length; i++) {
    result = [...result, ...tagList[i]];
  }
  return result;
};

export const Products = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState<number>();

  const { appendQueryParams, queryParams } = useQueryParams();

  const defaultValues = useMemo(
    () =>
      ((queryParams?.tags as string[]) || [])?.map((tag) => ({
        label: tag,
        value: tag,
      })),
    []
  );

  const { products, error, loading, deleteProduct } = useProductApi({
    tags: (queryParams?.tags as string[]) || undefined,
  });

  const tags = useMemo(
    () => products.map((product) => product.tags),
    [products]
  );

  const tagOptions = [...new Set(getTags(tags))].map((tag) => ({
    value: tag,
    label: tag,
  }));

  const onChange = (pagination: TablePaginationConfig) => {
    appendQueryParams({ page: pagination.current });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (productId: number) => {
    deleteProduct(productId);
    handleClose();
  };

  const handleOpenModal = (productId: number) => {
    setOpen(true);
    setProductId(productId);
  };

  const columns = useMemo(
    () => [
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
      {
        dataIndex: "id",
        key: "id",
        // align: "center",
        render: (id: number) => (
          <button
            className={styles["delete-btn"]}
            onClick={() => handleOpenModal(id)}
          >
            <DeleteOutlined />
          </button>
        ),
      },
    ],
    []
  );

  if (loading) return <Spinner />;

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
      <Table
        columns={columns}
        dataSource={products}
        pagination={{
          pageSize: 10,
          current: (queryParams?.page as number) || 1,
        }}
        onChange={onChange}
      />
      <DeleteModal
        handleConfirm={() => handleDelete(productId as number)}
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Products;
