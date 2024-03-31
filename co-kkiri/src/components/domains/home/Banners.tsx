import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";

import Banner from "./Banner";
import { BANNERS, Filter } from "@/constants/banners";
import { useFilterSetting } from "@/hooks/useFilterSetting";

export default function Banners() {
  const { getFilterAction, filterMappings } = useFilterSetting();

  function isFilterKey(key: string): key is keyof typeof filterMappings {
    return key in filterMappings;
  }

  return (
    <Box>
      {Object.entries(BANNERS).map(([key, { img, path, filter }]) => {
        if (isFilterKey(key)) {
          return <Banner key={path} image={img} path={path} onClick={getFilterAction(key, filter as Filter)} />;
        }
        return <Banner key={path} image={img} path={path} />;
      })}
    </Box>
  );
}

const {
  mediaQueries: { tablet, mobile },
} = DESIGN_TOKEN;

const Box = styled.article`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 2rem;

  ${tablet} {
    gap: 1.5rem;
  }

  ${mobile} {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
`;
