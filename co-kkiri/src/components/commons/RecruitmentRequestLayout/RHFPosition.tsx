import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Option } from "./PositionChips";
import PositionChips from "./PositionChips";
import DESIGN_TOKEN from "@/styles/tokens";

interface PHFPosition<ControlType extends FieldValues> {
  positionCategory: Option[];
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
}

export default function RHFPosition<ControlType extends FieldValues>({
  positionCategory,
  formFieldName,
  control,
}: PHFPosition<ControlType>) {
  return (
    <Controller
      control={control}
      rules={{ required: "필수값을 입력해주세요" }}
      name={formFieldName}
      render={({ field, fieldState }) => (
        <PositionChips
          positionCategory={positionCategory}
          selectedChips={field.value}
          onChange={field.onChange}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
}
