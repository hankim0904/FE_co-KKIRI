import styled from "styled-components";
import { SearchedMemberProfile } from "@/lib/api/member/type";
import useResponsiveSidebar from "@/hooks/useResponsiveSideBar";
import DESIGN_TOKEN from "@/styles/tokens";
import NoResultText from "@/components/commons/NoResultText";
import ScoutCard from "./ScoutCard";

interface ScoutCardsProps {
  userProfiles: SearchedMemberProfile[];
}

export default function ScoutCards({ userProfiles }: ScoutCardsProps) {
  const isSidebarOpenNarrow = useResponsiveSidebar();
  return (
    <Container>
      {userProfiles.length === 0 ? (
        <NoResultText text="검색 결과가 없어요." padding={120} color="black" />
      ) : (
        <Wrapper $isSidebarOpenNarrow={isSidebarOpenNarrow}>
          {userProfiles?.map(({ memberId, profileImageUrl, nickname, position, career, stacks: stacks, gauge }) => (
            <ScoutCard
              key={memberId}
              memberId={memberId}
              profileImageUrl={profileImageUrl}
              nickname={nickname}
              position={position}
              career={career}
              stacks={stacks}
              gauge={gauge}
            />
          ))}
        </Wrapper>
      )}
    </Container>
  );
}

const { mediaQueries } = DESIGN_TOKEN;

const Container = styled.div`
  margin-top: 4rem;
  margin-bottom: 5.5rem;
  width: 100%;

  ${mediaQueries.tablet} {
    margin-top: 3rem;
  }

  ${mediaQueries.mobile} {
    margin-top: 5.2rem;
    width: 32rem;
  }
`;

export const Wrapper = styled.div<{ $isSidebarOpenNarrow: boolean }>`
  display: grid;
  flex-wrap: wrap;
  gap: 2rem;
  grid-template-columns: repeat(4, 26.5rem);
  ${({ $isSidebarOpenNarrow }) => $isSidebarOpenNarrow && `grid-template-columns: repeat(3, 29rem);`}

  ${mediaQueries.tablet} {
    grid-template-columns: repeat(2, 34.6rem);
    gap: 1.6rem;
  }

  ${mediaQueries.mobile} {
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;
  }
`;
