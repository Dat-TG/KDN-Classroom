export interface ILogSearch {
    page?: number,
    size?: number,
    order?: string,
    orderBy?: string,
    endpoint?: string,
    createdBy?: string,
    exception?: string,
    method?: string,
    from?: Date,
    to?: Date,
  }
  
  export interface ILog {
    id: string,
    endpoint: string,
    method: string,
    statusCode: number,
    params: unknown,
    executionTime: number,
    createdBy: string,
    createdTime: Date,
    exception: unknown
  }
  
  export interface ILogRespone {
    data: ILog[],
    pageCount: number
  }
  
  export interface ILogStore {
    data: ILogRespone,
  }