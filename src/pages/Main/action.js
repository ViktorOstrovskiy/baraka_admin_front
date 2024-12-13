import axios from "axios";


export const searchNews = async (search) => {
    try {

        const response = await axios.get(`https://ki-data-back.vercel.app/api/search?q=${search}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const uploadNews = async (search) => {
    try {

        const response = await axios.post(`https://ki-data-back.vercel.app/api/updateIndex`);
        return response.data;
    } catch (error) {
        throw error;
    }
};