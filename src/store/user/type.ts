import { IUserProfileRes, IUserRole, IUserRolePermissions, IUsersRes } from "../../types/user";

export interface IUserStore {
    token: string;
    refreshToken: string;
    users: IUsersRes;
    errorMessage: string;
    userProfile: IUserProfileRes | null;
    userRoles: IUserRole[];
    userRolePermissions: IUserRolePermissions;
    hasLoadedProfile: boolean;
    roleName: string;
  }