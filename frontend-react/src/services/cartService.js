import api from "../api/axios.js";

export const getCartItemsCount = async () => {
    try {
        const response = await api.get("/cart/getCartItemsCount");
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const getCartItems = async () => {
    try {
        const response = await api.get("/cart/getCartItems");
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const addToCart = async (data) => {
    try {
        const response = await api.post("/cart/addToCart", { ...data });
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const updateToCart = async (id, data) => {
    try {
        const response = await api.put(`/cart/updateToCart/${id}`, { ...data });
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const deleteCartItem = async (id) => {
    try {
        const response = await api.delete(`/cart/deleteCartItem/${id}`);
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};