import axios from "axios";

export const getPaymentType = async (page, search) => {
    try {
        const response = await axios.get(`http://94.101.118.41:3000/api/paymentType?page=${page}&limit=15&primary_flag=1&name=${search}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getPaymentTypeById = async (page, profession_id) => {
    try {
        const response = await axios.get(`http://94.101.118.41:3000/api/paymentType?page=${page}&limit=15&name=${profession_id}&primary_flag=0`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const deletePaymentType = async (id) => {
    try {
        const response = await axios.delete(`http://94.101.118.41:3000/api/paymentType/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updatePaymentType = async (id, options) => {
    try {
        const response = await axios.put(`http://94.101.118.41:3000/api/paymentType/${id}`, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createPaymentType = async (options) => {
    try {
        const response = await axios.post(`http://94.101.118.41:3000/api/paymentType`, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const searchPaymentType = async (search) => {
    try {
        const response = await axios.get(`http://94.101.118.41:3000/api/paymentType/search?q=${search.toLowerCase()}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
