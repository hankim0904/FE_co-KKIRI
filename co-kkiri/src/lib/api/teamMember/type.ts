import { PaginationOptions } from "../pageMetaType";

// 현재 팀원 목록
type PostTeamMember = {
  teamMemberId: number;
  memberId: number;
  nickname: string;
  profileImageUrl: string;
  position: string;
  isLeader: boolean;
  isReviewed: boolean;
};

export type TeamMemberApiResponseDto = {
  data: PostTeamMember[];
};

export type TeamMemberApiRequestDto = PaginationOptions;

// 초대받은
export interface InviteInfo {
  sendMemberId: number;
  postTitle: string;
  message: string;
  postId: number;
  sendMemberNickname: string;
  teamMemberId: number;
  sendMemberProfileImageUrl?: string;
}

export type InviteInfoApiResponseDto = InviteInfo;
