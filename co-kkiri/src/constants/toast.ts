import { ToastType } from "@/stores/toastStore";

type Toast = {
  [key: string]: { message: string; type: ToastType };
};

const TOAST: Toast = {
  unauthorized: { message: "로그인이 필요합니다.", type: "warn" },
  unauthorizedComment: { message: "해당 댓글의 권한이 없습니다.", type: "warn" },
  deletePost: { message: "삭제된 게시글 입니다.", type: "error" },
  serverError: { message: "서버 에러가 발생했습니다. 잠시후 다시 시도해주세요.", type: "error" },
  success: { message: "요청이 완료되었습니다.", type: "success" },
  applySuccess: { message: "지원이 완료되었습니다.", type: "success" },
  cancelApplicantSuccess: { message: "지원이 취소되었습니다.", type: "success" },
  notFoundPost: { message: "해당 게시글을 찾을 수 없습니다.", type: "error" },
  notFoundUser: { message: "탈퇴한 유저의 게시글 입니다.", type: "error" },
  copyLink: { message: "링크가 복사되었습니다", type: "success" },
  scrapContent: { message: "스크랩이 완료되었습니다", type: "success" },
  notScrapContent: { message: "스크랩이 취소되었습니다", type: "success" },
};

export default TOAST;
