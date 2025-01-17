import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";

import FilterList from "@/components/commons/FilterList";
import Button from "@/components/commons/Button";
import Cards from "@/components/commons/Cards";

const {
  color,
  spacing,
  typography: { font20Bold, font16Bold },
  mediaQueries: { tablet, mobile },
} = DESIGN_TOKEN;

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Box = styled.div<{ $isSidebarOpenNarrow: boolean }>`
  display: inline-grid;
  padding-top: 4rem;
  padding-bottom: 6.1rem;
  min-width: ${({ $isSidebarOpenNarrow }) => ($isSidebarOpenNarrow ? "91rem" : "112rem;")};

  ${tablet} {
    padding-top: 3.6rem;
    padding-bottom: 7.6rem;
    min-width: fit-content;
  }

  ${mobile} {
    padding-top: 2rem;
    padding-bottom: 8.1rem;
  }
`;

export const Title = styled.div`
  ${font20Bold}
  color:${color.black[1]};
  padding-bottom: 2.6rem;

  ${tablet} {
    padding-left: ${spacing.tablet};
  }

  ${mobile} {
    padding-left: ${spacing.mobile};
  }
`;

export const FilterListSection = styled(FilterList)`
  ${font16Bold}
  padding-bottom: 4rem;

  ${tablet} {
    padding-left: ${spacing.tablet};
  }

  ${mobile} {
    padding-left: ${spacing.mobile};
  }
`;

export const CardsSection = styled(Cards)`
  margin-bottom: 6rem;
`;

export const ButtonSection = styled(Button)`
  width: 15.8rem;
  justify-self: center;

  ${mobile} {
    width: 32rem;
    margin-top: 4rem;
  }
`;
