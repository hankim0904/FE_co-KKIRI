import DefaultModalLayout from "./ModalLayout";
import UserProfileCardLayout from "../commons/UserProfileCard/UserProfileCardLayout";
import styled from "styled-components";
import Button from "../commons/Button";
import useOpenToggle from "@/hooks/useOpenToggle";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMemberProfile } from "@/lib/api/member";
import { MemberProfileApiResponseDto } from "@/lib/api/member/type";
import { memberProfile } from "@/constants/initialDatas";
import ScoutModal from "./ScoutModal";
import { useToast } from "@/hooks/useToast";
import { useEffect } from "react";
import DESIGN_TOKEN from "@/styles/tokens";

interface UserProfileModalProps {
  userId: number;
  onClose: () => void;
}

export default function UserProfileModal({ userId, onClose }: UserProfileModalProps) {
  const pushToast = useToast();
  const { isOpen: isInvitedModalOpen, setIsOpen: setIsInvitedModalOpen } = useOpenToggle();
  const queryClient = useQueryClient();

  const { data, isError } = useQuery<MemberProfileApiResponseDto>({
    queryKey: ["memberProfile", userId],
    queryFn: ({ queryKey }) => getMemberProfile(queryKey[1] as number),
    placeholderData: () => {
      const data = queryClient.getQueryData<MemberProfileApiResponseDto>(["memberProfile", userId]);
      return data || memberProfile;
    },
    staleTime: 1000 * 60,
  });

  const onScoutClickHandler = () => {
    setIsInvitedModalOpen(true);
  };

  useEffect(() => {
    if (isError) {
      pushToast("유저 정보를 불러오는 중 오류가 발생했습니다", "error");
    }
  }, [isError, pushToast]);

  if (!data) {
    // 스켈레톤 UI 추가
    return null;
  }

  return (
    <>
      {!isInvitedModalOpen && (
        <ModalLayout desktopWidth={430} tabletWidth={430} mobileWidth={320} onClose={onClose} isCloseClickOutside>
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

const { mediaQueries } = DESIGN_TOKEN;

const ModalLayout = styled(DefaultModalLayout)`
  padding: 4rem 3rem 3rem;

  min-height: 48.5rem;

  ${mediaQueries.mobile} {
    min-height: 47.5rem;
  }
`;
