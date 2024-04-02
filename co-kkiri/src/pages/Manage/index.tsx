import MemberList from "@/components/domains/manage/MemberList";
import * as S from "./styled";
import AppliedList from "@/components/domains/manage/AppliedList";
import { getAppliedMemberList, getStudyManagement } from "@/lib/api/post";
import { getTeamMember } from "@/lib/api/teamMember";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/useToast";

export default function Manage() {
  const pushToast = useToast();
  const { id } = useParams();
  const postId = Number(id);

  const { data: detailInfo, error: detailInfoError } = useQuery({
    queryKey: ["management", postId],
    queryFn: () => getStudyManagement(postId),
  });
  const { data: appliedMemberList, error: appliedMemberListError } = useQuery({
    queryKey: ["appliedMemberList", postId],
    queryFn: () => getAppliedMemberList(postId, { page: 1, take: 100 }),
  });
  const { data: memberList, error: memberListError } = useQuery({
    queryKey: ["memberList", postId],
    queryFn: () => getTeamMember(postId, { page: 1, take: 100 }),
  });

  const appliedMemberListData = appliedMemberList?.data || [];
  const memberListData = memberList?.data || [];

  if (detailInfoError) {
    pushToast(`${detailInfoError.message}`, "error");
  }

  if (appliedMemberListError) {
    pushToast(`${appliedMemberListError.message}`, "error");
  }

  if (memberListError) {
    pushToast(`${memberListError.message}`, "error");
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
        {detailInfo && <S.DetailSection detailInfo={detailInfo} />}
        <S.ListSection>
          <AppliedList detailInfo={appliedMemberListData} isLeader={detailInfo?.isLeader} type={detailInfo?.status} />
          <MemberList detailInfo={memberListData} isLeader={detailInfo?.isLeader} type={detailInfo?.status} />
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
