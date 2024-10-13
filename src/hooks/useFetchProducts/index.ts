import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchProducts,
  ProductState,
  setProducts,
} from "../../redux/productSlice";

const useFetchProducts = ({ tags }: { tags?: string[] }): ProductState => {
  const dispatch: AppDispatch = useDispatch();

  const { products, status, error, loading } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      dispatch(setProducts(JSON.parse(savedProducts)));
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

  return { products: filteredProducts, status, error, loading };
};

export default useFetchProducts;
