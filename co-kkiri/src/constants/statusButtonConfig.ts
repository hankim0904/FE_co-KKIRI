import { ButtonVariant } from "@/components/commons/Button";
import { ConfirmType } from "@/components/modals/ConfirmModal";

type ButtonMapped = {
  variant: ButtonVariant;
  text: string;
  disabled: boolean;
  type?: ConfirmType;
};

export interface StatusButtonConfig {
  OWNER: ButtonMapped;
  NOT_APPLIED: ButtonMapped;
  APPLIED: ButtonMapped;
  INVITED: ButtonMapped;
  RECRUIT_CLOSED: ButtonMapped;
}

export const statusButtonConfig: StatusButtonConfig = {
  OWNER: { variant: "primary", text: "스터디 / 프로젝트 관리하기", disabled: false },
  NOT_APPLIED: { variant: "primary", text: "지원하기", disabled: false, type: "apply" },
  APPLIED: { variant: "red", text: "지원 취소", disabled: false, type: "cancel" },
  INVITED: { variant: "ghost", text: "스카우트 답변하기", disabled: false },
  RECRUIT_CLOSED: { variant: "primary", text: "모집 완료", disabled: true },
};
