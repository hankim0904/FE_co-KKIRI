import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";
import DefaultSkeleton from "./elements/DefaultSkeleton";
import StacksSkeleton from "./elements/StacksSkeleton";

type Page = "mypage" | "scout";

interface UserInfoCardSkeletonProps {
  page: Page;
}

export default function UserInfoCardSkeleton({ page }: UserInfoCardSkeletonProps) {
  const isMyPage = page === "mypage";
  return (
    <Container $page={page}>
      <Wrapper>
        <Avatar $page={page} />
        <Position />
        <NameAndCapacity />
        <StacksSkeleton />
      </Wrapper>
      {isMyPage && (
        <>
          <Comment />
          <Link />
          <Button />
        </>
      )}
    </Container>
  );
}

const { boxShadow, mediaQueries } = DESIGN_TOKEN;

const Container = styled.div<{ $page: Page }>`
  width: ${({ $page }) => ($page === "mypage" ? `43rem` : `100%`)};
  min-width: fit-content;
  height: ${({ $page }) => ($page === "mypage" ? `50.6rem` : `100%`)};

  padding: 3rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  border-radius: 2rem;
  box-shadow: ${boxShadow.content};
  ${mediaQueries.mobile} {
    width: ${({ $page }) => ($page === "mypage" ? `34rem` : `32rem`)};
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Avatar = styled(DefaultSkeleton)<{ $page: Page }>`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  margin-top: ${({ $page }) => ($page === "mypage" ? `2.5rem` : `1.5rem`)};
`;

const Position = styled(DefaultSkeleton)`
  width: 7.6rem;
  height: 2.2rem;
  margin-top: 2.7rem;
`;
const NameAndCapacity = styled(DefaultSkeleton)`
  width: 7rem;
  height: 4.1rem;
  margin-top: 1.2rem;
  margin-bottom: 2rem;
`;

const Comment = styled(DefaultSkeleton)`
  width: 24.8rem;
  height: 2.1rem;
  margin-top: 2rem;
`;
const Link = styled(DefaultSkeleton)`
  width: 15rem;
  height: 1.8rem;
  margin-top: 0.8rem;
`;
const Button = styled(DefaultSkeleton)`
  width: 100%;
  height: 4.8rem;
  border-radius: 7.6rem;
  margin-top: 4rem;
`;
