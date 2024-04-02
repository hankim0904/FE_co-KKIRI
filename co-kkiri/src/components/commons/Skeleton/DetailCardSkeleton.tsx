import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";
import DefaultSkeleton from "./elements/DefaultSkeleton";
import StacksSkeleton from "./elements/StacksSkeleton";

type Page = "mystudy" | "detail";

interface DetailCardSkeletonProps {
  page: Page;
}

export default function DetailCardSkeleton({ page }: DetailCardSkeletonProps) {
  return (
    <Container $page={page}>
      <TypeSection />
      {new Array(6).fill("").map((_, i) => (
        <Wrapper key={i}>
          <Title />
          <Content />
        </Wrapper>
      ))}
      <Wrapper>
        <Title />
        <StacksSkeleton />
      </Wrapper>
    </Container>
  );
}

const { color, boxShadow, mediaQueries } = DESIGN_TOKEN;

const Container = styled.div<{ $page: Page }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 8rem 3rem 3rem 3rem;
  background-color: ${color.white};
  border-radius: 1.5rem;
  box-shadow: ${boxShadow.content};
  height: 40.7rem;

  width: ${({ $page }) => ($page === "mystudy" ? "50rem" : "35rem")};

  ${mediaQueries.tablet} {
    width: ${({ $page }) => ($page === "mystudy" ? "32rem" : "50rem")};
  }

  ${mediaQueries.mobile} {
    width: 32rem;
  }
`;

const TypeSection = styled(DefaultSkeleton)`
  width: 9.2rem;
  height: 2.6rem;
  border-radius: 0.2rem 6.1rem 6.1rem 0.2rem;
  position: absolute;
  top: 1.5rem;
  left: -0.2rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
`;

const Title = styled(DefaultSkeleton)`
  width: 6rem;
  height: 2rem;
`;
const Content = styled(DefaultSkeleton)`
  width: 14rem;
  height: 2rem;
`;
