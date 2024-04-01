import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";
import UserInfo from "@/components/commons/UserInfo";
import { ICONS } from "@/constants/icons";
import { Member, memberData } from "@/lib/mock/review/members";

interface SelectMemberProps {
  member: Member[];
  selectedMemberId: number;
  onMemberClick: (teamMemberId: number) => void;
}

export default function SelectMember({ member, selectedMemberId, onMemberClick }: SelectMemberProps) {
  const handleMemberClick = (teamMemberId: number) => {
    onMemberClick(teamMemberId);
  };

  return (
    <Container>
      {member.map((member) => (
        <Box key={member.teamMemberId} onClick={() => handleMemberClick(member.teamMemberId)}>
          <MemberWrapper $isSelected={selectedMemberId === member.teamMemberId}>
            <UserInfo
              user={{ id: member.teamMemberId, nickname: member.nickname, profileImageUrl: member.profileImageUrl }}
              type="review"
            />
          </MemberWrapper>
          {
            <SelectedMember>
              {member.isReviewed ? (
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
