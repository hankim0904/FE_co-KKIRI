import { useState, useEffect, useRef } from "react";
import * as S from "./styled";
import useComponentHeight from "@/hooks/useComponentHeight";
import ScrollToTop from "@/components/commons/FloatingButton/ScrollToTop";
import { useQuery } from "@tanstack/react-query";
import { getPostDetail } from "@/lib/api/post";
import { useNavigate, useParams } from "react-router-dom";
import { PostDetailApiResponseDto } from "@/lib/api/post/type";
import usePostMutation from "@/hooks/useMutation/usePostMutation";
import { useToast } from "@/hooks/useToast";
import TOAST from "@/constants/toast";

const { serverError, deletePost, notFoundPost } = TOAST;

export default function Detail() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = Number(id);
  const [viewCountIncreased, setViewCountIncreased] = useState(false);
  const { increaseViewCountMutation } = usePostMutation();
  const pushToast = useToast();

  useEffect(() => {
    if (postId) {
      increaseViewCountMutation.mutate(postId, {
        onSuccess: () => {
          setViewCountIncreased(true);
        },
        onError: (error) => {
          if (error.name === "Gone") {
            pushToast(deletePost.message, deletePost.type);
            navigate("/list");
            return;
          }
          if (error.name === "Not Found") {
            pushToast(notFoundPost.message, notFoundPost.type);
            navigate("/list");
            return;
          }
          pushToast(serverError.message, serverError.type);
        },
      });
    }
  }, []);

  const {
    data: detailData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["postDetail", postId],
    queryFn: () => getPostDetail(postId),
    retry: 0,
    staleTime: 60 * 1000,
    enabled: viewCountIncreased,
  });

  const cardHeight = useComponentHeight<PostDetailApiResponseDto | undefined>(detailData, cardRef, 407);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
    // 에러 및 로딩 처리 통일
  }

  const { postDetails, postApplyStatus } = detailData;
  const teamInviteId = postDetails.teamInviteId ?? NaN;
  const postType = postDetails.type === "PROJECT" ? "프로젝트" : "스터디";
  const kakaoShareInfo = { title: postDetails.postTitle, name: postDetails.userNickname, postType };

  return (
    <S.Container>
      <S.Box>
        <S.GoBackButton />
        <S.ShareAndScrapButton isScraped={postDetails.isScraped} postId={postId} kakaoShareInfo={kakaoShareInfo} />
        <S.PostSection postDetails={postDetails} postApplyStatus={postApplyStatus} />
        <S.DetailCardSection cardRef={cardRef} postDetails={postDetails} />
        <S.CommentsSection postId={postId} />
        <S.ButtonSection
          $cardHeight={cardHeight}
          postApplyStatus={postApplyStatus}
          postId={postId}
          teamInviteId={teamInviteId}
        />
        <ScrollToTop />
      </S.Box>
    </S.Container>
  );
}
