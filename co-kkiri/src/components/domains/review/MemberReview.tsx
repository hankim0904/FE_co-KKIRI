import MemberEvaluationSection from "./MemberEvaluationSection";
import SelectMember from "./SelectMember";
import { Control, FieldArrayWithId } from "react-hook-form";
import Divider from "@/components/commons/Divider";
import styled from "styled-components";
import { ReviewFormValues, TeamMemberListApiResponseDto } from "@/lib/api/review/type";

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
