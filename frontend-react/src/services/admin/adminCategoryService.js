import api from '../../api/axios';

export const getAdminCategories = async ({ page = 1, limit = 10, search = '', sortOrder = '_id', status = true }) => {
    try {
        const response = await api.get("/admin/categories", { params: { page, limit, search, sortOrder, status } });
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const getOneAdminCategories = async (id) => {
    try {
        const response = await api.get(`/admin/categories/${id}`);
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};


export const createAdminCategories = async (data) => {
    try {
        const response = await api.post("/admin/categories", data, {
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

export const updateAdminCategories = async (id, formReqData) => {
    try {
        const response = await api.post(`/admin/categories/${id}`, formReqData, {
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

export const deleteAdminCategories = async (id) => {
    try {
        const response = await api.delete(`/admin/categories/${id}`);
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};