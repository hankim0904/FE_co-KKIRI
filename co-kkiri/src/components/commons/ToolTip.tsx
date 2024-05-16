import DESIGN_TOKEN from "@/styles/tokens";
import { useState } from "react";
import styled, { keyframes } from "styled-components";

interface ToolTip {
  children: React.ReactNode;
  message: string;
}

export default function ToolTip({ children, message }: ToolTip) {
  const [hover, setHover] = useState(false);

  return (
    <Container onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {children}
      <Message $hover={hover}>{message}</Message>
    </Container>
  );
}

const { color, typography, zIndex, boxShadow, mediaQueries } = DESIGN_TOKEN;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const Container = styled.div`
  position: relative;
`;

const Message = styled.div<{ $hover: boolean }>`
  ${typography.font12Regular};
  ${zIndex.tooltip}
  position: absolute;
  bottom: 0;
  left: 12rem;
  background-color: ${color.primary[3]};
  border: ${color.primary[1]} solid 0.1rem;
  border-radius: 0.5rem;
  color: ${color.primary[1]};
  padding: 0.5rem 1rem;
  width: max-content;
  box-shadow: ${boxShadow.content};
  opacity: 0;
  animation: ${({ $hover }) => ($hover ? fadeIn : fadeOut)} 0.5s ease-in-out forwards;

  ${mediaQueries.mobile} {
    left: 11.5rem;
  }
`;
