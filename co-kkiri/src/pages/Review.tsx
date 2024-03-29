import FormElement from "@/components/commons/Form/FormElement";
import RHFEvaluationPart from "@/components/domains/review/RHFEvaluationPart";
import { EVALUATION_COMMENT, EVALUATION_TYPE } from "@/constants/evaluationChip";
import { useForm } from "react-hook-form";

export interface FormValues {
  TeamImprovements: string[];
  TeamCompliments: string[];
}

export default function Review() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { TeamImprovements: [] },
  });

  const onSubmitHandler = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
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
      <button type="submit">제출</button>
    </form>
  );
}
