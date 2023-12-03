import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { store } from "../../store";
import { clearSpinner, hideSpinner, showSpinner } from "../../store/global";
import { removeAllToken } from "../../utils/token";
import { userApi } from ".";
import toast from "../../utils/toast";
import { IResponseError } from "../../types/common";

interface IRequestAxios extends InternalAxiosRequestConfig {
  skipLoading?: boolean;
}

const onRequestConfig = (config: IRequestAxios) => {
  if (!config.headers["Authorization"]) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }
  config.timeout = 30000;
  !config.skipLoading && store.dispatch(showSpinner());
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  store.dispatch(clearSpinner());
  return Promise.reject(error);
};

const onResponse = (res: AxiosResponse): AxiosResponse => {
  store.dispatch(hideSpinner());
  return res;
};

const onResponseError = async (
  err: AxiosError,
  axiosInstance: AxiosInstance
): Promise<AxiosError | undefined> => {
  const originalConfig = err.config as InternalAxiosRequestConfig;
  store.dispatch(clearSpinner());
  console.log(err);
  console.log(window.location);
  if (err.response?.status === 401) {
    const currentRefreshToken = localStorage.getItem("refreshToken");
    removeAllToken();
    if (!currentRefreshToken && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
    if (!currentRefreshToken) {
      toast.error((err.response.data as IResponseError).detail);
      return;
    }
    const token = await userApi.refreshToken(currentRefreshToken!);
    localStorage.setItem("accessToken", token.accessToken);
    localStorage.setItem("refreshToken", token.refreshToken);
    originalConfig.headers.Authorization = `Bearer ${token.accessToken}`;

    return axiosInstance(originalConfig);
  }
  return Promise.reject(err?.response?.data);
};

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(onRequestConfig, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, (err: AxiosError) =>
    onResponseError(err, axiosInstance)
  );
};
