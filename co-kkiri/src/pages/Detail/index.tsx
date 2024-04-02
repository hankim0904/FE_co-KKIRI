import { useState, useEffect, useRef } from "react";
import * as S from "./styled";
import useComponentHeight from "@/hooks/useComponentHeight";
import ScrollToTop from "@/components/commons/FloatingButton/ScrollToTop";
import { useQuery } from "@tanstack/react-query";
import { getPostDetail } from "@/lib/api/post";
import { useParams } from "react-router-dom";
import { PostDetailApiResponseDto } from "@/lib/api/post/type";
import usePostMutation from "@/hooks/useMutation/usePostMutation";
import { postDetailInitialData } from "@/lib/initialData/detail";
import { useHandleError } from "@/hooks/useHandleError";

export default function Detail() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const postId = Number(id);
  const [viewCountIncreased, setViewCountIncreased] = useState(false);
  const { increaseViewCountMutation } = usePostMutation();
  const handleError = useHandleError();

  useEffect(() => {
    if (postId) {
      increaseViewCountMutation.mutate(postId, {
        onSuccess: () => {
          setViewCountIncreased(true);
        },
        onError: (error) => handleError(error),
      });
    }
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["postDetail", postId],
    queryFn: () => getPostDetail(postId),
    retry: 0,
    staleTime: 60 * 1000,
    enabled: viewCountIncreased,
  });

  const cardHeight = useComponentHeight<PostDetailApiResponseDto | undefined>(data, cardRef, 407);

  const postDetails = data?.postDetails || postDetailInitialData;
  const postApplyStatus = data?.postApplyStatus || "NOT_APPLIED";

  const teamInviteId = postDetails.teamInviteId ?? NaN;
  const postType = postDetails.type === "PROJECT" ? "프로젝트" : "스터디";
  const kakaoShareInfo = { title: postDetails.postTitle, name: postDetails.userNickname, postType };

  return (
    <S.Container>
      <S.Box>
        <S.GoBackButton />
        <S.ShareAndScrapButton isScraped={postDetails.isScraped} postId={postId} kakaoShareInfo={kakaoShareInfo} />
        <S.PostSection postDetails={postDetails} postApplyStatus={postApplyStatus} isLoading={isLoading} />
        <S.DetailCardSection cardRef={cardRef} postDetails={postDetails} isLoading={isLoading} />
        <S.CommentsSection postId={postId} />
        <S.ButtonSection
          $cardHeight={cardHeight}
          postApplyStatus={postApplyStatus}
          postId={postId}
          teamInviteId={teamInviteId}
          isLoading={isLoading}
        />
        <ScrollToTop />
      </S.Box>
    </S.Container>
  );
}
