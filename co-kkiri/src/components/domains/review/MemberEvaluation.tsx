import UserInfo from "@/components/commons/UserInfo";
import { Member } from "@/lib/mock/review/members";
import FormElement from "@/components/commons/Form/FormElement";
import { EVALUATION_COMMENT, EVALUATION_TYPE } from "@/constants/evaluationChip";
import RHFEvaluationPart from "./RHFEvaluationPart";
import { FormValues } from "@/pages/Review";
import { Control } from "react-hook-form";
import Divider from "@/components/commons/Divider";
import styled from "styled-components";
import PositionChip from "@/components/commons/Chips/PositionChip";

interface MemberEvaluation {
  member: Member[];
  selectedMemberId: number;
  control: Control<FormValues>;
}

export default function MemberEvaluation({ member, selectedMemberId, control }: MemberEvaluation) {
  const selectedMember = member.find((m) => m.teamMemberId === selectedMemberId);

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
                  evaluationCategory={EVALUATION_COMMENT.compliments.member}
                  formFieldName="MemberCompliments"
                  control={control}
                />
              }
            />
            <FormElement
              label={EVALUATION_TYPE.improvements}
              FormFieldComponent={
                <RHFEvaluationPart
                  evaluationCategory={EVALUATION_COMMENT.improvements.member}
                  formFieldName="MemberImprovements"
                  control={control}
                />
              }
            />
          </Box>
        </>
      )}
    </Container>
  );
}

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
