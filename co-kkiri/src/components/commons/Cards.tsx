import Card from "@/components/commons/Card";
import { ListApiResponseDto } from "@/lib/api/post/type";
import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";
import useResponsiveSidebar from "@/hooks/useResponsiveSideBar";
import { Pages } from "@/types/pagesTypes";
import NoResultText from "./NoResultText";
import CardSkeleton from "./Skeleton/elements/CardSkeleton";

interface CardsProps {
  data: ListApiResponseDto["data"];
  page?: Pages;
  className?: string;
}

export default function Cards({ data, page, className }: CardsProps) {
  const isSidebarOpenNarrow = useResponsiveSidebar();
  return (
    <Container className={className}>
      {data.length !== 0 ? (
        <CardList $isSidebarOpenNarrow={isSidebarOpenNarrow}>
          {data.map((data) => (
            <div key={data.postId}>
              <Card cardData={data} page={page} />
            </div>
          ))}
        </CardList>
      ) : (
        <NoResultText text="검색 결과가 없어요." padding={120} color="black" />
      )}
    </Container>
  );
}

const { mediaQueries } = DESIGN_TOKEN;

const Container = styled.div`
  display: flex;
  justify-content: center;
  ${mediaQueries.tablet} {
    width: 76.8rem;
  }
  ${mediaQueries.mobile} {
    width: 32rem;
  }
`;

export const CardList = styled.div<{ $isSidebarOpenNarrow: boolean }>`
  display: grid;
  flex-wrap: wrap;
  gap: 2rem;
  grid-template-columns: repeat(4, 1fr);
  ${({ $isSidebarOpenNarrow }) => $isSidebarOpenNarrow && `grid-template-columns: repeat(3, 1fr);`}

  ${mediaQueries.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${mediaQueries.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`;
