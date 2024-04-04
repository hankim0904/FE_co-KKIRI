// 스터디 상세 스터디 댓글 목록
export type CommentInfo = {
  commentId: number;
  commentMemberId: number;
  commentProfileImg: string;
  commentNickname: string;
  commentCreatedAt: string;
  commentContent: string;
  isMine: boolean;
};

type PageMeta = {
  page: number;
  take: number;
  totalCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

// 댓글 목록
export type CommentApiResponseDto = {
  data: CommentInfo[];
  meta: PageMeta;
};

// 댓글 달기
export type CommentApiRequestDto = { content: string };
