import { PageMeta } from "../pageMetaType";

export type ScoutPost = {
  postId: number;
  title: string;
};

/**스카우트 스터디/프로젝트 목록 -백엔드 확인요망*/
export type ScoutListApiResponseDto = {
  data: ScoutPost[];
  meta: PageMeta;
};

/**스카우트하기 */
export type InviteMemberRequestDto = {
  postId: number;
  memberId: number;
  message: string;
};
