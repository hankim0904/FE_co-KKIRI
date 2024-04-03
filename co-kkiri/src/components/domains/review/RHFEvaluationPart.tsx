import { Controller, Control } from "react-hook-form";
import EvaluationPart from "./EvaluationPart";
import { MemberReviewType, PostReviewType, ReviewFormValues } from "@/lib/api/review/type";

interface RHFEvaluationPartProps {
  evaluationCategory: { [key: string]: string };
  formFieldName: keyof ReviewFormValues;
  control: Control<ReviewFormValues>;
  selectedMemberId?: number;
  type: "study" | "member";
}

export default function RHFEvaluationPart({
  evaluationCategory,
  formFieldName,
  control,
  selectedMemberId,
  type,
}: RHFEvaluationPartProps) {
  return (
    <Controller
      control={control}
      name={formFieldName}
      render={({ field }) => (
        <EvaluationPart
          type={type}
          evaluationCategory={evaluationCategory}
          selectedChips={field.value as MemberReviewType[] | PostReviewType[]}
          onChange={field.onChange}
          selectedMemberId={selectedMemberId || 0}
        />
      )}
    />
  );
}
