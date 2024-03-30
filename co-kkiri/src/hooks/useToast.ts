import { TOAST_LENGTH } from "@/components/commons/Widgets/Toast/constant";
import { ToastType, useToastStore } from "@/stores/toastStore"

export const useToast = () => {
  const { toasts, push, pop } = useToastStore();

  const pushToast = (message: string, toastType: ToastType) => {
    //현재 Queue에 존재하는 메시지는 중복으로 저장하지 않습니다
    if (toasts.find((toast) => toast.message === message)) {
      return;
    }

    push(message, toastType);
    setTimeout(() => {
      pop();
    }, TOAST_LENGTH);
  };

  return pushToast;
}
