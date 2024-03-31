import { Control, Controller, FieldValues, Path } from "react-hook-form";
import MultiselectDropdown from "../DropDowns/StackMultiselectDropdown";

interface RHFStackPopoverProps<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
}

export default function RHFMultiselectDropdown<ControlType extends FieldValues>({
  formFieldName,
  control,
}: RHFStackPopoverProps<ControlType>) {
  return (
    <Controller
      name={formFieldName}
      control={control}
      render={({ field }) => (
        <MultiselectDropdown
          selectedOptions={field.value}
          onSelectChange={(stack) => {
            field.onChange(stack);
          }}
        />
      )}
    />
  );
}
