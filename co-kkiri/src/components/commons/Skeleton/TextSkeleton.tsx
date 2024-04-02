import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";
import DefaultSkeleton from "./elements/DefaultSkeleton";

type Page = "mystudy" | "detail";

interface TitleSkeletonProps {
  page: Page;
}

export function TitleSkeleton({ page }: TitleSkeletonProps) {
  return <Title $page={page} />;
}

export function ContentSkeleton() {
  return (
    <Container>
      <Wrapper>
        {new Array(3).fill("").map((_, i) => (
          <SentenceLong key={i} />
        ))}
        <SentenceShort />
      </Wrapper>
      <Wrapper>
        {new Array(3).fill("").map((_, i) => (
          <SentenceLong key={i} />
        ))}
        <SentenceShort />
      </Wrapper>
    </Container>
  );
}

const { mediaQueries } = DESIGN_TOKEN;

const Title = styled(DefaultSkeleton)<{ $page: Page }>`
  width: 50rem;
  height: 3.1rem;

  ${mediaQueries.tablet} {
    width: ${({ $page }) => ($page === "mystudy" ? "32rem" : "50rem")};
  }

  ${mediaQueries.mobile} {
    width: 32rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const SentenceLong = styled(DefaultSkeleton)`
  width: 50rem;
  height: 2rem;

  ${mediaQueries.mobile} {
    width: 32rem;
  }
`;
const SentenceShort = styled(DefaultSkeleton)`
  width: 25rem;
  height: 2rem;

  ${mediaQueries.mobile} {
    width: 12rem;
  }
`;
