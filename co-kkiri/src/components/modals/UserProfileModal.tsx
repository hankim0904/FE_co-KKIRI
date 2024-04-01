import DefaultModalLayout from "./ModalLayout";
import UserProfileCardLayout from "../commons/UserProfileCard/UserProfileCardLayout";
import styled from "styled-components";
import Button from "../commons/Button";
import DESIGN_TOKEN from "@/styles/tokens";
import useOpenToggle from "@/hooks/useOpenToggle";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMemberProfile } from "@/lib/api/member";
import { MemberProfileApiResponseDto } from "@/lib/api/member/type";
import { memberProfile } from "@/constants/initialDatas";
import ScoutModal from "./ScoutModal";

interface UserProfileModalProps {
  userId: number;
  // onScoutClick: () => void;
  onClose: () => void;
}

export default function UserProfileModal({ userId, onClose }: UserProfileModalProps) {
  const queryClient = useQueryClient();
  const { isOpen: isInvitedModalOpen, setIsOpen: setIsInvitedModalOpen } = useOpenToggle();

  const { data } = useQuery<MemberProfileApiResponseDto>({
    queryKey: ["memberProfile", userId],
    queryFn: ({ queryKey }) => getMemberProfile(queryKey[1] as number),
    initialData: () => {
      const data = queryClient.getQueryData<MemberProfileApiResponseDto>(["memberProfile", userId]);
      return data || memberProfile;
    },
    initialDataUpdatedAt: () => queryClient.getQueryState(["memberProfile", userId])?.dataUpdatedAt,
  });

  const onScoutClickHandler = () => {
    setIsInvitedModalOpen(true);
  };

  return (
    <>
      {!isInvitedModalOpen && (
        <ModalLayout desktopWidth={430} tabletWidth={430} mobileWidth={320} onClose={onClose}>
          <UserProfileCardLayout {...data} score={data.gauge} />
          {/* <Divider /> */}
          {/* <CollapseSection title="유저가 받은 태그" isCollapsed={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {isEmptyValue(data?.memberProfile.tags) ? (
          <EmptyCollapseBody>{emptyMessages.tags}</EmptyCollapseBody>
        ) : (
          <CollapseBody>
            {Object.entries(data?.memberProfile.tags).map(([tag, count]) => (
              <EvaluationChip key={tag} label={`${tag} ${count}`} evaluationWay="compliments" />
            ))}
          </CollapseBody>
        )}
      </CollapseSection> */}
          {/* //TODO: 내 프로필이어도 안보여야함 - 백엔드 추가 필요 */}
          {data.isVisibleProfile && (
            <Button variant="primary" onClick={onScoutClickHandler}>
              스카우트
            </Button>
          )}
        </ModalLayout>
      )}

      {isInvitedModalOpen && (
        <ScoutModal
          memberInfo={{ ...data }}
          onClose={() => {
            setIsInvitedModalOpen(false);
          }}
        />
      )}
    </>
  );
}

const ModalLayout = styled(DefaultModalLayout)`
  padding: 4rem 3rem 3rem;
`;
