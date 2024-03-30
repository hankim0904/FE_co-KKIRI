import { Control, Controller, FieldValues, Path } from "react-hook-form";
import LinkInput from "./LinkInput";
import DESIGN_TOKEN from "@/styles/tokens";
import { styled } from "styled-components";
import QuillEditor from "../ReactQuill";
import { TitleInput } from "./RecruitLayout.styled";

interface REFQuillProps<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
}

export default function RHFQuill<ControlType extends FieldValues>({
  formFieldName,
  control,
}: REFQuillProps<ControlType>) {
  return (
    <Controller
      name={formFieldName}
      control={control}
      render={({ field }) => <QuillEditor onChange={(value) => field.onChange(value)} value={field.value} />}
    />
  );
}
