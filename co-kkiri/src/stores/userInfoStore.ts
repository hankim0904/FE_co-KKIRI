import { getUserInfo } from "@/lib/api/myPage";
import { UserInfoApiResponseDto, UserInfoEditApiRequestDto } from "@/lib/api/myPage/type";
import { SetterFromState } from "@/types/objectUtilTypes";
import { create } from "zustand";

interface UserInfoState {
  userId: number | null;
  userInfo: UserInfoApiResponseDto | null;
  isLoading: boolean;
  isVisible: boolean;
}

type UserInfoSetter = SetterFromState<UserInfoState>;

type UserInfoActions = {
  fetchUserInfo: () => Promise<void>;
  resetUserInfo: () => void;
};

type UserInfoStore = UserInfoState & UserInfoSetter & UserInfoActions;

const initialState: UserInfoState = {
  userId: null,
  userInfo: null,
  isLoading: true,
  isVisible: false,
};

export const useUserInfoStore = create<UserInfoStore>((set) => ({
  ...initialState,

  setUserId: (userId) => set({ userId }),
  setUserInfo: (userInfo) => set({ userInfo }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsVisible: (isVisible) => set({ isVisible }),
  resetUserInfo: () => set({ ...initialState }),
  fetchUserInfo: async () => {
    let userProfile: UserInfoApiResponseDto | null = null;
    try {
      const data: UserInfoApiResponseDto = await getUserInfo();
      const { nickname, profileImageUrl, position, career, introduce, link, gauge } = data;
      userProfile = {
        nickname,
        profileImageUrl,
        position,
        career,
        introduce,
        stack: data.stack,
        link,
        gauge,
      };
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    } finally {
      set({ userInfo: userProfile, isLoading: false });
    }
  },
}));
