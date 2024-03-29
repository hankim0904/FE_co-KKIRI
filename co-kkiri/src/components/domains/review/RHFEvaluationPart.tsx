import { Controller, Control, FieldValue, FieldValues } from "react-hook-form";
import EvaluationPart from "./EvaluationPart";
import { FormValues } from "@/pages/Review";

interface RHFEvaluationPartProps {
  evaluationCategory: { [key: string]: string };
  formFieldName: keyof FormValues;
  control: Control<FormValues>;
}

export default function RHFEvaluationPart({ evaluationCategory, formFieldName, control }: RHFEvaluationPartProps) {
  return (
    <Controller
      control={control}
      name={formFieldName}
      render={({ field }) => (
        <EvaluationPart evaluationCategory={evaluationCategory} selectedChips={field.value} onChange={field.onChange} />
      )}
    />
  );
}
