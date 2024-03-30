import styled from "styled-components";
import { ICONS } from "@/constants/icons";
import DESIGN_TOKEN from "@/styles/tokens";
import ProjectDetailCard from "@/components/commons/ProjectDetailCard";
import { StudyManagementApiResponseDto } from "@/lib/api/post/type";
import { Link } from "react-router-dom";
import { formatDate } from "@/utils/formatDate";
import { ContactWay } from "@/components/commons/ProjectDetailCard/types";

interface DetailProps {
  detailInfo: StudyManagementApiResponseDto;
}

export default function Detail({ detailInfo }: DetailProps) {
  const { postTitle, type, recruitEndAt, progressPeriod, progressWay, contactWay, capacity, positions, stacks, link } =
    detailInfo;

  return (
    <Container>
      <Box>
        <Link to={`/list/${detailInfo.postId}`}>
          <InfoWrapper>
            <p>스터디/프로젝트 상세글 보기</p>
            <img src={ICONS.arrowRightGray.src} alt={ICONS.arrowRightGray.alt} />
          </InfoWrapper>
        </Link>
        <Title>{postTitle}</Title>
      </Box>
      <ProjectDetailCard
        type="mystudy"
        ProjectCategory={type}
        recruitEndAt={formatDate(recruitEndAt)}
        progressPeriod={progressPeriod}
        positions={positions}
        progressWay={progressWay}
        contactWay={{ label: contactWay as ContactWay, content: link }}
        capacity={capacity}
        stacks={stacks}
      />
    </Container>
  );
}

const { typography, color, mediaQueries } = DESIGN_TOKEN;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  height: fit-content;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  flex-direction: column;
  justify-content: center;
  gap: 0.8rem;
`;

const InfoWrapper = styled.div`
  ${typography.font16Bold}
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: ${color.gray[1]};
`;

const Title = styled.div`
  ${typography.font24Bold}
  color: ${color.black[2]};
  width: 50rem;

  ${mediaQueries.tablet} {
    width: 32rem;
  }

  ${mediaQueries.mobile} {
    width: 32rem;
  }
`;
