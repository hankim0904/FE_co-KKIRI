import { useMutation, useQueryClient } from "@tanstack/react-query";
import { scrapAdd, scrapCancel } from "@/lib/api/scrap";
import { useToast } from "../useToast";
import TOAST from "@/constants/toast";

const { serverError, unauthorized } = TOAST;

function useScrapMutations(postId: number, isScraped: boolean) {
  const queryClient = useQueryClient();
  const pushToast = useToast();

  const ScrapMutation = useMutation({
    mutationFn: () => scrapAdd(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homeCardList"] });
      queryClient.invalidateQueries({ queryKey: ["/my-page/scrap/list"] });
      queryClient.invalidateQueries({ queryKey: ["postDetail", postId] });
      queryClient.invalidateQueries({ queryKey: ["/post/list"] });
      queryClient.invalidateQueries({ queryKey: ["myStudyList"] });
    },
    onError: (error) => {
      if (error.name === "Unauthorized") {
        pushToast(unauthorized.message, unauthorized.type);
        return;
      }
      pushToast(serverError.message, serverError.type);
    },
  });

  const CancelScrapMutation = useMutation({
    mutationFn: () => scrapCancel(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homeCardList"] });
      queryClient.invalidateQueries({ queryKey: ["/my-page/scrap/list"] });
      queryClient.invalidateQueries({ queryKey: ["postDetail", postId] });
      queryClient.invalidateQueries({ queryKey: ["/post/list"] });
      queryClient.invalidateQueries({ queryKey: ["myStudyList"] });
    },
    onError: (error) => {
      if (error.name === "Unauthorized") {
        pushToast(unauthorized.message, unauthorized.type);
        return;
      }
      pushToast(serverError.message, serverError.type);
    },
  });

  return { ScrapMutation, CancelScrapMutation };
}

export default useScrapMutations;
