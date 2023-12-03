import { Id, toast, ToastOptions } from "react-toastify";
export default {
  success(msg: string, options?: ToastOptions): void {
    toast.success(msg, options);
  },
  warning(msg: string, options?: ToastOptions): void {
    toast.warn(msg, options);
  },
  info(msg: string, options?: ToastOptions): void {
    toast.info(msg, options);
  },
  error(msg: string, options?: ToastOptions): void {
    toast.error(msg, options);
  },
  close(key: Id): void {
    toast.dismiss(key);
  },
  closeAll(): void {
    toast.dismiss();
  },
};
