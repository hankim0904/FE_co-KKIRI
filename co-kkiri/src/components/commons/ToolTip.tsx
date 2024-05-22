import DESIGN_TOKEN from "@/styles/tokens";
import { useState } from "react";
import styled from "styled-components";

interface ToolTip {
  children: React.ReactNode;
  message: string;
}

export default function ToolTip({ children, message }: ToolTip) {
  const [hover, setHover] = useState(false);

  return (
    <Container onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {children}
      <Message className="toolTip" $hover={hover}>
        {message}
      </Message>
    </Container>
  );
}

const { color, typography, zIndex, boxShadow, mediaQueries } = DESIGN_TOKEN;

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
  opacity: ${({ $hover }) => ($hover ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;

  ${mediaQueries.mobile} {
    left: 11.5rem;
  }
`;
