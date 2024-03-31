import { Controller, Control, FieldValues, Path, FieldError } from "react-hook-form";

import FormDeadlinePicker from "./FormDeadlinePicker";
interface FormDeadlineDropdownProps<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  placeholder: string;
  isError?: FieldError;
}

export default function RHFDeadlineDropdown<ControlType extends FieldValues>({
  formFieldName,
  control,
}: FormDeadlineDropdownProps<ControlType>) {
  return (
    <Controller
      control={control}
      name={formFieldName}
      rules={{ required: "필수값을 입력해주세요" }}
      render={({ field, fieldState }) => (
        <FormDeadlinePicker
          onChange={field.onChange}
          value={field.value}
          isError={fieldState.invalid}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
}
