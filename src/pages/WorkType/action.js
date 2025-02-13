import axios from "axios";

export const getWorkType = async (page, search) => {
    try {
        const response = await axios.get(`http://94.101.118.41:3000/api/workType?page=${page}&limit=15&primary_flag=1&name=${search}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getWorkTypeById = async (page, profession_id) => {
    try {
        const response = await axios.get(`http://94.101.118.41:3000/api/workType?page=${page}&limit=15&name=${profession_id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const deleteWorkType = async (id) => {
    try {
        const response = await axios.delete(`http://94.101.118.41:3000/api/workType/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateWorkType = async (id, options) => {
    try {
        const response = await axios.put(`http://94.101.118.41:3000/api/workType/${id}`, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createWorkType = async (options) => {
    try {
        const response = await axios.post(`http://94.101.118.41:3000/api/workType`, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const searchWorkType = async (search) => {
    try {
        const response = await axios.get(`http://94.101.118.41:3000/api/workType/search?q=${search}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
