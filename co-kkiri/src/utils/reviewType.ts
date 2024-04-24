import { EVALUATION_COMMENT } from "@/constants/evaluationChip";
import { ReviewType } from "@/lib/api/review/type";

export const reviewType = (content: string): ReviewType => {
  if (
    Object.values(EVALUATION_COMMENT.compliments.team).includes(content) ||
    Object.values(EVALUATION_COMMENT.compliments.member).includes(content)
  ) {
    return "COMPLIMENT";
  }
  if (
    Object.values(EVALUATION_COMMENT.improvements.team).includes(content) ||
    Object.values(EVALUATION_COMMENT.improvements.member).includes(content)
  ) {
    return "IMPROVEMENT";
  }
  throw new Error("");
};
