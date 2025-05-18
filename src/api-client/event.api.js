import { axiosClient } from "./axios-client";

export const eventApi = {
    findSnapshot: (payload) => {
        return axiosClient.post('/events/snapshot', payload);
    },
}