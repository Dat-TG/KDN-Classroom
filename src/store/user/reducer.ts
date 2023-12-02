import { PayloadAction } from "@reduxjs/toolkit";
import { IUserStore } from ".";
export const userReducer = {
  setRoleName: (state: IUserStore, action: PayloadAction<string>) => {
    state.roleName = action.payload;
  },
  setAvatar: (state: IUserStore, action: PayloadAction<string>) => {
    state.userProfile!.avatar = action.payload;
  },
};
