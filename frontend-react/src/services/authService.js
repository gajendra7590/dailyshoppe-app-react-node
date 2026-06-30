import api from "../api/axios.js";

export const loginSubmit = async (formData) => {
    try {
        const response = await api.post("/auth/login", {
            ...formData
        });
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const registerSubmit = async (formData) => {
    try {
        const response = await api.post("/auth/register", {
            ...formData
        });
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const accountVerify = async (formData) => {
    try {
        const response = await api.post("/auth/accountVerify", {
            ...formData
        });
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};
