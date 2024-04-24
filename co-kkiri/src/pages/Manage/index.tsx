import MemberList from "@/components/domains/manage/MemberList";
import * as S from "./styled";
import AppliedList from "@/components/domains/manage/AppliedList";
import { getAppliedMemberList, getInvitedMemberList, getStudyManagement } from "@/lib/api/post";
import { getTeamMember } from "@/lib/api/teamMember";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import DetailCardSkeleton from "@/components/commons/Skeleton/DetailCardSkeleton";
import { ICONS } from "@/constants/icons";
import { TitleSkeleton } from "@/components/commons/Skeleton/TextSkeleton";
import useSkeleton from "@/hooks/useSkeleton";
import InvitedList from "@/components/domains/manage/InvitedList";

export default function Manage() {
  const pushToast = useToast();
  const { id } = useParams();
  const postId = Number(id);

  const {
    data: detailInfo,
    error: detailInfoError,
    isLoading: detailInfoIsLoading,
  } = useQuery({
    queryKey: ["management", postId],
    queryFn: () => getStudyManagement(postId),
  });

  const {
    data: appliedMemberList,
    error: appliedMemberListError,
    isLoading: appliedMemberListIsLoading,
  } = useQuery({
    queryKey: ["appliedMemberList", postId],
    queryFn: () => getAppliedMemberList(postId, { page: 1, take: 100 }),
  });

  const {
    data: memberList,
    error: memberListError,
    isLoading: memberListIsLoading,
  } = useQuery({
    queryKey: ["memberList", postId],
    queryFn: () => getTeamMember(postId, { page: 1, take: 100 }),
  });

  const {
    data: invitedMemberList,
    error: invitedMemberListError,
    isLoading: invitedMemberListIsLoading,
  } = useQuery({
    queryKey: ["invitedMemberList", postId],
    queryFn: () => getInvitedMemberList(postId, { page: 1, take: 100 }),
  });

  const isVisibleSkeleton = useSkeleton(detailInfoIsLoading);
  const appliedMemberListData = appliedMemberList?.data || [];
  const memberListData = memberList?.data || [];
  const invitedMemberListData = invitedMemberList?.data || [];

  if (detailInfoError) {
    pushToast(`${detailInfoError.message}`, "error");
  }

  if (appliedMemberListError) {
    pushToast(`${appliedMemberListError.message}`, "error");
  }

  if (memberListError) {
    pushToast(`${memberListError.message}`, "error");
  }

  if (invitedMemberListError) {
    pushToast(`${invitedMemberListError.message}`, "error");
  }

  const changeName = (type: string) => {
    switch (type) {
      case "STUDY":
        return "스터디";
      case "PROJECT":
        return "프로젝트";
      default:
        return "스터디";
    }
  };

  return (
    <S.Container>
      <S.Box>
        <S.TitleSection>
          <Link to={`/list/${detailInfo?.postId}`}>
            <S.LinkTitleWrapper>
              <p>스터디/프로젝트 상세글 보기</p>
              <img src={ICONS.arrowRightGray.src} alt={ICONS.arrowRightGray.alt} />
            </S.LinkTitleWrapper>
          </Link>
          {isVisibleSkeleton ? <TitleSkeleton page="mystudy" /> : <S.Title>{detailInfo?.postTitle}</S.Title>}
        </S.TitleSection>
        {isVisibleSkeleton ? (
          <DetailCardSkeleton page="mystudy" />
        ) : (
          detailInfo && <S.DetailCard detailInfo={detailInfo} />
        )}
        <S.ListSection>
          <AppliedList
            detailInfo={appliedMemberListData}
            isLeader={detailInfo?.isLeader}
            type={detailInfo?.status}
            isLoading={appliedMemberListIsLoading}
          />
          <InvitedList
            detailInfo={invitedMemberListData}
            isLeader={detailInfo?.isLeader}
            type={detailInfo?.status}
            isLoading={invitedMemberListIsLoading}
          />
          <MemberList
            detailInfo={memberListData}
            isLeader={detailInfo?.isLeader}
            type={detailInfo?.status}
            isLoading={memberListIsLoading}
          />
        </S.ListSection>
        {detailInfo && (
          <S.ButtonSection
            buttonType={detailInfo.status}
            isLeader={detailInfo.isLeader}
            postId={postId}
            studyType={changeName(detailInfo.type)}
          />
        )}
      </S.Box>
    </S.Container>
  );
}
