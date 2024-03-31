import { scoutAddress } from "../address";
import { apiRequest } from "../axios";
import { PaginationOptions } from "../pageMetaType";
import { InviteMemberRequestDto, ScoutListApiResponseDto } from "./type";

export const getPostsForScout = (paginationOptions: PaginationOptions): Promise<ScoutListApiResponseDto> =>
  apiRequest("get", scoutAddress.postsForScout, null, paginationOptions);

export const inviteScout = (data: InviteMemberRequestDto) => apiRequest("post", scoutAddress.inviteScout, data);
