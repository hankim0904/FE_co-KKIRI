import React from "react";
import styled from "styled-components";
import Label from "./Label";

export interface FormFieldProps<ValueType> {
  onChange: (value: ValueType) => void;
  value: ValueType;
  isError?: boolean;
  helperText?: string;
}

interface FormElementProps<ValueType> {
  label: string;
  isEssential?: boolean;
  FormFieldComponent: React.ReactElement<FormFieldProps<ValueType>>;
  className?: string;
}

export default function FormElement<ValueType>({
  label,
  isEssential,
  FormFieldComponent: InputComponent,
  className,
}: FormElementProps<ValueType>) {
  return (
    <Container className={className}>
      <Label label={label} isEssential={isEssential} />
      {InputComponent}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
