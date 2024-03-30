import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";

const {
  spacing,
  color,
  typography: { font20Bold },
  mediaQueries,
} = DESIGN_TOKEN;

export const Container = styled.div`
  padding: ${spacing.desktop};
  padding-top: 2.8rem;
  padding-bottom: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${mediaQueries.tablet} {
    padding: ${spacing.tablet};
    padding-bottom: 12rem;
  }
  ${mediaQueries.mobile} {
    padding: ${spacing.mobile};
    padding-bottom: 4.8rem;
  }
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 112rem;

  ${mediaQueries.tablet} {
    width: 70.8rem;
  }

  ${mediaQueries.mobile} {
    width: 36rem;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.8rem;
  width: 100%;

  ${mediaQueries.mobile} {
    margin-bottom: 1.8rem;
  }

  ${mediaQueries.mobile} {
    flex-direction: column;
    gap: 2rem;
    align-items: flex-start;
    margin-bottom: 1.6rem;
    width: 36rem;
  }
`;

export const Title = styled.div`
  ${font20Bold}
  color:${color.black[1]}
`;
