type TeamMember = {
  memberId: number;
  profileImageUrl: string;
  nickname: string;
  position: string;
};

export type TeamMemberListApiResponseDto = TeamMember[];

export type PostReviewType = {
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
  content: string;
};

export type ReviewType = "COMPLIMENT" | "IMPROVEMENT";

export const ReviewType = "COMPLIMENT" || "IMPROVEMENT";

export type ReviewFormValues = {
  postId: number;
  postReview: PostReviewType[];
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
  postReviews: PostReviewType[];
  memberReviews: TeamerReviewType[];
  memberReviewComments: MemberReviewComment[];
};

export type TeamReviewApiResponseDto = TeamReviewInfo;
