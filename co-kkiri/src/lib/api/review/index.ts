import { reviewAddress } from "../address";
import { apiRequest } from "../axios";
import { ReviewFormValues, TeamMemberListApiResponseDto, TeamReviewApiResponseDto } from "./type";

/** 리뷰 할 팀원 목록 가져오기 */
export const getMemberList = (postId: number): Promise<TeamMemberListApiResponseDto> =>
  apiRequest("get", reviewAddress.memberList(postId));

/** 리뷰 제출하기 */
export const postReview = (data: ReviewFormValues) => apiRequest("post", reviewAddress.review);

/** 작성된 리뷰 가져오기 */
export const getReviewInfo = () => apiRequest("get", reviewAddress.reviewInfo);

/** 완료된 팀 리뷰 조회하기 */
export const getReview = (postId: number): Promise<TeamReviewApiResponseDto> =>
  apiRequest("get", reviewAddress.teamReview(postId));
