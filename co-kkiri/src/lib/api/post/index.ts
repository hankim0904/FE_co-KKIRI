import { postAddress } from "../address";
import { apiRequest } from "../axios";
import {
  AppliedMemberListApiRequestDto,
  AppliedMemberListApiResponseDto,
  ListApiRequestDto,
  ListApiResponseDto,
  PostDetailApiResponseDto,
  RecruitApiRequestDto,
  StudyManagementApiResponseDto,
} from "./type";

/**
 * studyList 페이지용 스터디 리스트 가져오기
 *
 *@param {ListApiRequestDto}  qs  쿼리스트링을 객체로 받습니다.
 */
export const getPostList = (qs: ListApiRequestDto): Promise<ListApiResponseDto> =>
  apiRequest("get", postAddress.list, null, qs);

/** 스터디 상세 보기*/
export const getPostDetail = (postId: number): Promise<PostDetailApiResponseDto> =>
  apiRequest("get", postAddress.postId(postId));

/** 스터디 상세 조회수 증가*/
export const increaseViewCount = (postId: number) => apiRequest("post", postAddress.viewCountIncrease(postId));

/** 스터디 글 작성하기 */
export const createPost = (data: RecruitApiRequestDto): Promise<{ postId: number }> =>
  apiRequest("post", postAddress.recruit, data);

/** 스터디 글 수정하기 */
export const modifyPost = (postId: number, data: RecruitApiRequestDto) =>
  apiRequest("patch", postAddress.modify(postId), data);

/** 스터디 글 삭제하기 */
export const deletePost = (postId: number) => apiRequest("delete", postAddress.postId(postId));

/** 스터디 지원하기 */
export const applyPost = (postId: number) => apiRequest("post", postAddress.apply(postId));

/** 스터디 지원 취소하기 */
export const cancelApplyPost = (postId: number) => apiRequest("delete", postAddress.cancel(postId));

/** 지원한 유저 목록 가져오기
 *
 *@param {number} postId
 *@param {AppliedMemberListApiRequestDto}  qs  쿼리스트링을 객체로 받습니다.
 */
export const getAppliedMemberList = (
  postId: number,
  qs: AppliedMemberListApiRequestDto,
): Promise<AppliedMemberListApiResponseDto> => apiRequest("get", postAddress.apply(postId), null, qs);

/** 스터디 프로젝트 정보  */
export const getStudyManagement = (postId: number): Promise<StudyManagementApiResponseDto> =>
  apiRequest("get", postAddress.management(postId));

/** 스터디 모집 시작하기*/
export const recruitStart = (postId: number) => apiRequest("patch", postAddress.recruitStart(postId));

/** 스터디 시작하기(모집마감, PROGRESS로 변경됨) */
export const studyStart = (postId: number) => apiRequest("patch", postAddress.studyStart(postId));

/** 스터디 완료하기(PROGRESS_END로 변경됨)*/
export const studyEnd = (postId: number) => apiRequest("patch", postAddress.studyEnd(postId));

/** 스터디 리뷰 마감(DONE으로 변경됨) */
export const reviewEnd = (postId: number) => apiRequest("patch", postAddress.reviewEnd(postId));
