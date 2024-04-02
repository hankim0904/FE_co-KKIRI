import * as S from "./RecruitmentPost.styled";
import UserInfo from "@/components/commons/UserInfo";
import PostManagementButtons from "../PostManagementButtons";
import Count from "@/components/commons/Count";
import { ICONS } from "@/constants/icons";
import DOMPurify from "dompurify";
import { createTimePassedMessage } from "@/utils/formatDate";
import { PostDetails, PostApplyStatus } from "@/lib/api/post/type";
import { ContentSkeleton, TitleSkeleton } from "@/components/commons/Skeleton/TextSkeleton";
import UserProfileSkeleton from "@/components/commons/Skeleton/UserProfileSkeleton";
import { postDetailInitialData } from "@/lib/initialData/detail";
import useSkeleton from "@/hooks/useSkeleton";

interface RecruitmentPostProps {
  postDetails: PostDetails;
  postApplyStatus: PostApplyStatus;
  isLoading: boolean;
  className?: string;
}

export default function RecruitmentPost({ isLoading, postDetails, postApplyStatus, className }: RecruitmentPostProps) {
  const {
    postMemberId: id,
    postTitle,
    postContent,
    userProfileImg: profileImageUrl,
    userNickname: nickname,
    createdAt,
    viewCount,
    scrapCount,
  } = postDetails;
  const isVisibleSkeleton = useSkeleton(isLoading);

  const userInfo = { nickname, profileImageUrl, id };
  const isMine = postApplyStatus === "OWNER";

  const sanitizedContent = { __html: DOMPurify.sanitize(postContent) };

  return (
    <S.Container className={className}>
      {isVisibleSkeleton || postDetails === postDetailInitialData ? (
        <TitleSkeleton page="detail" />
      ) : (
        <S.Title>{postTitle}</S.Title>
      )}
      <S.Box>
        <S.PostInfoWrapper>
          {isVisibleSkeleton || postDetails === postDetailInitialData ? (
            <UserProfileSkeleton />
          ) : (
            <>
              <UserInfo user={userInfo} nicknameBold />
              <S.InfoDivider />
              <S.CreatedDate>{createTimePassedMessage(createdAt)}</S.CreatedDate>
            </>
          )}
        </S.PostInfoWrapper>
        {isMine && <PostManagementButtons />}
      </S.Box>
      <S.HorizontalDivider />
      {isVisibleSkeleton || postDetails === postDetailInitialData ? (
        <ContentSkeleton />
      ) : (
        <S.Content dangerouslySetInnerHTML={sanitizedContent} />
      )}
      <S.CountWrapper>
        <Count icon={ICONS.eye} count={viewCount} />
        <Count icon={ICONS.scrapEmpty} count={scrapCount} />
      </S.CountWrapper>
    </S.Container>
  );
}
