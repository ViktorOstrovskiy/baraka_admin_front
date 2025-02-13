import axios from "axios";


export const searchNews = async (search) => {
    try {
        const response = await axios.get(`http://94.101.118.41:3000/api/professions/search?q=${search}`);
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
