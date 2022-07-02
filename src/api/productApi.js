import axiosClient from "./apiClient";

const ProductApi = {
  getAll: (params) => {
    return axiosClient.get("/product", { params });
  },
  getProductById: (id) => {
    return axiosClient.get(`/product/${id}`);
  },
  getProductByCategory: (id) => {
    return axiosClient.get(`/product/category/${id}`);
  },
  getProductByType: (id) => {
    return axiosClient.get(`/product/type/${id}`);
  },
  getComments: (id, params) => {
    return axiosClient.get(`/product/comment/${id}`, { params });
  },
  postComment: (params) => {
    return axiosClient.post(`/product/comment/add`, params);
  },
};

export default ProductApi;
