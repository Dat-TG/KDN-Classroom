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
  ILoginGoogleReq,
  IResetPassword,
  ILoginFacebookReq,
} from "../../types/user";
import { removeAllToken } from "../../utils/token";
import i18next from "../../translations/i18";
import { IUserStore } from "./type";

export const loginUser = createAsyncThunk(
  "user/login",
  withParamsToastCatcher(async (params: ILoginUserReq) => {
    const result = await userApi.login(params);
    return result;
  }, i18next.t("global:loginSuccessfully"))
);

export const loginUserWithGoogle = createAsyncThunk(
  "user/loginGoogle",
  withParamsToastCatcher(async (params: ILoginGoogleReq) => {
    const result = await userApi.loginGoogle(params);
    return result;
  }, i18next.t("global:loginSuccessfully"))
);

export const loginUserWithFacebook = createAsyncThunk(
  "user/loginFacebook",
  withParamsToastCatcher(async (params: ILoginFacebookReq) => {
    const result = await userApi.loginFacebook(params);
    return result;
  }, i18next.t("global:loginSuccessfully"))
);

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async () => {
    const result = await userApi.getUserProfile();
    return result;
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  withParamsToastCatcher(async (params: IRegisterUserReq) => {
    return await userApi.register(params);
  }, i18next.t("global:registerSuccessfully"))
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  withParamsToastCatcher(async () => {
    const res = await userApi.logout();
    removeAllToken();
    window.location.reload();
    return res;
  }, i18next.t("global:logoutSuccessfully"))
);

export const updateInformationUser = createAsyncThunk(
  "user/editInformation",
  withParamsToastCatcher(async (informationUpdate: IInformationUpdateReq) => {
    const res = await userApi.updateInformation(informationUpdate);
    return res;
  }, i18next.t("global:updateInformationSuccessfully"))
);

export const updatePasswordUser = createAsyncThunk(
  "user/editPassword",
  withParamsToastCatcher(async (passwordUpdate: IPasswordUpdateReq) => {
    const res = await userApi.updatePassword(passwordUpdate);
    return res;
  }, i18next.t("global:changePasswordSuccessfully"))
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

export const updateAvatar = createAsyncThunk(
  "user/avatar",
  withParamsToastCatcher(async (avatar: File) => {
    await userApi.uploadAvatar(avatar);
  }, i18next.t("global:updateAvatarSuccessfully"))
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

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  withParamsToastCatcher(async (emailAddress: string) => {
    await userApi.forgotPassword(emailAddress);
  }, i18next.t("global:pleaseCheckYourEmail"))
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  withParamsToastCatcher(async (data: IResetPassword) => {
    await userApi.resetPassword(data);
  }, i18next.t("global:resetPasswordSuccessfully"))
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
    )
    .addCase(
      loginUserWithGoogle.fulfilled,
      (state: IUserStore, action: PayloadAction<ILoginGoogle>) => {
        console.log("user login, save token to local storage");
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      }
    )
    .addCase(forgotPassword.fulfilled, () => {}).addCase(resetPassword.fulfilled, () => {});
};
