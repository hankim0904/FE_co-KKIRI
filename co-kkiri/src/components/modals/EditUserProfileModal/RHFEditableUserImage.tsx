import { Control, Controller, FieldValues, Path } from "react-hook-form";
import UserImage from "./UserImage";

interface RHFEditableUserImageProps<ControlType extends FieldValues> {
  onImageChange?: (file: File) => void;
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
}

export default function RHFEditableUserImage<ControlType extends FieldValues>({
  onImageChange,
  formFieldName,
  control,
}: RHFEditableUserImageProps<ControlType>) {
  return (
    <Controller
      name={formFieldName}
      control={control}
      render={({ field }) => (
        <UserImage
          profileImgUrl={field.value}
          onSelect={(file) => {
            const ProfileImgUrl = URL.createObjectURL(file as File);
            onImageChange?.(file as File);
            field.onChange(ProfileImgUrl);
          }}
          isEditable
        />
      )}
    />
  );
}
