import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchProducts,
  ProductState,
  setProducts,
} from "../../redux/productSlice";

const useFetchProducts = (): ProductState => {
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

  return { products, status, error, loading };
};

export default useFetchProducts;
