import FormElement from "@/components/commons/Form/FormElement";
import { EVALUATION_COMMENT, EVALUATION_TYPE } from "@/constants/evaluationChip";
import styled from "styled-components";
import RHFEvaluationPart from "./RHFEvaluationPart";
import { Control } from "react-hook-form";
import { ReviewFormValues } from "@/lib/api/review/type";

interface StudyEvaluationProps {
  control: Control<ReviewFormValues>;
}

export default function StudyEvaluation({ control }: StudyEvaluationProps) {
  return (
    <Container>
      <Box>
        <FormElement
          label={EVALUATION_TYPE.compliments}
          FormFieldComponent={
            <RHFEvaluationPart
              type="study"
              evaluationCategory={EVALUATION_COMMENT.compliments.team}
              formFieldName="postReview"
              control={control}
            />
          }
        />
        <FormElement
          label={EVALUATION_TYPE.improvements}
          FormFieldComponent={
            <RHFEvaluationPart
              type="study"
              evaluationCategory={EVALUATION_COMMENT.improvements.team}
              formFieldName="postReview"
              control={control}
            />
          }
        />
      </Box>
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
