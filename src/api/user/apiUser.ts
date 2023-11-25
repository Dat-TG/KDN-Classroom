import { AxiosResponse } from "axios";
import {
  IInformationUpdateReq,
  ILoginUserReq,
  IPasswordUpdateReq,
  IRegisterUserReq,
  IUpdateUserRole,
  IUpdateUserRolePermissions,
  IUserRolePermissions,
} from "../../types/user";
import AxiosClient from "../axios";
import { IUserRequestParams } from "../../types/common";

const url = "/user";

export const login = (data: ILoginUserReq) => {
  return AxiosClient.post("/auth/login", data).then((res) => res.data);
};

export const register = (data: IRegisterUserReq) => {
  return AxiosClient.post("/auth/register", data).then((res) => res.data);
};

export const logout = () => {
  return AxiosClient.get("/auth/logout").then((res) => res.data);
};

export const refreshToken = (refreshToken: string) => {
  return AxiosClient.get("/auth/refresh", {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  }).then((res) => res.data);
};

export const updateInformation = (informationUpdate: IInformationUpdateReq) => {
  return AxiosClient.put("/edit", informationUpdate).then((res) => res.data);
};

export const updatePassword = (passwordUpdate: IPasswordUpdateReq) => {
  return AxiosClient.put("/edit/password", passwordUpdate).then(
    (res) => res.data
  );
};

export const getAll = () => {
  return AxiosClient.get(url).then((res) => res.data);
};

export const updateUserRole = (data: IUpdateUserRole) => {
  return AxiosClient.put(`${url}/roles`, data);
};

export const getUsers = (params: IUserRequestParams) => {
  return AxiosClient.get(url, { params }).then((res) => res.data);
};

export const getUserProfile = () => {
  return AxiosClient.get(`${url}/profile`).then((res) => res.data);
};

export const getUserRole = () => {
  return AxiosClient.get("roles").then((res) => res.data);
};

export const getUserRolePermissions = (role: string) => {
  return AxiosClient.get<unknown, AxiosResponse<IUserRolePermissions>>(
    "roles/permissions",
    {
      params: {
        role,
      },
    }
  ).then((res) => res.data);
};

export const updateUserRolePermissions = (data: IUpdateUserRolePermissions) => {
  return AxiosClient.put("roles/permissions", data).then((res) => res.data);
};

export const uploadAvatar = (avatar: File) => {
  return AxiosClient.post(
    `${url}/avatar`,
    { avatar },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
