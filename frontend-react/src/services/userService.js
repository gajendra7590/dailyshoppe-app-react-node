import api from "../api/axios.js";

export const getUserProfile = async () => {
    try {
        const response = await api.get("/user/getProfile");
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const updateUserProfile = async (formData) => {
    try {
        const response = await api.post("/user/updateProfile", formData, {
            headers: {
                "Content-Type":
                    "multipart/form-data"
            }
        });
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const changeUserPassword = async (formData) => {
    try {
        const response = await api.post("/user/changePassword", {
            ...formData
        });
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};
