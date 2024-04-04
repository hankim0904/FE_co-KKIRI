type TeamMember = {
  memberId: number;
  profileImageUrl: string;
  nickname: string;
  position: string;
};

export type TeamMemberListApiResponseDto = TeamMember[];

export type StudyReviewType = {
  type: ReviewType;
  content: string;
};

export type MemberReviewType = {
  revieweeMemberId: number;
  type: ReviewType;
  content: string;
};

type MemberReviewCommentType = {
  revieweeMemberId: number;
  comment: string;
};

export type ReviewType = "COMPLIMENT" | "IMPROVEMENT";

export const ReviewType = "COMPLIMENT" || "IMPROVEMENT";

export type ReviewFormValues = {
  postId: number;
  postReview: StudyReviewType[];
  memberReview: MemberReviewType[];
  memberReviewComment: MemberReviewCommentType[];
};

//  팀 리뷰 조회 관련 타입
export type MemberReviewComment = {
  comment: string;
};

export type TeamerReviewType = {
  type: ReviewType;
  content: string;
};

export type TeamReviewInfo = {
  postTitle: string;
  postReviews: StudyReviewType[];
  memberReviews: TeamerReviewType[];
  memberReviewComments: MemberReviewComment[];
};

export type TeamReviewApiResponseDto = TeamReviewInfo;
