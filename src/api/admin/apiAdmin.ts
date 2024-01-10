import { IGetUsersReq } from "../../types/admin";
import AxiosClient from "../axios";

export const getUserList = async (params: IGetUsersReq) => {
  Object.keys(params).forEach((key) => {
    if (params[key as keyof IGetUsersReq] === null) {
      delete params[key as keyof IGetUsersReq];
    }
  });
  const res = await AxiosClient.get("/user", {
    params,
  });
  return res.data;
};

export const banUser = async (userId: number) => {
  const res = await AxiosClient.post(`/user/admin/ban`, { userId });
  return res.data;
};

export const unbanUser = async (userId: number) => {
  const res = await AxiosClient.post(`/user/admin/unban`, { userId });
  return res.data;
};

export const inactiveCourse = async (courseId: number) => {
  const res = await AxiosClient.post(`/course/admin/ban`, { courseId });
  return res.data;
};

export const activeCourse = async (courseId: number) => {
  const res = await AxiosClient.post(`/course/admin/unban`, { courseId });
  return res.data;
};
