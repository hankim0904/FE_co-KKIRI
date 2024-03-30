import { styled } from "styled-components";
import DeadlineDropdown from "../DropDowns/DeadlineDropdown/DeadlineDropdown";
import { FormFieldProps } from "../Form/FormElement";
import DESIGN_TOKEN from "@/styles/tokens";

interface FormDeadlinePicker extends FormFieldProps<Date | undefined> {}

export default function FormDeadlinePicker({ onChange, value, isError, helperText }: FormDeadlinePicker) {
  return (
    <Container>
      <DeadlineDropdown placeholder="모집 마감 기간" selectedOption={value} onChange={onChange} $isError={isError} />
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
