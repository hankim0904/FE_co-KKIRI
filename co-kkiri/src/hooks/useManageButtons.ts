import { reviewEnd, studyEnd, studyStart } from "@/lib/api/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "./useToast";
import TOAST from "@/constants/toast";

export default function useManageButtons() {
  const pushToast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const goToScoutPage = () => {
    navigate(`/scout`);
  };

  const studyStartMutation = useMutation({
    mutationFn: (postId: number) => studyStart(postId),
    onSuccess: () => {
      pushToast(TOAST.success.message, TOAST.success.type);
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      pushToast(`${error.message}`, "error");
    },
  });

  const studyEndMutation = useMutation({
    mutationFn: (postId: number) => studyEnd(postId),
    onSuccess: () => {
      pushToast(TOAST.success.message, TOAST.success.type);
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      pushToast(`${error.message}`, "error");
    },
  });

  const studyReviewEndMutation = useMutation({
    mutationFn: (postId: number) => reviewEnd(postId),
    onSuccess: () => {
      pushToast(TOAST.success.message, TOAST.success.type);
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      pushToast(`${error.message}`, "error");
    },
  });

  const goToPostReviewPage = (postId: number) => {
    navigate(`/mystudy/${postId}/review`);
  };

  return { goToScoutPage, studyStartMutation, studyEndMutation, studyReviewEndMutation, goToPostReviewPage };
}
