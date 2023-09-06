import { $axios } from "../AxiosInstance";

export const fetchProducts = async (paginationData) => {
  return await $axios.post("/products", paginationData);
};
