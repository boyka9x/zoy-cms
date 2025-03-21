import { axiosClient } from "./axios-client";

export const shopApi = {
    register: (payload) => {
        return axiosClient.post('/shops', payload);
    }
}