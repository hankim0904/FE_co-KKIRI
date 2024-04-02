import { EVALUATION_COMMENT } from "@/constants/evaluationChip";

interface MyPageReview {
  type: "COMPLIMENT" | "IMPROVMENT";
  content?: string;
  count: number;
}

interface MyPageReviewList {
  reviewList: MyPageReview[];
}

export const recievedReviews: MyPageReviewList = {
  reviewList: [
    { type: "COMPLIMENT", content: EVALUATION_COMMENT.compliments.member.creative, count: 3 },
    { type: "COMPLIMENT", content: EVALUATION_COMMENT.compliments.member.informative, count: 7 },
    { type: "COMPLIMENT", content: EVALUATION_COMMENT.compliments.member.leadership, count: 3 },
    { type: "COMPLIMENT", content: EVALUATION_COMMENT.compliments.member.moodMaker, count: 2 },
    { type: "COMPLIMENT", content: EVALUATION_COMMENT.compliments.member.organizer, count: 1 },
    { type: "IMPROVMENT", content: EVALUATION_COMMENT.improvements.member.dogmatic, count: 1 },
    { type: "IMPROVMENT", content: EVALUATION_COMMENT.improvements.member.freeloader, count: 3 },
    { type: "IMPROVMENT", content: EVALUATION_COMMENT.improvements.member.passive, count: 5 },
    { type: "IMPROVMENT", content: EVALUATION_COMMENT.improvements.member.tardiness, count: 7 },
    { type: "IMPROVMENT", content: EVALUATION_COMMENT.improvements.member.bystander, count: 7 },
  ],
};
