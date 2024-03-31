import StudyProjectRadioButton from "./StudyProjectRadioButton";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface RHFRadioButtonProps<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
}

export default function RHFRadioButton<ControlType extends FieldValues>({
  formFieldName,
  control,
}: RHFRadioButtonProps<ControlType>) {
  return (
    <Controller
      name={formFieldName}
      control={control}
      render={({ field }) => <StudyProjectRadioButton selectedValue={field.value} onChange={field.onChange} />}
    />
  );
}
