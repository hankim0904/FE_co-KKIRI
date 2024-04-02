import { CategoryList } from "@/types/categoryAndFilterTypes";
import { PageMeta } from "../pageMetaType";

type MyAppliedPost = {
  postId: number;
  type: CategoryList;
  recruitEndAt: string;
  isScraped: boolean;
  progressWay: string;
  title: string;
  positions: string[];
  stacks: string[];
  memberNickname: string;
  memberProfileImg: string;
  viewCount: number;
  commentCount: number;
};

// 나의 스터디 내가 신청한 스터디 목록
export type MyAppliedListApiResponseDto = {
  data: MyAppliedPost[];
  meta: PageMeta;
};

type RecruitedPost = {
  postId: number;
  type: CategoryList;
  recruitEndAt: string;
  isScraped: boolean;
  progressWay: string;
  title: string;
  positions: string[];
  stacks: string[];
  memberNickname: string;
  memberProfileImg: string;
  viewCount: number;
  commentCount: number;
};

// 나의 스터디 내가 모집한 스터디 목록
export type RecruitedListApiResponseDto = {
  data: RecruitedPost[];
  meta: PageMeta;
};

type WaitingPost = {
  postId: number;
  type: CategoryList;
  recruitEndAt: string;
  isScraped: boolean;
  progressWay: string;
  title: string;
  positions: string[];
  stacks: string[];
  memberNickname: string;
  memberProfileImg: string;
  viewCount: number;
  commentCount: number;
};

// 나의 스터디 내가 대기중인 스터디 목록
export type WaitingListApiResponseDto = {
  data: WaitingPost[];
  meta: PageMeta;
};

type OnGoingPost = {
  postId: number;
  type: CategoryList;
  recruitEndAt: string;
  isScraped: boolean;
  progressWay: string;
  title: string;
  positions: string[];
  stacks: string[];
  memberNickname: string;
  memberProfileImg: string;
  viewCount: number;
  commentCount: number;
};

// 나의 스터디 내가 진행중인 스터디 목록
export type OnGoingListApiResponseDto = {
  data: OnGoingPost[];
  meta: PageMeta;
};

type CompletedPost = {
  postId: number;
  type: CategoryList;
  postStatus: "READY" | "PROGRESS" | "PROGRESS_END" | "DONE";
  recruitEndAt: string;
  isScraped: boolean;
  progressWay: string;
  title: string;
  positions: string[];
  stacks: string[];
  memberNickname: string;
  memberProfileImg: string;
  viewCount: number;
  commentCount: number;
};

// 나의 스터디 내가 완료한 스터디 목록
export type CompletedListApiResponseDto = {
  data: CompletedPost[];
  meta: PageMeta;
};

// 진행중인 스터디 완료

// 피어리뷰 작성

// 피어리뷰 보기

//api 나오는 대로 작성 예정
