import { SORT_ENUM } from "./common"

export interface IPaginationParams {
  page?: number
  size?: number
  orderBy?: string
  order?: SORT_ENUM
  search?: string
}

export const PAGE_SIZE_LIST = [10, 20, 30, 40]