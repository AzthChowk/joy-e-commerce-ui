import { $axios } from "../AxiosInstance";

export const fetchBuyerProductReviews = async () => {
  return await $axios.post("/product/reviews");
};
