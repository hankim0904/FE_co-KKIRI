export interface Member {
  teamMemberId: number;
  nickname: string;
  profileImageUrl: string;
  isReviewed: boolean;
  position: string;
}

export interface MemberData {
  result: Member[];
}

export const memberData: MemberData = {
  result: [
    { teamMemberId: 1, nickname: "호랑이", profileImageUrl: "", position: "프론트엔드", isReviewed: false },
    { teamMemberId: 2, nickname: "푸바오", profileImageUrl: "", position: "백엔드", isReviewed: false },
    { teamMemberId: 3, nickname: "사자", profileImageUrl: "", position: "디자이너", isReviewed: true },
    { teamMemberId: 4, nickname: "아델리펭귄", profileImageUrl: "", position: "프론트엔드", isReviewed: true },
  ],
};
