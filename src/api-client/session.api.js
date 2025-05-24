import { axiosClient } from "./axios-client";

export const sessionApi = {
    getByIds: (payload) => {
        return axiosClient.post('/sessions/by-ids', payload);
    },
}