import AxiosClient from "../axios";


export const getNotifications = async (userId: number) => {
    const response = await AxiosClient.get(`/notifications/${userId}`);
    return response.data;
};

export const markReadNotification = async (notificationId: number) => {
    const response = await AxiosClient.post("/notifications/mark-read", { notificationId });
    return response.data;
};

