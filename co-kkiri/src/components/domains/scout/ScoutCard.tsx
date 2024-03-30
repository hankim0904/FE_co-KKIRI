import UserProfileCard from "@/components/commons/UserProfileCard";
import ScoutModal from "@/components/modals/ScoutModal";
import useOpenToggle from "@/hooks/useOpenToggle";
import { SearchedMemberProfile } from "@/lib/api/member/type";

interface ScoutCardProps extends SearchedMemberProfile {}

export default function ScoutCard(props: ScoutCardProps) {
  const { isOpen: isInvitedModalOpen, openToggle } = useOpenToggle();

  return (
    <>
      <div onClick={openToggle}>
        <UserProfileCard
          profileImageUrl={props.profileImageUrl}
          nickname={props.nickname}
          position={props.position}
          career={props.career}
          stack={props.stacks}
          score={props.score}
          cardType="scout"
        />
      </div>
      {isInvitedModalOpen && <ScoutModal memberId={props.memberId} onClose={openToggle} />}
    </>
  );
}
