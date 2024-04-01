import UserProfileCard from "@/components/commons/UserProfileCard";
import UserProfileModal from "@/components/modals/UserProfileModal";
import useOpenToggle from "@/hooks/useOpenToggle";
import { SearchedMemberProfile } from "@/lib/api/member/type";
import styled from "styled-components";

interface ScoutCardProps extends SearchedMemberProfile {}

export default function ScoutCard(props: ScoutCardProps) {
  const { isOpen: isUserProfileModalOpen, openToggle:userProfileModalOpenToggle } = useOpenToggle();

  return (
    <>
      <Container onClick={userProfileModalOpenToggle}>
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
      {isUserProfileModalOpen && <UserProfileModal userId={props.memberId} onClose={userProfileModalOpenToggle}/>}
    </>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
`;
