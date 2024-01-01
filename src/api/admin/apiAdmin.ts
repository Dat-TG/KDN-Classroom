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
