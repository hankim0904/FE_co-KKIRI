import MemberEvaluationSection from "./MemberEvaluationSection";
import SelectMember from "./SelectMember";
import { Control } from "react-hook-form";
import Divider from "@/components/commons/Divider";
import styled from "styled-components";
import { ReviewFormValues, TeamMemberListApiResponseDto } from "@/lib/api/review/type";
import { ICONS } from "@/constants/icons";
import DESIGN_TOKEN from "@/styles/tokens";

interface MemberReviewProps {
  member: TeamMemberListApiResponseDto;
  selectedMemberId: number;
  control: Control<ReviewFormValues>;
  onMemberClick: (teamMemberId: number) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export default function MemberReview({
  member,
  selectedMemberId,
  control,
  onMemberClick,
  onChange,
  value,
}: MemberReviewProps) {
  return (
    <Container>
      <Title>
        <img src={ICONS.number2.src} alt={ICONS.number2.alt} />
        <div>멤버 평가</div>
      </Title>
      <SelectMember members={member} onMemberClick={onMemberClick} control={control} />
      <Divider />
      <MemberEvaluationSection
        member={member}
        selectedMemberId={selectedMemberId}
        control={control}
        onChange={onChange}
        value={value}
      />
    </Container>
  );
}

const { typography, color, mediaQueries } = DESIGN_TOKEN;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 91rem;

  ${mediaQueries.tablet} {
    width: 100%;
  }

  ${mediaQueries.mobile} {
    gap: 2rem;
  }
`;

const Title = styled.div`
  ${typography.font20Bold}
  color: ${color.black[1]};
  display: flex;
  gap: 0.8rem;
`;
