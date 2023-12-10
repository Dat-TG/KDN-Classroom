import { IUserCourse } from "./course";

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
}

export interface IUserLogin {
  googleAuthToken: string;
}

export interface IRegisterUserReq {
  emailAddress: string;
  password: string;
  firstName: string;
  surname: string;
}

export interface ILoginUserReq {
  userName: string;
  password: string;
}

export interface ILoginGoogleReq {
  googleAuthToken: string;
}

export interface ILoginFacebookReq {
  userId: string;
  accessToken: string;
}

export interface IInformationUpdateReq {
  name: string;
  surname: string;
}

export interface IPasswordUpdateReq {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface DataUserInfo {
  creationTime: Date;
  emailAddress: string;
  surname: string;
  name: string;
  isActive: boolean;
  userName: string;
  password?: string;
  confirmPassword?: string;
}

export interface DataUserId {
  id: number;
}

export interface IUsersRes {
  data: DataUser[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemCount: number;
  page: number;
  pageCount: number;
  size: number;
}

export type DataUser = IUserProfileRes;

export interface DataUserChecked {
  name: string;
  value: number;
  isChecked: boolean;
}

export interface DataUserTab {
  name: string;
  value: string;
}

export type DataUserName =
  | "name"
  | "id"
  | "emailAddress"
  | "isActive"
  | "password"
  | "confirmPassword"
  | "surname"
  | "userName";

export interface DataUserFilters {
  search: string;
}

export enum UserTabsEnum {
  USER_DETAILS = "1",
  USER_ROLES = "2",
}

export enum UserRolesEnum {
  CLIENT = 1,
  ADMIN = 2,
}

export enum UserSelectActive {
  ALL = "All",
  ACTIVE = "Active",
  NO_ACTIVE = "No Active",
}

export interface ILoginGoogle {
  accessToken: string;
  refreshToken: string;
}

export enum USER_ROLES_NAME {
  ADMIN = "Admin",
  CLIENT = "Client",
}

export interface UserRoles {
  id: UserRolesEnum;
  name: USER_ROLES_NAME;
}

export interface IUserProfileRes {
  id: number;
  createdBy: string;
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
  deletedBy: number;
  deletedTime: string;
  isDeleted: boolean;
  userName: string;
  emailAddress: string;
  name: string;
  surname: string;
  phoneNumber: string;
  avatar: string;
  roles: UserRoles[];
  iat: number;
  exp: number;
  userCourses: IUserCourse[];
}

export interface IUserInformationSelector {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  emailAddress: string;
  roles: UserRoles[];
}

export interface IUserRole {
  id: number;
  name: USER_ROLES_NAME;
}

interface IFullPermissions {
  create: boolean;
  update: boolean;
  read: boolean;
  delete: boolean;
}

export interface IUserRolePermissions {
  authorization: IFullPermissions;
  upload_file: Omit<IFullPermissions, "update">;
}

export interface IUpdateUserRolePermissions {
  rolePermissions: IUserRolePermissions;
  name: string;
}

export interface IUpdateUserRole {
  userId: number;
  roleNames: USER_ROLES_NAME[];
}

export interface IResetPassword {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
