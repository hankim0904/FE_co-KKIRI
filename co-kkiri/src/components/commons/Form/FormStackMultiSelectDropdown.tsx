import DESIGN_TOKEN from "@/styles/tokens";
import styled from "styled-components";
import MultiselectDropdown from "../DropDowns/StackMultiselectDropdown";
import { FormFieldProps } from "./FormElement";

interface FormStackMultiSelectDropdownProps extends FormFieldProps<string[]> {}

export default function FormStackMultiSelectDropdown({
  value,
  onChange,
  isError,
  helperText,
}: FormStackMultiSelectDropdownProps) {
  return (
    <Container>
      <MultiselectDropdown selectedOptions={value} onSelectChange={onChange} isError={isError} />
      <HelperText>{helperText}</HelperText>
    </Container>
  );
}

const { color, typography } = DESIGN_TOKEN;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const HelperText = styled.p`
  min-height: 1.5rem;

  color: ${color.red};
  ${typography.font12Medium}
`;
