import { IPaginationParams } from './pagination';

export interface IFulfilledAction<ThunkArg, PromiseResult> {
  type: string;
  payload: PromiseResult;
  meta: {
    requestId: string;
    arg: ThunkArg;
  };
}


export interface INotification  {
  id: number;
  courseId: number;
  createdTime: Date;
  requestReview: IRequestReviewReq;
  type: string;
  isRead: boolean;
  isStudent: boolean;
  createdBy: number;
}

export interface IRequestParams {
  page?: number;
  size?: number;
  order?: SORT_ENUM;
  orderBy?: string;
  search?: string;
  subCategoryId?: number;
  isActive?: boolean;
}

export interface IActionButtonProps {
  onEdit: () => void;
  onDelete: () => void;
}

export interface IUserRequestParams extends IPaginationParams {
  role?: number;
}

export enum SORT_ENUM {
  asc = 'asc',
  desc = 'desc',
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface ISelectData {
  id: string | number;
  name: string;
  value: string;
}

export const DEFAULT_ALL = 0;

export interface IToastError {
  detail:{
    statusCode: number;
    message: string;
    error: string;
  };
}

export enum TOAST_TYPE {
  SUCCESS = 1,
  FAIL = 2,
}

export interface IResponseError {
  detail: string,
  path: string,
  timestamp: Date
}

export enum NotificationTypes{
  teacherComment = "teacher_comment",
  studentComment = "student_comment",
  finalized = "finalized",
  requestReview = "request_review",
  approve = "approve",
  reject = "reject",
  all = "all",
}