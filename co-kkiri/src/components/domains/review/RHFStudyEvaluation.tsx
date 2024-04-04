import { Controller, Control } from "react-hook-form";
import EvaluationChip from "./StudyEvaluationChip";
import { ReviewFormValues, StudyReviewType } from "@/lib/api/review/type";

interface RHFEvaluationPartProps {
  evaluationCategory: { [key: string]: string };
  formFieldName: keyof ReviewFormValues;
  control: Control<ReviewFormValues>;
  selectedMemberId?: number;
}

export default function RHFStudyEvaluation({ evaluationCategory, control, selectedMemberId }: RHFEvaluationPartProps) {
  return (
    <>
      <Controller
        control={control}
        name="postReview"
        render={({ field }) => (
          <EvaluationChip
            evaluationCategory={evaluationCategory}
            selectedChips={field.value as StudyReviewType[]}
            onChange={field.onChange}
            selectedMemberId={selectedMemberId || 0}
          />
        )}
      />
    </>
  );
}
