import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";
import UserInfo from "@/components/commons/UserInfo";
import { ICONS } from "@/constants/icons";
import { TeamMemberListApiResponseDto } from "@/lib/api/review/type";
import useReviewStore from "@/stores/reviewStore";

interface SelectMemberProps {
  members: TeamMemberListApiResponseDto;
  selectedMemberId: number;
  onMemberClick: (teamMemberId: number) => void;
  isReviewed: boolean;
}

export default function SelectMember({ members, onMemberClick, isReviewed }: SelectMemberProps) {
  const { selectedMemberId, setSelectedMemberId } = useReviewStore();
  const handleMemberClick = (teamMemberId: number) => {
    onMemberClick(teamMemberId);
    setSelectedMemberId(teamMemberId);
  };

  return (
    <Container>
      {members.map((member) => (
        <Box key={member.memberId} onClick={() => handleMemberClick(member.memberId)}>
          <MemberWrapper $isSelected={selectedMemberId === member.memberId}>
            <UserInfo
              user={{ id: member.memberId, nickname: member.nickname, profileImageUrl: member.profileImageUrl }}
              type="review"
            />
          </MemberWrapper>
          {
            <SelectedMember>
              {isReviewed ? (
                <CheckImg src={ICONS.checked.src} alt={ICONS.checked.alt} />
              ) : (
                <CheckImg src={ICONS.unchecked.src} alt={ICONS.unchecked.alt} />
              )}
            </SelectedMember>
          }
        </Box>
      ))}
    </Container>
  );
}

const { color } = DESIGN_TOKEN;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 0.6rem;
  position: relative;
`;

const MemberWrapper = styled.div<{ $isSelected?: boolean }>`
  color: ${({ $isSelected }) => ($isSelected ? ` ${color.black[1]}` : `${color.gray[1]}`)};
  display: flex;
  gap: 1.2rem;
  align-items: center;

  img {
    opacity: ${({ $isSelected }) => ($isSelected ? 1 : 0.4)};
  }

  &:hover {
    cursor: pointer;
    color: ${({ $isSelected }) => !$isSelected && `${color.black[1]}`};

    img {
      opacity: 1;
    }
  }
`;

const SelectedMember = styled.div`
  position: absolute;
  top: 2.2rem;
  left: 2.2rem;
`;

const CheckImg = styled.img`
  opacity: 1;
  &:hover {
    opacity: 1;
  }
`;
