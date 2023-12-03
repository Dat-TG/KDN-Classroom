import { userReducer } from "./reducer";
import { IUserStore } from "./type";
import { ILoginGoogle, ILoginUserReq, IUserProfileRes } from "../../types/user";

import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import i18next from "i18next";
import { userApi } from "../../api/axios";
import { withParamsToastCatcher } from "../toastCatcher";

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
  }, i18next.t("loginSuccessful"))
);
const getUserProfile = createAsyncThunk("user/getUserProfile", async () => {
  const result = await userApi.getUserProfile();
  return result;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: userReducer,
  extraReducers(builder: ActionReducerMapBuilder<IUserStore>) {
    builder.addCase(
      loginUser.fulfilled,
      (_state: IUserStore, action: PayloadAction<ILoginGoogle>) => {
        console.log("user login, save token to local storage");
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
    );
    builder.addCase(
      getUserProfile.fulfilled,
      (state: IUserStore, action: PayloadAction<IUserProfileRes>) => {
        state.userProfile = action.payload;
        state.hasLoadedProfile = true;
      }
    );
  },
});
const { actions, reducer } = userSlice;
export const { setRoleName, setAvatar } = actions;
export default reducer;
