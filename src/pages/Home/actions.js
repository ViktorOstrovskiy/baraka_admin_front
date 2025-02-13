import axios from "axios";

export const getProfessions = async (page, search) => {
    try {
        const response = await axios.get(`http://94.101.118.41:3000/api/professions?page=${page}&limit=15&primary_flag=1&profession_name=${search}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getProfessionsById = async (page, profession_id) => {
    try {
        const response = await axios.get(`http://94.101.118.41:3000/api/professions?page=${page}&limit=15&profession_id=${profession_id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const deleteProfession = async (id) => {
    try {
        const response = await axios.delete(`http://94.101.118.41:3000/api/professions/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProfession = async (id, options) => {
    try {
        const response = await axios.put(`http://94.101.118.41:3000/api/professions/${id}`, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createProfession = async (options) => {
    try {
        const response = await axios.post(`http://94.101.118.41:3000/api/professions`, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};
