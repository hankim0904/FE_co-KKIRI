import { DROPDOWN_FORM_INFO } from "@/constants/dropDown";
import { getLabelFromValue } from "@/utils/objectUtils";
import { RowContent } from "../ProjectDetailRowContent";

export default function Capacity({ content }: { content: number }) {
  if (!content) {
    return <RowContent>{getLabelFromValue(DROPDOWN_FORM_INFO.recruitment.capacity, content)}</RowContent>;
  }
  return (
    <RowContent>
      {DROPDOWN_FORM_INFO.recruitment.capacity.find(({ value: contentValue }) => contentValue === content)?.label}
    </RowContent>
  );
}
