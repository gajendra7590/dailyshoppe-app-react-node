import api from '../../api/axios';

export const getAdminUsers = async ({ page = 1, limit = 10, search = '', status = '', role = '' }) => {
    try {
        const response = await api.get("/admin/users", { params: { page, limit, search, status, role } });
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const getOneAdminUser = async (id) => {
    try {
        const response = await api.get(`/admin/users/${id}`);
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};


export const createAdminUser = async (data) => {
    try {
        const response = await api.post("/admin/users", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const updateAdminUser = async (id, formReqData) => {
    try {
        const response = await api.post(`/admin/users/${id}`, formReqData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const deleteAdminUser = async (id) => {
    try {
        const response = await api.delete(`/admin/users/${id}`);
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};