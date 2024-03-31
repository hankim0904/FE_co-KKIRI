import { inviteScout } from "@/lib/api/scout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../useToast";

export default function useScoutMutations() {
  const pushToast = useToast();

  const ScoutMutation = useMutation({
    mutationFn: inviteScout,
    onSuccess: () => {
      pushToast("스카웃이 요청되었습니다", "success");
    },
    onError: (error) => {
      switch (error.name) {
        case "Bad Request":
          pushToast("이미 스카웃한 유저입니다", "error");
          break;
        default:
          pushToast("스카웃 요청 중 오류가 발생했습니다", "error");
      }
    },
  });

  return { ScoutMutation };
}
