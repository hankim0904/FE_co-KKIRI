import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";
import ProjectDetailCard from "@/components/commons/ProjectDetailCard";
import { StudyManagementApiResponseDto } from "@/lib/api/post/type";
import { formatDate } from "@/utils/formatDate";
import { ContactWay } from "@/components/commons/ProjectDetailCard/types";
import DetailCardSkeleton from "@/components/commons/Skeleton/DetailCardSkeleton";

interface DetailProps {
  detailInfo: StudyManagementApiResponseDto;
}

export default function Detail({ detailInfo }: DetailProps) {
  const { type, recruitEndAt, progressPeriod, progressWay, contactWay, capacity, positions, stacks, link } = detailInfo;

  return (
    <>
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
    </>
  );
}

const { typography, color, mediaQueries } = DESIGN_TOKEN;

{
  /* <Box>
        <Link to={`/list/${detailInfo.postId}`}>
          <InfoWrapper>
            <p>스터디/프로젝트 상세글 보기</p>
            <img src={ICONS.arrowRightGray.src} alt={ICONS.arrowRightGray.alt} />
          </InfoWrapper>
        </Link>
        <Title>{postTitle}</Title>
      </Box> */
}
