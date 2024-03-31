import { ToastType } from "@/stores/toastStore";

type Toast = {
  [key: string]: { message: string; type: ToastType };
};

const TOAST: Toast = {
  unauthorized: { message: "로그인이 필요합니다.", type: "warn" },
  serverError: { message: "서버 에러가 발생했습니다. 나중에 다시 시도해주세요.", type: "error" },
  success: { message: "요청이 완료되었습니다.", type: "success" },
  copyLink: { message: "링크가 복사되었습니다", type: "success" },
};

export default TOAST;
