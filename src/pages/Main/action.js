import axios from "axios";


export const searchNews = async (search) => {
    try {
        const response = await axios.get(`https://baraka-admin-back.vercel.app/api/search?q=${search}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getNewsById = async (id) => {
    try {

        const response = await axios.get(`https://ki-data-back.vercel.app/api/article?id=${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
