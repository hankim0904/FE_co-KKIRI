import DESIGN_TOKEN from "@/styles/tokens";
import { ReactNode } from "react";
import styled from "styled-components";

interface RadioButtonProps {
  children?: ReactNode;
  value: string;
  onClick?: () => void;
  checked: boolean;
}

export default function RadioButton({ children, value, checked, onClick }: RadioButtonProps) {
  return (
    <Label>
      <RadioInput onChange={onClick} type="radio" name="invite" value={value} checked={checked} />
      {children}
    </Label>
  );
}

const { color } = DESIGN_TOKEN;

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
`;

const RadioInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 4.3rem;
  border: 0.1rem solid ${color.gray[2]};
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: ${color.secondary};
    border: 0.3rem solid white;
    box-shadow: 0 0 0 0.1rem ${color.secondary};
  }
`;
