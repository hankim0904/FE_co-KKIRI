import { Control, Controller, FieldValues, Path } from "react-hook-form";
import FormDropdown from "./FormDropdown";
import { Option } from "../RecruitmentRequestLayout/PositionChips";

interface RHFDropdownProps<ControlType extends FieldValues> {
  placeholder: string;
  options: Option[];
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  isEssential?: boolean;
  errorMessage?: string;
}

export default function RHFDropdown<ControlType extends FieldValues>({
  placeholder,
  options,
  formFieldName,
  control,
  isEssential,
  errorMessage,
}: RHFDropdownProps<ControlType>) {
  return (
    <Controller
      name={formFieldName}
      control={control}
      rules={isEssential ? { required: errorMessage || "필수값을 입력해주세요" } : {}}
      render={({ field, fieldState }) => (
        <FormDropdown
          placeholder={placeholder}
          value={options.find((option) => option.value === field.value) || { label: "", value: "" }}
          options={options}
          onChange={(option: Option) => {
            field.onChange(option.value);
          }}
          isError={fieldState.invalid}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
}
