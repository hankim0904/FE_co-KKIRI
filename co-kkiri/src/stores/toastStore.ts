import { create } from "zustand";

export type ToastType = "success" | "error" | "warn" | "info";

export type Toast = {
  id: number;
  message: string;
  toastType: ToastType;
};

interface ToastState {
  toasts: Toast[];
  push: (message: string, toastType: ToastType) => void;
  pop: (id?: number) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  push: (message: string, toastType: ToastType) =>
    set((state) => {
      const newToast = { id: Date.now(), message, toastType };

      return {
        toasts: [...state.toasts, newToast],
      };
    }),

  pop: () =>
    set((state) => {
      return {
        toasts: state.toasts.slice(1),
      };
    }),
}));
