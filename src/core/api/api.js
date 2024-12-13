import { docCookies } from "../services/cookies.js";

const baseURL = import.meta.env.VITE_API_URL;

const axiosConfig = {
    baseURL: `${baseURL}`,
};

const instance = axios.create(axiosConfig);

instance.interceptors.request.use(
    async (req) => {
        req.headers["locale"] = "en";
        const accessToken = docCookies.getItem("token");
        if (accessToken && req.headers) {
            req.headers.Authorization = `Bearer ${accessToken}`;
        }
        return req;
    },
    (err) => {
    throw err;
}
);

instance.interceptors.response.use(
    async (res) => {
    return res;
},
(err) => {
    if (err.response && err.response.status === 403) {
        docCookies.removeItem("token");
        window.location.reload();
    }
    throw err;
}
);

const API = instance;

export { API };
