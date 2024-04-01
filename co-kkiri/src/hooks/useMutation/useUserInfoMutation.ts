import { editUserInfo } from "@/lib/api/myPage";
import { UserInfoApiResponseDto, UserInfoEditApiRequestDto } from "@/lib/api/myPage/type";
import { useUserInfoStore } from "@/stores/userInfoStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../useToast";

export const useUserInfoMutation = () => {
  const pushToast = useToast();
  const { fetchUserInfo } = useUserInfoStore();

  const { mutate } = useMutation<void, Error,UserInfoEditApiRequestDto>({
    mutationFn: (data: UserInfoEditApiRequestDto) => editUserInfo(data),
    onSuccess: () => {
      fetchUserInfo();
      pushToast("성공적으로 수정되었습니다", "success");
    },
    onError: () => {
      pushToast("유저 정보 수정에 실패했습니다", "error");
    },
  });

  return mutate;
};
