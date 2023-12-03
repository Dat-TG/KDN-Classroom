import { userReducer } from "./reducer";
import { IUserStore } from "./type";
import {
  IInformationUpdateReq,
  ILoginGoogle,
  ILoginGoogleReq,
  ILoginUserReq,
  IPasswordUpdateReq,
  IRegisterUserReq,
  IUserProfileRes,
} from "../../types/user";

import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { userApi } from "../../api/axios";
import { withParamsToastCatcher } from "../toastCatcher";
import i18next from "../../translations/i18";
import { removeAllToken } from "../../utils/token";

const fullPermissions = {
  create: false,
  update: false,
  read: false,
  delete: false,
};

const initialState: IUserStore = {
  token: "",
  refreshToken: "",
  users: {
    data: [],
    hasNextPage: false,
    hasPreviousPage: false,
    itemCount: 0,
    page: 0,
    pageCount: 0,
    size: 10,
  },
  errorMessage: "",
  userProfile: null,
  // {
  //   id: NaN,
  //   createdBy: '',
  //   createdTime: '',
  //   updatedBy: '',
  //   updatedTime: '',
  //   deletedBy: NaN,
  //   deletedTime: '',
  //   isDeleted: false,
  //   userName: '',
  //   emailAddress: '',
  //   name: '',
  //   surname: '',
  //   phoneNumber: '',
  //   avatar: '',
  //   roles: [],
  //   iat: NaN,
  //   exp: 0,
  // },
  userRoles: [],
  userRolePermissions: {
    authorization: { ...fullPermissions },
    upload_file: {
      read: false,
      create: false,
      delete: false,
    },
  },
  hasLoadedProfile: false,
  roleName: "",
};

const loginUser = createAsyncThunk(
  "user/login",
  withParamsToastCatcher(async (params: ILoginUserReq) => {
    const result = await userApi.login(params);
    return result;
  }, i18next.t("global:loginSuccessfully"))
);
const getUserProfile = createAsyncThunk("user/getUserProfile", async () => {
  const result = await userApi.getUserProfile();
  return result;
});

const logoutUser = createAsyncThunk(
  "user/logout",
  withParamsToastCatcher(async () => {
    const res = await userApi.logout();
    removeAllToken();
    window.location.reload();
    return res;
  }, i18next.t("global:logoutSuccessfully"))
);

const registerUser = createAsyncThunk(
  "user/register",
  withParamsToastCatcher(async (params: IRegisterUserReq) => {
    return await userApi.register(params);
  }, i18next.t("global:registerSuccessfully"))
);

const updateInformationUser = createAsyncThunk(
  "user/editInformation",
  withParamsToastCatcher(async (informationUpdate: IInformationUpdateReq) => {
    const res = await userApi.updateInformation(informationUpdate);
    return res;
  }, i18next.t("global:updateInformationSuccessfully"))
);

const updatePasswordUser = createAsyncThunk(
  "user/editPassword",
  withParamsToastCatcher(async (passwordUpdate: IPasswordUpdateReq) => {
    const res = await userApi.updatePassword(passwordUpdate);
    return res;
  }, i18next.t("global:changePasswordSuccessfully"))
);

const updateAvatar = createAsyncThunk(
  "user/avatar",
  withParamsToastCatcher(async (avatar: File) => {
    return await userApi.uploadAvatar(avatar);
  }, i18next.t("global:updateAvatarSuccessfully"))
);

const loginUserWithGoogle = createAsyncThunk(
  "user/loginGoogle",
  withParamsToastCatcher(async (params: ILoginGoogleReq) => {
    const result = await userApi.loginGoogle(params);
    return result;
  }, i18next.t("global:loginSuccessfully"))
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: userReducer,
  extraReducers(builder: ActionReducerMapBuilder<IUserStore>) {
    builder.addCase(
      loginUser.fulfilled,
      (state: IUserStore, action: PayloadAction<ILoginGoogle>) => {
        console.log("user login, save token to local storage");
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      }
    );
    builder.addCase(
      loginUserWithGoogle.fulfilled,
      (state: IUserStore, action: PayloadAction<ILoginGoogle>) => {
        console.log("user login, save token to local storage");
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      }
    );
    builder.addCase(
      getUserProfile.fulfilled,
      (state: IUserStore, action: PayloadAction<IUserProfileRes>) => {
        state.userProfile = action.payload;
        state.hasLoadedProfile = true;
      }
    );
    builder.addCase(logoutUser.fulfilled, () => {});
    builder.addCase(
      registerUser.fulfilled,
      (_state: IUserStore, action: PayloadAction<ILoginGoogle>) => {
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        window.location.href = "/login";
      }
    );
    builder.addCase(
      updateInformationUser.fulfilled,
      (state: IUserStore, action: PayloadAction<IUserProfileRes>) => {
        state.userProfile = action.payload;
        state.hasLoadedProfile = true;
      }
    );
    builder.addCase(updatePasswordUser.fulfilled, () => {
    });
    builder.addCase(updateAvatar.fulfilled, () => {
      
    });
  },
});
const { actions, reducer } = userSlice;
export const { setRoleName, setAvatar } = actions;
export default reducer;
