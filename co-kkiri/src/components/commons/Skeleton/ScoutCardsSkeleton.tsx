import styled from "styled-components";
import { Wrapper } from "@/components/domains/scout/ScoutCards";
import useResponsiveSidebar from "@/hooks/useResponsiveSideBar";
import UserInfoCardSkeleton from "./UserInfoCardSkeleton";

export default function ScoutCardsSkeleton() {
  const isSidebarOpenNarrow = useResponsiveSidebar();
  return (
    <Wrapper $isSidebarOpenNarrow={isSidebarOpenNarrow}>
      {" "}
      {new Array(12).fill("").map((_, i) => (
        <Container key={i}>
          <UserInfoCardSkeleton page="scout" />
        </Container>
      ))}
    </Wrapper>
  );
}

const Container = styled.div`
  width: 100%;
  height: 33.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
