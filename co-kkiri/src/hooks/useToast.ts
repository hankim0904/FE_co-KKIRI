import { TOAST_LENGTH } from "@/components/commons/Widgets/Toast/constant";
import { ToastType, useToastStore } from "@/stores/toastStore";

export const useToast = () => {
  const push = useToastStore((state) => state.push);
  const pop = useToastStore((state) => state.pop);
  const toasts = useToastStore.getState().toasts;

  const pushToast = (message: string, toastType: ToastType) => {
    if (toasts.find((toast) => toast.message === message)) {
      return;
    }
    push(message, toastType);
    setTimeout(() => {
      pop();
    }, TOAST_LENGTH);
  };

  return pushToast;
};
