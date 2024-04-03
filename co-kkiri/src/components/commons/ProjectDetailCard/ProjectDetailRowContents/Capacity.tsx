import { DROPDOWN_FORM_INFO } from "@/constants/dropDown";
import { RowContent } from "../ProjectDetailRowContent";

export default function Capacity({ content }: { content: number }) {
  if (content === DefaultValue) {
    return <RowContent>{"인원 미정"}</RowContent>;
  }
  return (
    <RowContent>
      {DROPDOWN_FORM_INFO.recruitment.capacity.find(({ value: contentValue }) => contentValue === content)?.label}
    </RowContent>
  );
}

const DefaultValue = 999;
