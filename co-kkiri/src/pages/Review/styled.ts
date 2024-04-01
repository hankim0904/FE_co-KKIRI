import DESIGN_TOKEN from "@/styles/tokens";
import styled from "styled-components";

const { typography, color, mediaQueries } = DESIGN_TOKEN;

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  padding: 4rem 0 12rem;
  width: 91rem;
  flex-shrink: 0;

  ${mediaQueries.tablet} {
    width: 70.6rem;
  }

  ${mediaQueries.mobile} {
    width: 32rem;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12rem;
`;

export const EvaluationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 3rem;
  width: 100%;

  ${mediaQueries.mobile} {
    gap: 2rem;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 1.2rem;
`;

export const Title = styled.div`
  ${typography.font20Bold}
  color: ${color.black[1]};
  display: flex;
  gap: 0.8rem;
`;
