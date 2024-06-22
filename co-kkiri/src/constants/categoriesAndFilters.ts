import { CategoryList, CategoryStudyStatus } from "@/types/categoryAndFilterTypes";

export type CategoryListFilter = "ALL" | CategoryList;

export const categoryListFilter: { [key in CategoryListFilter]: string } = {
  ALL: "전체",
  STUDY: "스터디",
  PROJECT: "프로젝트",
};

export const categoryStudyStatusFilter: { [key in CategoryStudyStatus]: string } = {
  APPLIED: "신청중",
  RECRUITING: "모집중",
  WAITING: "대기중",
  ON_GOING: "진행중",
  COMPLETED: "완료",
};

export const categoryStudyStatusPhrase: { [key in CategoryStudyStatus]: string } = {
  APPLIED: "신청중인 스터디/프로젝트가 없습니다.",
  RECRUITING: "모집중인 스터디/프로젝트가 없습니다.",
  WAITING: "대기중인 스터디/프로젝트가 없습니다.",
  ON_GOING: "진행중인 스터디/프로젝트가 없습니다.",
  COMPLETED: "완료한 스터디/프로젝트가 없습니다.",
};

export const listPageInitialFilter = {
  stacks: [],
  position: "",
  progressWay: "",
  sortBy: "LATEST",
};
