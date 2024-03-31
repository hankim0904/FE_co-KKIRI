import { PageMeta, PaginationOptions } from "../pageMetaType";

// 유저 프로필 조회
export type MemberProfile = {
  memberId: number;
  nickname: string;
  profileImageUrl: string;
  career: number;
  position: string;
  stacks: string[];
  gauge: number;
  // tage: Tag // TODO: 추후 작업예정
};

export type MemberProfileApiResponseDto = MemberProfile;

// 유저 검색
export type SearchedMemberProfile = {
  memberId: number;
  nickname: string;
  profileImageUrl: string;
  position: string;
  career: number;
  stacks: string[];
  score: number;
};

export type SearchedMemberProfileApiResponseDto = {
  data: SearchedMemberProfile[];
  meta: PageMeta;
};

export type SearchedMemberProfileApiRequestDto = PaginationOptions & {
  nickname?: string;
  position?: string; // 포지션
  stacks?: string[]; // 스택
};
