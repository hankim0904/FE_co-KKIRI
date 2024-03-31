import { SearchedMemberProfile } from "@/lib/api/member/type";
import { Option } from "@/types/PositionTypes";

export type CombinedResults = {
  options: Option[];
  userInfo: Pick<SearchedMemberProfile, "nickname" | "profileImageUrl" | "position">;
};
