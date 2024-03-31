import { TOAST_LENGTH } from "@/components/commons/Widgets/Toast/constant";
import { ToastType, useToastStore } from "@/stores/toastStore";
import { useCallback } from "react";

export const useToast = () => {
  const push = useToastStore((state) => state.push);
  const pop = useToastStore((state) => state.pop);
  const toasts = useToastStore.getState().toasts;

  const pushToast = useCallback((message: string, toastType: ToastType) => {
    if (toasts.find((toast) => toast.message === message)) {
      return;
    }
    push(message, toastType);
    setTimeout(() => {
      pop();
    }, TOAST_LENGTH);
  }, [pop, push, toasts]);

  return pushToast;
};
