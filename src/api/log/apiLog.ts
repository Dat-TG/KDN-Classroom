import { ILogSearch } from "../../types/log";
import AxiosClient from "../axios";


const url = '/audit-log';

export const getAllLog = async (params?: ILogSearch) => {
  const res = await AxiosClient.get(url, { params });
  return res.data;
};