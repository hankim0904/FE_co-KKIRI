import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, modifyPost, deletePost, applyPost, cancelApplyPost } from "@/lib/api/post";
import { RecruitApiRequestDto } from "@/lib/api/post/type";

interface ModifyPostPayload {
  postId: number;
  data: RecruitApiRequestDto;
}

export default function usePostMutation() {
  const queryClient = useQueryClient();
  const invalidateCardList = () => {
    queryClient.invalidateQueries({ queryKey: ["/post/list"] }),
      queryClient.invalidateQueries({ queryKey: ["homeCardList"] });
  };

  const uploadMutation = useMutation({
    mutationFn: (data: RecruitApiRequestDto) => createPost(data),
    onSuccess: invalidateCardList,
    onError: (error) => console.error(error, error.message),
  });

  const editMutation = useMutation({
    mutationFn: ({ postId, data }: ModifyPostPayload) => modifyPost(postId, data),
    onSuccess: (_, postId) => queryClient.invalidateQueries({ queryKey: ["postDetail", postId] }),
    onError: (error) => console.error(error, error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: invalidateCardList,
    onError: (error) => console.error(error, error.message),
  });

  const applyMutation = useMutation({
    mutationFn: (postId: number) => applyPost(postId),
    onSuccess: (_, postId) => queryClient.invalidateQueries({ queryKey: ["postDetail", postId] }),
    onError: (error) => console.error(error, error.message),
  });

  const cancelMutation = useMutation({
    mutationFn: (postId: number) => cancelApplyPost(postId),
    onSuccess: (_, postId) => queryClient.invalidateQueries({ queryKey: ["postDetail", postId] }),
    onError: (error) => console.error(error, error.message),
  });

  return { uploadMutation, editMutation, deleteMutation, applyMutation, cancelMutation };
}
