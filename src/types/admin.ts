import { RoleCourseNumber } from "./course";

export interface IGetUsersReq {
  page: number;
  size: number;
  order?: string;
  orderBy?: string;
  search?: string;
  role?: RoleCourseNumber;
}
