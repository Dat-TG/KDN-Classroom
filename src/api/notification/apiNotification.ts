import AxiosClient from "../axios";


export const getNotifications = async () => {
    const response = await AxiosClient.get("/notification/all/user");
    return response.data;
};

export const markReadNotification = async (notificationId: number) => {
    const response = await AxiosClient.post("/notification/read/{id}", { id: notificationId });
    return response.data;
};

