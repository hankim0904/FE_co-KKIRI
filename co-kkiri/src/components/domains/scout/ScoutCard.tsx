import UserProfileCard from "@/components/commons/UserProfileCard";
import ScoutModal from "@/components/modals/ScoutModal";
import useOpenToggle from "@/hooks/useOpenToggle";
import { SearchedMemberProfile } from "@/lib/api/member/type";
import styled from "styled-components";

interface ScoutCardProps extends SearchedMemberProfile {}

export default function ScoutCard(props: ScoutCardProps) {
  const { isOpen: isInvitedModalOpen, openToggle } = useOpenToggle();

  return (
    <>
      <Container onClick={openToggle}>
        <UserProfileCard
          profileImageUrl={props.profileImageUrl}
          nickname={props.nickname}
          position={props.position}
          career={props.career}
          stack={props.stacks}
          score={props.score}
          cardType="scout"
        />
      </Container>
      {isInvitedModalOpen && <ScoutModal memberId={props.memberId} onClose={openToggle} />}
    </>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
`;
