import axios from "axios";

export const getCategories = async (page, search) => {
    try {
        const response = await axios.get(`http://94.101.118.41:3000/api/categories?page=${page}&limit=15&primary_flag=1&name=${search}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getCategoriesById = async (page, profession_id) => {
    try {
        const response = await axios.get(`http://94.101.118.41:3000/api/categories?page=${page}&limit=15&name=${profession_id}&primary_flag=0`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const deleteCategories = async (id) => {
    try {
        const response = await axios.delete(`http://94.101.118.41:3000/api/categories/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateCategories = async (id, options) => {
    try {
        const response = await axios.put(`http://94.101.118.41:3000/api/categories/${id}`, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createCategories = async (options) => {
    try {
        const response = await axios.post(`http://94.101.118.41:3000/api/categories`, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const searchCategories = async (search) => {
    try {
        const response = await axios.get(`http://94.101.118.41:3000/api/categories/search?q=${search.toLowerCase()}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
