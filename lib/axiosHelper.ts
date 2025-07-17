import axios from 'axios';

const LOCAL_URL = 'http://127.0.0.1:8080/con';
const PRODUCTION_URL = 'https://uo5exhg7ej.execute-api.ap-south-1.amazonaws.com/main/con';

const ENV = process.env.NODE_ENV || 'development';
export const BASE_URL = ENV === 'production' ? PRODUCTION_URL : LOCAL_URL;

const Raxios = axios.create({ baseURL: BASE_URL });

Raxios.interceptors.request.use(
    (config) => {
        if (config.headers.Authorization) return config;
        const token = localStorage.getItem('access_token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const logout_user = () => {
    localStorage.clear();
    const currentLocation = window.location.pathname;
    window.location.href = `/login?redirect=${currentLocation}`;
};

const refreshFaxiosAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    try {
        let response = await axios.post(`${BASE_URL}/refresh`,
            { action: 'refresh' }, {
            headers: { Authorization: `Bearer ${refreshToken}` }
        });
        if (response.status !== 200) logout_user();
        const newAccessToken = response.data.data.access_token;
        localStorage.setItem('access_token', newAccessToken);
        return newAccessToken;
    } catch (error) {
        logout_user();
    }
};

Raxios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await refreshFaxiosAccessToken();
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return Raxios(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default Raxios;