import api from "../api/axios.js";

export const getHeaderCategories = async () => {
    try {
        const response = await api.get("/homeTopCategories");
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const getShopByCategories = async () => {
    try {
        const response = await api.get("/shopByCategory");
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const filterByCategories = async () => {
    try {
        const response = await api.get("/filterByCategories");
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const getFeaturedProducts = async () => {
    try {
        const response = await api.get("/featuredProducts");
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const submitContactUs = async (formData) => {
    try {
        const response = await api.post("/submitContactUs", formData);
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const submitSubscribeNewsLetter = async (formData) => {
    try {
        const response = await api.post("/submitSubscribeNewsLetter", formData);
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};