import { ActionReducerMapBuilder, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userReducer } from "./reducer";
import { IUserStore } from "./type";
import { ILoginGoogle, ILoginUserReq } from "../../types/user";
import { withParamsToastCatcher } from "../toastCatcher";
import { userApi } from "../../api/axios";
import i18next from "../../translations/i18";

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
    return await userApi.login(params);
  }, i18next.t("loginSuccessful"))
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: userReducer,
  extraReducers(builder: ActionReducerMapBuilder<IUserStore>) {
      builder.addCase(loginUser.fulfilled,
        (_state: IUserStore, action: PayloadAction<ILoginGoogle>) => {
          localStorage.setItem("accessToken", action.payload.accessToken);
          localStorage.setItem("refreshToken", action.payload.refreshToken);
        });
  },
});
const { actions, reducer } = userSlice;
export const { setRoleName, setAvatar } = actions;
export default reducer;
