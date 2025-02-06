import axios from "axios";

export const getProfessions = async (page, search) => {
    try {
        const response = await axios.get(`https://baraka-admin-back.vercel.app/api/professions?page=${page}&limit=15&primary_flag=1&profession_name=${search}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getProfessionsById = async (page, profession_id) => {
    try {
        const response = await axios.get(`https://baraka-admin-back.vercel.app/api/professions?page=${page}&limit=15&profession_id=${profession_id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const deleteProfession = async (id) => {
    try {
        const response = await axios.delete(`https://baraka-admin-back.vercel.app/api/professions/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProfession = async (id, options) => {
    try {
        const response = await axios.put(`https://baraka-admin-back.vercel.app/api/professions/${id}`, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createProfession = async (options) => {
    try {
        const response = await axios.post(`https://baraka-admin-back.vercel.app/api/professions`, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// export const getProfessionsById = async () => {
//     try {
//         const response = await axios.get(`http://localhost:3000/api/professions/1`);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };
