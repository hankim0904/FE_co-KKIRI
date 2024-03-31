import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";

import More from "./More";
import Cards from "./Cards";
import { ListApiResponseDto } from "@/lib/api/post/type";
import useResponsiveSidebar from "@/hooks/useResponsiveSideBar";
import { Filter, Title } from "@/constants/hotAndNewList";
import { useFilterSetting } from "@/hooks/useFilterSetting";

interface CardsProps {
  category: Title;
  filter: Filter;
  cardDataList: ListApiResponseDto["data"];
}

export default function HotAndNewSection({ category, filter, cardDataList }: CardsProps) {
  const isSidebarOpenNarrow = useResponsiveSidebar();
  const { getFilterAction } = useFilterSetting();

  return (
    <Box $isSidebarOpenNarrow={isSidebarOpenNarrow}>
      <Wrapper>
        <h2>{category}</h2>
        <More onClick={getFilterAction("studyList", filter)} />
      </Wrapper>
      <Cards cardDataList={cardDataList} />
    </Box>
  );
}

const {
  typography: { font20Bold },
  mediaQueries: { tablet, mobile },
} = DESIGN_TOKEN;

const Box = styled.section<{ $isSidebarOpenNarrow: boolean }>`
  width: 100%;
  max-width: ${({ $isSidebarOpenNarrow }) => ($isSidebarOpenNarrow ? "91rem" : "112rem")};

  ${tablet} {
    max-width: 70.8rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2rem;

  ${mobile} {
    padding-bottom: 0;
  }

  h2 {
    ${font20Bold}
  }
`;
