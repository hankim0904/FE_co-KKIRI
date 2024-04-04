import { CategoryListFilter } from "@/constants/categoriesAndFilters";
import { CategoryList } from "@/types/categoryAndFilterTypes";
import { PageMeta, PaginationOptions } from "../pageMetaType";

/**스터디모집하기, 수정하기 */
export type RecruitApiRequestDto = {
  type: CategoryList | "";
  recruitEndAt: string;
  progressPeriod: string;
  capacity: number;
  contactWay: string;
  progressWay: string;
  stacks: string[];
  positions: string[];
  title: string;
  content: string;
  link?: string;
};

export type PostInfo = {
  postId: number;
  type: CategoryList;
  postStatus?: "READY" | "PROGRESS" | "PROGRESS_END" | "DONE";
  recruitEndAt: string;
  isScraped: boolean;
  progressWay: string;
  title: string;
  positions: string[];
  stacks: string[];
  memberNickname?: string; // 타입 혼재로 추가 API명세 확정시 삭제 필요
  memberProfileImageUrl?: string; // 타입 혼재로 추가 API명세 확정시 삭제 필요
  nickname?: string; // 타입 혼재로 추가 API명세 확정시 삭제 필요
  profileImageUrl?: string; // 타입 혼재로 추가 API명세 확정시 삭제 필요
  viewCount: number;
  commentCount: number;
  isReviewed?: boolean;
};

/**스터디 목록*/
export type ListApiResponseDto = {
  data: PostInfo[];
  meta: PageMeta;
};

export type ListApiRequestDto = PaginationOptions & {
  meetingType: CategoryListFilter;
  position?: string;
  progressWay?: string;
  stacks?: string[];
  sortBy?: string;
  search: string;
};

export type PostApplyStatus = "OWNER" | "INVITED" | "NOT_APPLIED" | "APPLIED" | "RECRUIT_CLOSED";

export type PostDetails = {
  postTitle: string;
  postMemberId: number;
  postContent: string;
  userProfileImg: string;
  userNickname: string;
  createdAt: string;
  viewCount: number;
  scrapCount: number;
  type: "STUDY" | "PROJECT";
  recruitEndAt: string;
  progressPeriod: string;
  progressWay: string;
  contactWay: string;
  capacity: number;
  positions: string[];
  stacks: string[];
  commentCount: number;
  link: string; //연락 방법 링크
  isScraped: boolean;
  teamInviteId: number | null;
};
/**스터디 상세*/
export type PostDetailApiResponseDto = {
  postDetails: PostDetails;
  postApplyStatus: PostApplyStatus;
};

/**스터디 지원 목록 */
export type AppliedMemberListApiRequestDto = PaginationOptions;

type AppliedMember = {
  teamMemberId: number;
  memberId: number;
  nickname: string;
  profileImageUrl: string;
  position: string;
};

export type AppliedMemberListApiResponseDto = {
  data: AppliedMember[];
};

export type InvitedMemberListApiResponseDto = {
  data: AppliedMember[];
  meta: PageMeta;
};

/**스터디 프로젝트 정보 */
export type StudyManagementApiResponseDto = {
  postId: number;
  postTitle: string;
  type: CategoryList;
  recruitEndAt: string;
  progressPeriod: string;
  progressWay: string;
  status: "READY" | "PROGRESS" | "PROGRESS_END" | "DONE";
  contactWay: string;
  capacity: number;
  positions: string[];
  isLeader: boolean;
  stacks: string[];
  link: string;
};

/**이미지 업로드하기 */
export type ImageUploadApiResponseDto = {
  uploadUrl: string;
};
