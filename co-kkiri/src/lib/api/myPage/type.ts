import { CategoryList } from "@/types/categoryAndFilterTypes";
import { PageMeta, PaginationOptions } from "../pageMetaType";
import { TagType } from "@/types/tagtypes";

// 마이 페이지 유저 정보
export type UserInfoApiResponseDto = {
  nickname: string;
  profileImageUrl: string;
  position?: string;
  career?: number;
  introduce?: string;
  stack?: string[];
  stacks?: string[];
  link?: string;
  gauge: number;
};

// 내가 받은 태그 정보
type MyPageReview = TagType;

export type MyPageReviewApiResponseDto = MyPageReview[];

//마이 페이지 초대된 팀 목록
type InvitedTeam = {
  postId: number;
  teamInviteId: number;
  title: string;
};

export type InvitedTeamListApiResponseDto = {
  data: InvitedTeam[];
  meta: PageMeta;
};

export type InvitedTeamListApiRequestDto = PaginationOptions;

// 마이 페이지 스크랩 목록
export type MyScrap = {
  postId: number;
  type: CategoryList;
  recruitEndAt: string;
  isScraped: boolean;
  progressWay: string;
  title: string;
  positions: string[];
  stacks: string[];
  memberNickname: string;
  memberProfileImageUrl: string;
  viewCount: number;
  commentCount: number;
};

export type MyScrapApiResponseDto = {
  data: MyScrap[];
  meta: PageMeta;
};

export type MyScrapApiRequestDto = {
  order?: "ASC" | "DESC"; // 정렬 순서, ASC: 옛날순, DESC: 최신순
  page: number; // 요청할 페이지
  take: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
};

// 마이 페이지 유저 정보 수정
export type UserInfoEditApiRequestDto = {
  nickname: string;
  profileImageUrl: string;
  position?: string;
  career?: number;
  introduce?: string;
  stack?: string[];
  link?: string;
};

// 마이 페이지 프로필 공개 여부 수정
export type VisibleProfileStatusApiRequestDto = {
  isVisibleProfile: boolean;
};
