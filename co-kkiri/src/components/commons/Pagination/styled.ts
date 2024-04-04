import DESIGN_TOKEN from "@/styles/tokens";
import styled from "styled-components";

const { typography, color } = DESIGN_TOKEN;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`;

export const PageNumber = styled.button<{ $active?: boolean }>`
  ${typography.font16Regular}
  width: 3rem;
  height: 3rem;
  text-align: center;
  border-radius: 50%;
  background-color: ${(props) => props.$active && `${color.primary[2]}`};
`;

export const PageArrow = styled.button`
  width: 1.2rem;
  height: 1.2rem;
  text-align: center;
`;

export const PageDoubleLeftArrow = styled(PageArrow)`
  margin-right: 1.2rem;
`;

export const PageLeftArrow = styled(PageArrow)`
  margin-right: 2.1rem;
`;

export const PageRightArrow = styled(PageArrow)`
  margin-left: 2.1rem;
`;

export const PageDoubleRightArrow = styled(PageArrow)`
  margin-left: 1.2rem;
`;
