import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";
import { InvitedMemberListApiResponseDto } from "@/lib/api/post/type";
import UserInfo from "@/components/commons/UserInfo";
import SectionTitle from "./SectionTitle";
import PositionChip from "@/components/commons/Chips/PositionChip";
import { ICONS } from "@/constants/icons";
import { useToast } from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectMember } from "@/lib/api/teamMember";
import TOAST from "@/constants/toast";
import useSkeleton from "@/hooks/useSkeleton";
import UserProfileSkeleton from "@/components/commons/Skeleton/UserProfileSkeleton";

interface InviteListProps {
  detailInfo: InvitedMemberListApiResponseDto["data"];
  isLeader?: boolean;
  type?: "READY" | "PROGRESS" | "PROGRESS_END" | "DONE";
  isLoading: boolean;
}

export default function InvitedList({ detailInfo, isLeader, type, isLoading }: InviteListProps) {
  const invitedMemberListData = detailInfo || [];
  const pushToast = useToast();
  const queryClient = useQueryClient();
  const isVisibleSkeleton = useSkeleton(isLoading);

  const handleReject = useMutation({
    mutationFn: (teamMemberId: number) => rejectMember(teamMemberId),
    onSuccess: () => {
      pushToast(TOAST.success.message, TOAST.success.type);
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      pushToast(`${error.message}`, "error");
    },
  });

  const handleRejectMember = (teamMemberId: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      return handleReject.mutate(teamMemberId);
    } else {
      return;
    }
  };

  return isLeader && type === "READY" ? (
    <Container>
      <SectionTitle title="초대 목록" count={invitedMemberListData.length} />
      <Members>
        {invitedMemberListData.map((member) => (
          <Box>
            <MemberWrapper>
              {isVisibleSkeleton ? (
                <UserProfileSkeleton />
              ) : (
                <UserInfo
                  user={{ id: member.memberId, nickname: member.nickname, profileImageUrl: member.profileImageUrl }}
                />
              )}
              <PositionChip label={member.position} />
            </MemberWrapper>
            <DeleteWrapper>
              <button onClick={() => handleRejectMember(member.teamMemberId)}>
                <img src={ICONS.reject.src} alt={ICONS.reject.alt} />
              </button>
            </DeleteWrapper>
          </Box>
        ))}
      </Members>
    </Container>
  ) : null;
}

const { mediaQueries } = DESIGN_TOKEN;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 35rem;

  ${mediaQueries.mobile} {
    width: 28.8rem;
  }
`;

const Members = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MemberWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

const DeleteWrapper = styled.div`
  display: flex;
  gap: 2.4rem;
`;
