import { ICONS } from "@/constants/icons";
import { Image } from "@/types/imageTypes";
import { ToastType } from "@/stores/toastStore";

export const getToastIcon = (type: ToastType): Image => {
  switch (type) {
    case "success":
      return ICONS.successToast;
    case "error":
      return ICONS.errorToast;
    case "warn":
      return ICONS.warnToast;
    case "info":
      return ICONS.infoToast;
    default:
      return ICONS.infoToast;
  }
};
