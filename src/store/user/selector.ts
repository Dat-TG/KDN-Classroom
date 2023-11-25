
import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '..';
import { IUserInformationSelector, IUserProfileRes, USER_ROLES_NAME } from '../../types/user';

const getUserProfile = (state: AppState) => state.user.userProfile;
const getSelf = (state: AppState) => state;

export const sGetUserPermissions = createSelector(
  getUserProfile,
  (state: IUserProfileRes) => state.roles?.map((role) => role.name)
);

export const sIsAdmin = createSelector(
  getUserProfile,
  (state: IUserProfileRes) =>
    state.roles?.map((role) => role.name)?.includes(USER_ROLES_NAME.ADMIN)
);

export const sIsClient = createSelector(
  getUserProfile,
  (state: IUserProfileRes) =>
    state.roles?.map((role) => role.name)?.includes(USER_ROLES_NAME.CLIENT)
);

export const sGetUserId = createSelector(
  getUserProfile,
  (state: IUserProfileRes) => state.id
);

export const sIsExpiredToken = createSelector(
  getUserProfile,
  (state: IUserProfileRes) => state.exp <= 0
);

export const sGetUserInform = createSelector(
  getUserProfile,
  (state: IUserProfileRes) =>
    ({
      id: state.id,
      name: state.name,
      avatar: state.avatar,
      surname: state.surname,
    } as IUserInformationSelector)
);

export const sGetUsers = createSelector(
  getSelf,
  (state: AppState) => state.user.users
);