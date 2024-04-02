import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";
import { Wrapper } from "@/components/domains/scout/ScoutCards";
import useResponsiveSidebar from "@/hooks/useResponsiveSideBar";
import UserInfoCardSkeleton from "./UserInfoCardSkeleton";

export default function ScoutCardsSkeleton() {
  const isSidebarOpenNarrow = useResponsiveSidebar();
  return (
    <Container>
      <Wrapper $isSidebarOpenNarrow={isSidebarOpenNarrow}>
        {new Array(12).fill("").map((_, i) => (
          <CardWrapper key={i}>
            <UserInfoCardSkeleton page="scout" />
          </CardWrapper>
        ))}
      </Wrapper>
    </Container>
  );
}

const { mediaQueries } = DESIGN_TOKEN;

const Container = styled.div`
  padding-top: 4rem;
  padding-bottom: 5.5rem;

  ${mediaQueries.tablet} {
    padding-top: 3rem;
  }

  ${mediaQueries.mobile} {
    padding-top: 5.2rem;
  }
`;

const CardWrapper = styled.div`
  width: 100%;
  height: 33.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
