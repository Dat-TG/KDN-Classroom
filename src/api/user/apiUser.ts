import { AxiosResponse } from "axios";
import {
  IInformationUpdateReq,
  ILoginGoogleReq,
  ILoginUserReq,
  IPasswordUpdateReq,
  IRegisterUserReq,
  IResetPassword,
  IUpdateUserRole,
  IUpdateUserRolePermissions,
  IUserRolePermissions,
} from "../../types/user";
import AxiosClient from "../axios";
import { IUserRequestParams } from "../../types/common";

const url = "/user";

export const login = async (data: ILoginUserReq) => {
  const res = await AxiosClient.post("/auth/login", data);
  return res.data;
};

export const loginGoogle = async (data: ILoginGoogleReq) => {
  const res = await AxiosClient.post("/auth/google/login", data);
  return res.data;
};

export const register = async (data: IRegisterUserReq) => {
  console.log("call api register");
  console.log(data);
  const res = await AxiosClient.post("/auth/register", data);
  console.log(res.data);
  return res.data;
};

export const logout = async () => {
  const res = await AxiosClient.get("/auth/logout");
  return res.data;
};

export const refreshToken = async (refreshToken: string) => {
  const res = await AxiosClient.get("/auth/refresh", {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return res.data;
};

export const updateInformation = async (
  informationUpdate: IInformationUpdateReq
) => {
  const res = await AxiosClient.put(`${url}/edit`, informationUpdate);
  return res.data;
};

export const updatePassword = async (passwordUpdate: IPasswordUpdateReq) => {
  const res = await AxiosClient.put(`${url}/edit/password`, passwordUpdate);
  return res.data;
};

export const getAll = async () => {
  const res = await AxiosClient.get(url);
  return res.data;
};

export const updateUserRole = (data: IUpdateUserRole) => {
  return AxiosClient.put(`${url}/roles`, data);
};

export const getUsers = async (params: IUserRequestParams) => {
  const res = await AxiosClient.get(url, { params });
  return res.data;
};

export const getUserProfile = async () => {
  const res = await AxiosClient.get(`${url}/profile`);
  return res.data;
};

export const getUserRole = async () => {
  const res = await AxiosClient.get("roles");
  return res.data;
};

export const getUserRolePermissions = async (role: string) => {
  const res = await AxiosClient.get<
    unknown,
    AxiosResponse<IUserRolePermissions>
  >("roles/permissions", {
    params: {
      role,
    },
  });
  return res.data;
};

export const updateUserRolePermissions = async (
  data: IUpdateUserRolePermissions
) => {
  const res = await AxiosClient.put("roles/permissions", data);
  return res.data;
};

export const uploadAvatar = (avatar: File) => {
  const formData = new FormData();
  formData.append("avatar", avatar);
  return AxiosClient.post(`${url}/avatar`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const forgotPassword = async (emailAddress: string) => {
  const res = await AxiosClient.post("/auth/forget-password-email", {
    emailAddress,
  });
  return res.data;
};

export const resetPassword = async (data: IResetPassword) => {
  const res = await AxiosClient.post("/auth/forget-password", data);
  return res.data;
};
