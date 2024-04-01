import { useMutation, useQueryClient } from "@tanstack/react-query";
import { scrapAdd, scrapCancel } from "@/lib/api/scrap";

function useScrapMutations(postId: number, isScraped: boolean) {
  const queryClient = useQueryClient();

  const ScrapMutation = useMutation({
    mutationFn: () => scrapAdd(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homeCardList"] });
      queryClient.invalidateQueries({ queryKey: ["/my-page/scrap/list"] });
      queryClient.invalidateQueries({ queryKey: ["postDetail", postId] });
      queryClient.invalidateQueries({ queryKey: ["/post/list"] });
    },
  });

  const CancelScrapMutation = useMutation({
    mutationFn: () => scrapCancel(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homeCardList"] });
      queryClient.invalidateQueries({ queryKey: ["/my-page/scrap/list"] });
      queryClient.invalidateQueries({ queryKey: ["postDetail", postId] });
      queryClient.invalidateQueries({ queryKey: ["/post/list"] });
    },
  });

  return { ScrapMutation, CancelScrapMutation };
}

export default useScrapMutations;
