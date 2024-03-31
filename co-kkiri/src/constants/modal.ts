type ConfirmTypeDetail = {
  message: string;
  agree?: string; // 'agree' 속성은 선택적
  cancel: string;
  delete?: string; // 'delete' 속성은 선택적
};

export const CONFIRM_TYPE: { [key: string]: ConfirmTypeDetail } = {
  apply: { message: "정말 지원하시겠어요?", agree: "지원하기", cancel: "취소하기" },
  post: { message: "작성을 완료했습니까?", agree: "작성하기", cancel: "취소하기" }, //apply 외 나머지 메세지 정해지면 수정 예정
  modify: { message: "수정 하시겠어요?", agree: "수정하기", cancel: "취소하기" },
  delete: { message: "정말 삭제하시겠어요?", delete: "삭제하기", cancel: "취소하기" },
  cancel: { message: "정말 취소하시겠어요?", agree: "네", cancel: "아니오" },
  review: { message: "리뷰를 완료하셨나요?", agree: "네", cancel: "아니오" },
  start: { message: "스터디/프로젝트를 시작하시겠어요?", agree: "네", cancel: "아니오" },
  accept: { message: "수락하시겠어요?", agree: "수락하기", cancel: "취소하기" },
  refuse: { message: "거절하시겠어요?", agree: "거절하기", cancel: "취소하기" },
  deleteUser: {
    message: "정말로 탈퇴하시겠어요?",
    delete: "탈퇴하기",
    cancel: "취소",
  },
};
