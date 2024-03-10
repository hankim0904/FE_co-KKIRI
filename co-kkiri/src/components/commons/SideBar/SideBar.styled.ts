import DESIGN_TOKEN from "@/styles/tokens";
import styled from "styled-components";

const { boxShadow, color, typography, mediaQueries, overlayBackDropColor } = DESIGN_TOKEN;

export const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: none;

  ${mediaQueries.tablet} {
    background-color: ${overlayBackDropColor};
  }

  ${mediaQueries.mobile} {
    background-color: ${overlayBackDropColor};
  }
`;

export const Container = styled.div`
  width: 21rem;
  height: 63rem;
  box-shadow: ${boxShadow.content};
  border-top-right-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
  padding-left: 4rem;
  background-color: ${color.white};

  ${mediaQueries.tablet} {
    padding-left: 3rem;
    border-radius: 0;
    box-shadow: none;
    width: 21rem;
    height: 100vh;
  }

  ${mediaQueries.mobile} {
    padding-left: 2rem;
    padding-bottom: 3.8rem;
    width: 21rem;
    height: 100vh;
    box-shadow: none;
    border-radius: 0;
  }
`;

export const CategoryBox = styled.div`
  ${typography.font14Semibold}
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  color: ${color.black[1]};
  padding-top: 3rem;
`;

export const Category = styled.div`
  background-color: ${color.white};
  cursor: pointer;

  &:hover {
    color: ${color.primary[1]};
  }
`;

export const HamburgerMenuWrapper = styled.div`
  padding-top: 2.8rem;
  display: none;
  cursor: pointer;

  ${mediaQueries.tablet} {
    display: block;
    padding-bottom: 3.8rem;
    width: 2rem;
  }

  ${mediaQueries.mobile} {
    display: block;
    margin-bottom: 3.1rem;
    padding-top: 2.1rem;
    width: 1.8rem;
  }
`;