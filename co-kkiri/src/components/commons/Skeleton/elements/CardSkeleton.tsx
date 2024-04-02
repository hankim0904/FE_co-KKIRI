import styled from "styled-components";
import useResponsiveSidebar from "@/hooks/useResponsiveSideBar";
import { Container, ContainerProps } from "../../Card/Card.styled";
import DefaultSkeleton from "./DefaultSkeleton";
import StacksSkeleton from "./StacksSkeleton";
import UserProfileSkeleton from "../UserProfileSkeleton";

type CardPage = "home" | "studyList";
interface CardSkeletonProps {
  page: CardPage;
}

export default function CardSkeleton({ page }: CardSkeletonProps) {
  const isSidebarOpenNarrow = useResponsiveSidebar();
  const isStudyList = page === "studyList";
  return (
    <CardContainer $page={page} $isSidebarOpenNarrow={isSidebarOpenNarrow}>
      {isStudyList && <TypeSection />}
      <InfoSection $page={page} />
      <TitleSection />
      <ContentsWrapper>
        <PositionSection />
        {isStudyList && <StacksSkeleton />}
      </ContentsWrapper>
      <UserSection />
    </CardContainer>
  );
}

const CardContainer = styled(Container)<ContainerProps>`
  height: ${({ $page }) => ($page === "home" ? `21.2rem` : `29.6rem`)};
  padding: 2rem 2rem 1.6rem 2rem;
  position: relative;
`;
const TypeSection = styled(DefaultSkeleton)`
  width: 9.2rem;
  height: 2.6rem;
  border-radius: 0.2rem 6.1rem 6.1rem 0.2rem;
  position: absolute;
  top: 1.5rem;
  left: -0.2rem;
`;
const InfoSection = styled(DefaultSkeleton)<{ $page: CardPage }>`
  width: 14rem;
  height: 1.4rem;
  ${({ $page }) => $page === "studyList" && `margin-top:3.6rem`}
`;

const TitleSection = styled(DefaultSkeleton)`
  width: 100%;
  height: 4.2rem;
  margin-top: 1.2rem;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;
const PositionSection = styled(DefaultSkeleton)`
  width: 11.6rem;
  height: 2.2rem;
`;

const UserSection = styled(UserProfileSkeleton)`
  margin-top: 3.2rem;
`;
