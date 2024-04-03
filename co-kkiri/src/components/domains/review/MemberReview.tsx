import MemberEvaluation from "./MemberEvaluation";
import SelectMember from "./SelectMember";
import { Control } from "react-hook-form";
import Divider from "@/components/commons/Divider";
import styled from "styled-components";
import { ReviewFormValues, TeamMemberListApiResponseDto } from "@/lib/api/review/type";
import useReviewStore from "@/stores/reviewStore";

interface MemberReviewProps {
  member: TeamMemberListApiResponseDto;
  selectedMemberId: number;
  control: Control<ReviewFormValues>;
  onMemberClick: (teamMemberId: number) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  isReviewed: boolean;
}

export default function MemberReview({
  member,
  selectedMemberId,
  control,
  onMemberClick,
  onChange,
  value,
  isReviewed,
}: MemberReviewProps) {
  return (
    <Container>
      <SelectMember
        members={member}
        selectedMemberId={selectedMemberId}
        onMemberClick={onMemberClick}
        isReviewed={isReviewed}
      />
      <Divider />
      <MemberEvaluation
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
