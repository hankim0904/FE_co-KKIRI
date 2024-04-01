import { Member } from "@/lib/mock/review/members";
import MemberEvaluation from "./MemberEvaluation";
import SelectMember from "./SelectMember";
import { Control } from "react-hook-form";
import { FormValues } from "@/pages/Review";
import Divider from "@/components/commons/Divider";
import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";

interface MemberReviewProps {
  member: Member[];
  selectedMemberId: number;
  control: Control<FormValues>;
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
      <SelectMember member={member} selectedMemberId={selectedMemberId} onMemberClick={onMemberClick} />
      <Divider />
      <MemberEvaluation member={member} selectedMemberId={selectedMemberId} control={control} />
      <Wrapper>
        <Title>한줄 평가</Title>
        <ReviewCommentInput placeholder="한줄 평가를 입력해주세요" onChange={onChange} value={value} />
      </Wrapper>
    </Container>
  );
}

const { typography, color, mediaQueries } = DESIGN_TOKEN;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Title = styled.div`
  ${typography.font20Bold}
  color: ${color.black[1]};
  display: flex;
  gap: 0.8rem;
`;

const ReviewCommentInput = styled.input`
  height: 4.8rem;
  border: 0.1rem solid ${color.gray[2]};
  border-radius: 0.5rem;
  padding: 0 1.885rem;
  margin-bottom: 1.2rem;
  width: 91rem;

  ${mediaQueries.tablet} {
    width: 70.6rem;
  }

  ${mediaQueries.mobile} {
    width: 32rem;
  }

  &:focus {
    outline: none;
  }

  &::placeholder {
    ${typography.font16Semibold};
    color: ${color.gray[1]};
  }
`;
