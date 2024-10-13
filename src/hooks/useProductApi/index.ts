import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  addProductAsync,
  fetchProducts,
  ProductState,
  setProductsAsync,
} from "../../redux/productSlice";
import { Product } from "../../interfaces";

const useProductApi = ({
  tags,
}: {
  tags?: string[];
}): ProductState & {
  addProduct: (newProduct: Product) => void;
} => {
  const dispatch: AppDispatch = useDispatch();

  const { products, status, error, loading } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      dispatch(setProductsAsync(JSON.parse(savedProducts)));
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  const isExistedTag = (tags1: string[], tags2: string[]) => {
    return tags1.some((tag) => tags2.includes(tag));
  };

  const filteredProducts = useMemo(() => {
    return tags
      ? products?.filter((product) => isExistedTag(product.tags, tags))
      : products;
  }, [tags, products]);

  const addProduct = (newProduct: Product) => {
    dispatch(addProductAsync(newProduct));
  };

  return {
    products: [...filteredProducts].reverse(),
    status,
    error,
    loading,
    addProduct,
  };
};

export default useProductApi;
