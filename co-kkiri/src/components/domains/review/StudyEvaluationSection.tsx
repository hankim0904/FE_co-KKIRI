import FormElement from "@/components/commons/Form/FormElement";
import { EVALUATION_COMMENT, EVALUATION_TYPE } from "@/constants/evaluationChip";
import styled from "styled-components";
import RHFStudyEvaluationPart from "./RHFStudyEvaluation";
import { Control } from "react-hook-form";
import { ReviewFormValues } from "@/lib/api/review/type";

interface StudyEvaluationSectionProps {
  control: Control<ReviewFormValues>;
}

export default function StudyEvaluationSection({ control }: StudyEvaluationSectionProps) {
  return (
    <Container>
      <Box>
        <FormElement
          label={EVALUATION_TYPE.compliments}
          FormFieldComponent={
            <RHFStudyEvaluationPart
              evaluationCategory={EVALUATION_COMMENT.compliments.team}
              formFieldName="postReview"
              control={control}
            />
          }
        />
        <FormElement
          label={EVALUATION_TYPE.improvements}
          FormFieldComponent={
            <RHFStudyEvaluationPart
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
