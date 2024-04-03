import SectionTitle from "./SectionTitle";
import UserInfo from "@/components/commons/UserInfo";
import styled from "styled-components";
import PositionChip from "@/components/commons/Chips/PositionChip";
import DESIGN_TOKEN from "@/styles/tokens";
import { ICONS } from "@/constants/icons";
import { AppliedMemberListApiResponseDto } from "@/lib/api/post/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptMember, rejectMember } from "@/lib/api/teamMember";
import { useToast } from "@/hooks/useToast";
import TOAST from "@/constants/toast";
import useSkeleton from "@/hooks/useSkeleton";
import UserProfileSkeleton from "@/components/commons/Skeleton/UserProfileSkeleton";

interface AppliedListProps {
  detailInfo: AppliedMemberListApiResponseDto["data"];
  isLeader?: boolean;
  type?: "READY" | "PROGRESS" | "PROGRESS_END" | "DONE";
  isLoading: boolean;
}

export default function AppliedList({ detailInfo, isLeader, type, isLoading }: AppliedListProps) {
  const pushToast = useToast();
  const queryClient = useQueryClient();
  const detailInfoData = detailInfo || [];
  const isVisibleSkeleton = useSkeleton(isLoading);

  const handleAccept = useMutation({
    mutationFn: (teamMemberId: number) => acceptMember(teamMemberId),
    onSuccess: () => {
      pushToast(TOAST.success.message, TOAST.success.type);
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      pushToast(`${error.message}`, "error");
    },
  });

  const handleAcceptMember = (teamMemberId: number) => {
    handleAccept.mutate(teamMemberId);
  };

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
    handleReject.mutate(teamMemberId);
  };

  return (
    <Container>
      <SectionTitle title="신청 목록" count={detailInfoData.length} />
      <Members>
        {detailInfoData.map((info) => (
          <Box key={info.memberId}>
            <MemberWrapper>
              {isVisibleSkeleton ? (
                <UserProfileSkeleton />
              ) : (
                <UserInfo
                  user={{ id: info.memberId, nickname: info.nickname, profileImageUrl: info.profileImageUrl }}
                />
              )}

              <PositionChip label={info.position} />
            </MemberWrapper>
            {type === "READY" && isLeader && (
              <AcceptWrapper>
                <button onClick={() => handleAcceptMember(info.teamMemberId)}>
                  <img src={ICONS.accept.src} alt={ICONS.accept.alt} />
                </button>
                <button onClick={() => handleRejectMember(info.teamMemberId)}>
                  <img src={ICONS.reject.src} alt={ICONS.reject.alt} />
                </button>
              </AcceptWrapper>
            )}
          </Box>
        ))}
      </Members>
    </Container>
  );
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

const AcceptWrapper = styled.div`
  display: flex;
  gap: 2.4rem;
`;
