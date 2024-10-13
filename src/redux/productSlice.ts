import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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
    return products; //latest;
  }
);

export const addProductAsync = createAsyncThunk<Product, Product>(
  "products/addProduct",
  async (newProduct) => {
    return await new Promise<Product>((resolve) => {
      setTimeout(() => {
        resolve(newProduct);
      }, 1000);
    });
  }
);

export const setProductsAsync = createAsyncThunk<Product[], Product[]>(
  "products/setProducts",
  async (products, { dispatch }) => {
    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(setProducts(products));
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
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
      localStorage.setItem("products", JSON.stringify(state.products));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
        state.loading = false;
      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = [action.payload, ...state.products];

        localStorage.setItem("products", JSON.stringify(state.products));
        state.loading = false;
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add product";
        state.loading = false;
      })
      .addCase(setProductsAsync.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(setProductsAsync.fulfilled, (state) => {
        state.status = "succeeded";
        state.loading = false;
      })
      .addCase(setProductsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to set products";
        state.loading = false;
      });
  },
});

export const { setProducts, addProduct } = productSlice.actions;
export default productSlice.reducer;
