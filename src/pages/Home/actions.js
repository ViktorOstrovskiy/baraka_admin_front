import axios from "axios";

export const getProfessions = async () => {
    try {
        const response = await axios.get(`https://baraka-admin-back.vercel.app/api/routes/professions`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
