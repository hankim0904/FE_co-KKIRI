import UserInfo from "@/components/commons/UserInfo";
import FormElement from "@/components/commons/Form/FormElement";
import { EVALUATION_COMMENT, EVALUATION_TYPE } from "@/constants/evaluationChip";
import RHFEvaluationPart from "./RHFEvaluationPart";
import { ReviewFormValues } from "@/lib/api/review/type";
import { Control } from "react-hook-form";
import styled from "styled-components";
import PositionChip from "@/components/commons/Chips/PositionChip";
import { TeamMemberListApiResponseDto } from "@/lib/api/review/type";
import DESIGN_TOKEN from "@/styles/tokens";

interface MemberEvaluation {
  member: TeamMemberListApiResponseDto;
  selectedMemberId: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  control: Control<ReviewFormValues>;
}

export default function MemberEvaluation({
  member,
  selectedMemberId,
  onChange,
  value = "",
  control,
}: MemberEvaluation) {
  const selectedMember = member.find((teamMember) => teamMember.memberId === selectedMemberId);

  return (
    <Container>
      {selectedMember && (
        <>
          <MemberWrapper>
            <UserInfo
              user={{
                id: selectedMemberId,
                nickname: selectedMember.nickname,
                profileImageUrl: selectedMember.profileImageUrl,
              }}
            />
            <PositionChip label={selectedMember.position} />
          </MemberWrapper>
          <Box>
            <FormElement
              label={EVALUATION_TYPE.compliments}
              FormFieldComponent={
                <RHFEvaluationPart
                  type="member"
                  evaluationCategory={EVALUATION_COMMENT.compliments.member}
                  formFieldName="memberReview"
                  control={control}
                  selectedMemberId={selectedMemberId}
                />
              }
            />
            <FormElement
              label={EVALUATION_TYPE.improvements}
              FormFieldComponent={
                <RHFEvaluationPart
                  type="member"
                  evaluationCategory={EVALUATION_COMMENT.improvements.member}
                  formFieldName="memberReview"
                  control={control}
                  selectedMemberId={selectedMemberId}
                />
              }
            />
          </Box>
          <CommentWrapper>
            <Title>한줄 평가</Title>
            <ReviewCommentInput placeholder="한줄 평가를 입력해주세요" onChange={onChange} value={value} />
          </CommentWrapper>
        </>
      )}
    </Container>
  );
}

const { typography, color, mediaQueries } = DESIGN_TOKEN;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const MemberWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  position: relative;
`;

const CommentWrapper = styled.div`
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
