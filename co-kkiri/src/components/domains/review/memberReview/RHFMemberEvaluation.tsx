import { Controller, Control } from "react-hook-form";
import { MemberReviewType, ReviewFormValues } from "@/lib/api/review/type";
import MemberEvaluationChip from "./MemberEvalutationChip";

interface RHFEvaluationPartProps {
  evaluationCategory: { [key: string]: string };
  formFieldName: keyof ReviewFormValues;
  control: Control<ReviewFormValues>;
  selectedMemberId?: number;
}

export default function RHFMemberEvaluation({
  evaluationCategory,
  formFieldName,
  control,
  selectedMemberId,
}: RHFEvaluationPartProps) {
  return (
    <Controller
      control={control}
      name={formFieldName}
      render={({ field }) => (
        <MemberEvaluationChip
          evaluationCategory={evaluationCategory}
          selectedChips={field.value as MemberReviewType[]}
          onOptionChange={field.onChange}
          selectedMemberId={selectedMemberId || 0}
        />
      )}
    />
  );
}
