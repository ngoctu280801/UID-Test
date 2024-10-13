import { Product } from "../interfaces";
import data from "./data.json";

export const fetchMockProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.products);
    }, 1000);
  });
};
