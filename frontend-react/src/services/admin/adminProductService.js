import api from '../../api/axios';

export const getAdminProducts = async ({ page = 1, limit = 10, search = '', searchByCat = '', searchByStatus = '', searchByFeatured = '' }) => {
    try {
        const response = await api.get("/admin/products", { params: { page, limit, search, searchByCat, searchByStatus, searchByFeatured } });
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const getOneAdminProduct = async (id) => {
    try {
        const response = await api.get(`/admin/products/${id}`);
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};


export const createAdminProduct = async (data) => {
    try {
        const response = await api.post("/admin/products", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const updateAdminProduct = async (id, formReqData) => {
    try {
        const response = await api.post(`/admin/products/${id}`, formReqData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const deleteAdminProduct = async (id) => {
    try {
        const response = await api.delete(`/admin/products/${id}`);
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const getCategoryDropDown = async (id) => {
    try {
        const response = await api.get(`/admin/categories/dropdowns`);
        return response.data;
    } catch (error) {
        return error?.response?.data || error;
    }
};