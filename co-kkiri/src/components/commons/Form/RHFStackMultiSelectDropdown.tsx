import { Control, Controller, FieldValues, Path } from "react-hook-form";
import FormStackMultiSelectDropdown from "./FormStackMultiSelectDropdown";

interface RHFStackMultiSelectDropdownProps<ControlType extends FieldValues> {
  limit: number;
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
}

export default function RHFStackMultiSelectDropdown<ControlType extends FieldValues>({
  formFieldName,
  control,
  limit,
}: RHFStackMultiSelectDropdownProps<ControlType>) {
  return (
    <Controller
      name={formFieldName}
      control={control}
      rules={{
        validate: (fieldArrayValues) => {
          return fieldArrayValues.length > limit ? `최대 ${limit}개 까지만 선택 가능합니다.` : true;
        },
      }}
      render={({ field, fieldState }) => (
        <FormStackMultiSelectDropdown
          value={field.value}
          onChange={field.onChange}
          isError={fieldState.invalid}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
}
