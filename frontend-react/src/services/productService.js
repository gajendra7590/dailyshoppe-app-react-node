import api from "../api/axios.js";

export const getAllProductList = async ({ search, sortBy, sortOrder, categoryId, page, limit }) => {
    try {
        const response = await api.get("/getAllProducts", {
            params: { page, limit, search, sortBy, sortOrder, categoryId },
        });
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const getProductDetail = async (productId) => {
    try {
        const response = await api.get(`/productDetail/${productId}`);
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};  