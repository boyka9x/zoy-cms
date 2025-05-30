import axios from "axios";
import { axiosClient } from "./axios-client";

export const shopApi = {
    register: (payload) => {
        return axiosClient.post('/shops', payload);
    },
    login: ({ email, password }) => {
        return axios.post(`${process.env.SERVER_URL}/shops/login`, { email, password });
    },
    getShop: () => {
        return axiosClient.get('/shops');
    },
    changeModule: (payload) => {
        return axiosClient.post('/shops/modules', payload);
    },
    subPricing: ({ code }) => {
        return axiosClient.post('/shops/sub-pricing', { code });
    },
    integration: (payload) => {
        return axiosClient.post('/shops/update-integration', payload);
    },
}