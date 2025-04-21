import axios from "axios";
import { axiosClient } from "./axios-client";

export const shopApi = {
    register: (payload) => {
        return axiosClient.post('/shops', payload);
    },
    login: ({ email, password }) => {
        return axios.post(`${process.env.SERVER_URL}/shops/login`, { email, password });
    }
}