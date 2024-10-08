import axios from "axios";
import { APP_URLS, BASE_URL } from "constants/variable";
import { refreshTokenService } from "service/LoginService";

const request = axios.create({
    withCredentials: true,
    timeout: 60000,
    headers: {
        "Content-Type": "application/json-patch+json",
    },
    baseURL: BASE_URL
})

const handleError = async (error) => {
    const { response = {}, config } = error;
    const { data, status, statusText } = response;
    const originalRequest = config

    if (((data.status === 403 && data.error === 'Forbidden')
        || (status === 401)
        || (status === 500))
        && !originalRequest._retry) {
        originalRequest._retry = true;
        const res = await refreshTokenService()
        console.log(res.data.message)
        if (res.data.status === 500 || !res.data.success) {
            console.log(res.data.message)
            localStorage.removeItem("user")
            window.location.href = APP_URLS.URL_HOME;
        } else {
            return request(originalRequest);
        }
    }
    return { data, status, statusText };
};

request.interceptors.request.use((config) => {
    if (config.isFormData) {
        delete config.headers['Content-Type']
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
});

request.interceptors.response.use((response) => {
    return response;
}, handleError);

export default request;