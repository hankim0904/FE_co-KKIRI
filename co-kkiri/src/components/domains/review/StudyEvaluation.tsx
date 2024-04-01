import FormElement from "@/components/commons/Form/FormElement";
import { EVALUATION_COMMENT, EVALUATION_TYPE } from "@/constants/evaluationChip";
import styled from "styled-components";
import RHFEvaluationPart from "./RHFEvaluationPart";
import { FormValues } from "@/pages/Review";
import { Control } from "react-hook-form";

interface StudyEvaluationProps {
  control: Control<FormValues>;
}

export default function StudyEvaluation({ control }: StudyEvaluationProps) {
  return (
    <Container>
      <Box>
        <FormElement
          label={EVALUATION_TYPE.compliments}
          FormFieldComponent={
            <RHFEvaluationPart
              evaluationCategory={EVALUATION_COMMENT.compliments.team}
              formFieldName="TeamCompliments"
              control={control}
            />
          }
        />
        <FormElement
          label={EVALUATION_TYPE.improvements}
          FormFieldComponent={
            <RHFEvaluationPart
              evaluationCategory={EVALUATION_COMMENT.improvements.team}
              formFieldName="TeamImprovements"
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
