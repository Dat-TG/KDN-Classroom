import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";


import { withParamsToastCatcher } from "../toastCatcher";
import { userApi } from "../../api/axios";
import { IPaginationParams } from "../../types/pagination";
import {
  IRegisterUserReq,
  IInformationUpdateReq,
  IPasswordUpdateReq,
  IUpdateUserRole,
  USER_ROLES_NAME,
  IUpdateUserRolePermissions,
  ILoginGoogle,
  IUsersRes,
  IUserProfileRes,
  IUserRole,
  IUserRolePermissions,
  ILoginUserReq,
} from "../../types/user";
import { removeAllToken } from "../../utils/token";
import i18next from "../../translations/i18";
import { IUserStore } from "./type";

export const loginUser = createAsyncThunk(
  "user/login",
  withParamsToastCatcher(async (params: ILoginUserReq) => {
    const result = await userApi.login(params);
    return result;
  }, i18next.t("loginSuccessful"))
);
export const getUserProfile = createAsyncThunk("user/getUserProfile", async () => {
  const result = await userApi.getUserProfile();
  return result;
});

export const registerUser = createAsyncThunk(
  "user/register",
  withParamsToastCatcher(async (params: IRegisterUserReq) => {
    return await userApi.register(params);
  }, i18next.t("registerSuccessful"))
);

export const logoutUser = createAsyncThunk("user/logout", async () => {
  const res = await userApi.logout();
  return res;
});

export const updateInformationUser = createAsyncThunk(
  "user/editInformation",
  async (informationUpdate: IInformationUpdateReq) => {
    const res = await userApi.updateInformation(informationUpdate);
    return res;
  }
);

export const updatePasswordUser = createAsyncThunk(
  "user/editPassword",
  async (passwordUpdate: IPasswordUpdateReq) => {
    const res = await userApi.updatePassword(passwordUpdate);
    return res;
  }
);

export const getAllUsers = createAsyncThunk("user", async () => {
  const res = await userApi.getAll();
  return res;
});

export const updateUser = createAsyncThunk(
  "user/roles",
  withParamsToastCatcher(async (userRoles: IUpdateUserRole) => {
    await userApi.updateUserRole(userRoles);
  }, "Update user roles successfully")
);

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (params: IPaginationParams) => {
    const res = await userApi.getUsers(params);
    return res;
  }
);



export const getUserRoles = createAsyncThunk("user/getUserRoles", async () => {
  const result = await userApi.getUserRole();
  return result;
});

export const getUserRolePermissions = createAsyncThunk(
  "user/getUserRolePermissions",
  async (role: USER_ROLES_NAME) => {
    const result = await userApi.getUserRolePermissions(role);
    return result;
  }
);

export const updateUserRolePermissions = createAsyncThunk(
  "user/updateUserRolePermissions",
  async (data: IUpdateUserRolePermissions) => {
    const result = await userApi.updateUserRolePermissions(data);
    return result;
  }
);

export const extraReducers = (
  builders: ActionReducerMapBuilder<IUserStore>
) => {
  builders
    .addCase(
      registerUser.fulfilled,
      (_state: IUserStore, action: PayloadAction<ILoginGoogle>) => {
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
    )
    .addCase(logoutUser.fulfilled, () => {
      removeAllToken();
    })
    .addCase(
      getAllUsers.fulfilled,
      (state: IUserStore, action: PayloadAction<IUsersRes>) => {
        state.users = action.payload;
      }
    )
    .addCase(updateUser.fulfilled, () => {
      return;
    })
    .addCase(
      getUsers.fulfilled,
      (state: IUserStore, action: PayloadAction<IUsersRes>) => {
        state.users = action.payload;
      }
    )
    .addCase(
      updateInformationUser.fulfilled,
      (state: IUserStore, action: PayloadAction<IUserProfileRes>) => {
        state.userProfile = action.payload;
        state.hasLoadedProfile = true;
      }
    )
    .addCase(
      getUserRoles.fulfilled,
      (state: IUserStore, action: PayloadAction<IUserRole[]>) => {
        state.userRoles = action.payload;
      }
    )
    .addCase(
      getUserRolePermissions.fulfilled,
      (state: IUserStore, action: PayloadAction<IUserRolePermissions>) => {
        state.userRolePermissions = action.payload;
      }
    );
};
