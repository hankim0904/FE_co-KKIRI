import { myPostAddress } from "../address";
import { apiRequest } from "../axios";
import { PaginationOptions } from "../pageMetaType";
import {
  CompletedListApiResponseDto,
  MyAppliedListApiResponseDto,
  OnGoingListApiResponseDto,
  RecruitedListApiResponseDto,
  WaitingListApiResponseDto,
} from "./type";

/** 내가 신청한 스터디 목록 가져오기 */
export const getApplyList = (qs: PaginationOptions): Promise<MyAppliedListApiResponseDto> =>
  apiRequest("get", myPostAddress.applyList, null, qs);

/** 내가 모집한 스터디 목록 가져오기 */
export const getRecruitList = (qs: PaginationOptions): Promise<RecruitedListApiResponseDto> =>
  apiRequest("get", myPostAddress.recruitList, null, qs);

/** 내가 대기중인 스터디 목록 가져오기 */
export const getWaitingList = (qs: PaginationOptions): Promise<WaitingListApiResponseDto> =>
  apiRequest("get", myPostAddress.waitingList, null, qs);

/** 내가 진행중인 스터디 목록 가져오기 */
export const getOnGoingList = (qs: PaginationOptions): Promise<OnGoingListApiResponseDto> =>
  apiRequest("get", myPostAddress.onGoingList, null, qs);

/** 내가 완료한 스터디 목록 가져오기 */
export const getCompletedList = (qs: PaginationOptions): Promise<CompletedListApiResponseDto> =>
  apiRequest("get", myPostAddress.completedList, null, qs);

/** 진행중인 스터디 완료하기 */
// data 추가해야 함
export const completeOnGoing = () => apiRequest("patch", myPostAddress.onGoingComplete);

// /** 피어리뷰 작성하기 */
// //data 추가해야 함
// export const createReview = () => apiRequest("post", myPostAddress.review);

// /** 피어리뷰 목록 가져오기 */
// // Promise 추가해야 함
// export const getReviewInfo = () => apiRequest("get", myPostAddress.reviewInfo);
