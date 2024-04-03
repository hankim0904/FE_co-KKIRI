import { TeamReviewApiResponseDto } from "@/lib/api/review/type";

export const TEAM_REVIEW_INFO: TeamReviewApiResponseDto = {
  postTitle: "테스트 스터디",
  postReviews: [
    {
      type: "COMPLIMENT",
      content: "팀원간 소통이 활발했어요",
    },
    {
      type: "IMPROVEMENT",
      content: "약속된 기간 안에 끝나지 않았어요",
    },
  ],
  memberReviews: [
    { type: "COMPLIMENT", content: "시간 약속을 잘 지켜요 ⏰" },
    { type: "COMPLIMENT", content: "문서정리를 잘해주세요 📑" },
    { type: "COMPLIMENT", content: "열정적이에요 🔥" },
    { type: "IMPROVEMENT", content: "맡은 일은 끝까지! 🎯" },
    { type: "IMPROVEMENT", content: "조금 더 의견을 내볼까요? 💡" },
  ],
  memberReviewComments: [
    {
      comment: "감사했습니다!",
    },
    {
      comment: "다들 고생했습니다!",
    },
    {
      comment: "이제 취업 뿌셔봅시다!",
    },
    {
      comment: "많이 성장했습니다!",
    },
    {
      comment: "감사했습니다!",
    },
    {
      comment: "다들 고생했습니다!",
    },
    {
      comment: "이제 취업 뿌셔봅시다!",
    },
    {
      comment: "많이 성장했습니다!",
    },
  ],
};

export const emojis = [
  "👩🏻",
  "🧑🏻",
  "👧🏻",
  "👦🏻",
  "👩🏻‍",
  "👨🏻‍",
  "👱🏻‍",
  "👱🏻‍",
  "👩🏻‍",
  "👨🏻‍",
  "👩",
  "🧑",
  "👧",
  "👦",
  "👩",
  "👨‍",
  "👱‍",
  "👱‍",
  "👩‍",
  "👨‍",
];
