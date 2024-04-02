import Button, { ButtonVariant } from "@/components/commons/Button";
import DESIGN_TOKEN from "@/styles/tokens";
import styled from "styled-components";

interface ManageButtonProps {
  text: string;
  buttonCount: number;
  variant: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
}

export default function ManageButton({ text, buttonCount, variant, onClick, disabled }: ManageButtonProps) {
  return (
    <ButtonWrapper $numOfButtons={buttonCount}>
      <Button variant={variant} onClick={onClick} disabled={disabled}>
        {text}
      </Button>
    </ButtonWrapper>
  );
}

const { mediaQueries } = DESIGN_TOKEN;

const ButtonWrapper = styled.div<{ $numOfButtons: number }>`
  width: ${({ $numOfButtons }) => ($numOfButtons === 1 ? "50rem" : "24.4rem")};

  ${mediaQueries.tablet} {
    width: ${({ $numOfButtons }) => ($numOfButtons === 1 ? "32rem" : "15.6rem")};
  }

  ${mediaQueries.mobile} {
    width: ${({ $numOfButtons }) => ($numOfButtons === 1 ? "32rem" : "15.6rem")};
  }
`;
