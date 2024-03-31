import DefaultModalLayout from "./ModalLayout";
import UserProfileCardLayout from "../commons/UserProfileCard/UserProfileCardLayout";
import styled from "styled-components";
import { useUserInfoStore } from "@/stores/userInfoStore";
import Button from "../commons/Button";
import DESIGN_TOKEN from "@/styles/tokens";
import Divider from "../commons/Divider";
import DefaultCollapseSection from "../commons/CollapseSection";
import useOpenToggle from "@/hooks/useOpenToggle";
import EvaluationChip from "../commons/Chips/EvaluationChip";
import { isEmptyValue } from "@/utils/validationUtils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMemberProfile } from "@/lib/api/member";
import { MemberProfileApiResponseDto } from "@/lib/api/member/type";
import { memberProfile } from "@/constants/initialDatas";

interface UserProfileModalProps {
  userId: number;
  onClose: () => void;
}

export default function UserProfileModal({ userId, onClose }: UserProfileModalProps) {
  const queryClient = useQueryClient();

  const { data } = useQuery<MemberProfileApiResponseDto>({
    queryKey: ["memberProfile", userId],
    queryFn: ({ queryKey }) => getMemberProfile(queryKey[1] as number),
    initialData: () => {
      const data = queryClient.getQueryData<MemberProfileApiResponseDto>(["memberProfile", userId]);
      return data || memberProfile;
    },
    initialDataUpdatedAt: () => queryClient.getQueryState(["memberProfile", userId])?.dataUpdatedAt,
  });

  const { userId: myId } = useUserInfoStore();
  return (
    <ModalLayout desktopWidth={430} tabletWidth={430} mobileWidth={320} onClose={onClose}>
      <UserProfileCardLayout {...data} score={data.gauge} />
      <Divider />
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
      {myId !== userId && <Button variant="primary">스카우트</Button>}
    </ModalLayout>
  );
}

const emptyMessages = {
  tags: "아직 받은 태그가 없어요.",
};

const { color, typography } = DESIGN_TOKEN;

const ModalLayout = styled(DefaultModalLayout)`
  padding: 4rem 3rem 3rem;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
`;

const CollapseSection = styled(DefaultCollapseSection)`
  margin-bottom: 2rem;
`;

const CollapseBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.8rem;
`;
const EmptyCollapseBody = styled.div`
  margin-top: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${color.gray[1]};
  ${typography.font12Regular}
`;
const Introduce = styled.p`
  color: ${color.black[1]};

  ${typography.font14Medium}
  text-align: center;
`;

const Link = styled.a`
  color: ${color.black[3]};
  ${typography.font12Medium}
`;
