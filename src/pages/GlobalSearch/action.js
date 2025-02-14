import axios from "axios";

export const globalSearch = async (search) => {
    try {
        const response = await axios.get(`http://94.101.118.41:3000/api/search?q=${search.toLowerCase()}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
