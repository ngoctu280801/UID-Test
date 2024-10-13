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
    return products.reverse(); //latest;
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
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload); // Add the new product to the state
        // Optionally update local storage
        localStorage.setItem("products", JSON.stringify(state.products));
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add product";
      });
  },
});

export const { setProducts, addProduct } = productSlice.actions;
export default productSlice.reducer;
