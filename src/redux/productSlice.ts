import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../interfaces";
import { fetchMockProducts } from "../mockApi/mockProducts";

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  status: "idle",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const products = await fetchMockProducts();
    return products;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
