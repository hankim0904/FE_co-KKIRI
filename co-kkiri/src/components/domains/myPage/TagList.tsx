import DESIGN_TOKEN from "@/styles/tokens";
import SectionTitle from "../manage/SectionTitle";
import styled from "styled-components";
import NoResultText from "@/components/commons/NoResultText";
import EvaluationChip from "@/components/commons/Chips/EvaluationChip";
import { MyPageReviewApiResponseDto } from "@/lib/api/myPage/type";
import { emptyMessages } from "@/components/commons/UserProfileCard/constants";

interface TagListProps {
  reviewList: MyPageReviewApiResponseDto;
}

export default function TagList({ reviewList }: TagListProps) {
  const compliments = reviewList.filter((tag) => tag.type === "COMPLIMENT");
  const improvements = reviewList.filter((tag) => tag.type === "IMPROVEMENT");
  const noTags = compliments.length === 0 && improvements.length === 0;

  return (
    <Container>
      <SectionTitle title="내가 받은 태그" lineLength="mypage" />
      <TagListWrapper>
        {noTags ? (
          <NoResultText text={emptyMessages.tags} padding={60} color="gray" />
        ) : (
          <>
            {compliments.map((tag, index) => (
              <EvaluationChip
                key={`compliment-${tag.content}-${index}`}
                label={tag.content || ""}
                evaluationWay={tag.type}
                count={tag.count}
              />
            ))}
            {improvements.map((tag, index) => (
              <EvaluationChip
                key={`improvement-${tag.content}-${index}`}
                label={tag.content || ""}
                evaluationWay={tag.type}
                count={tag.count}
              />
            ))}
          </>
        )}
      </TagListWrapper>
    </Container>
  );
}

const { mediaQueries } = DESIGN_TOKEN;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 35rem;

  ${mediaQueries.tablet} {
    width: 70.8rem;
  }

  ${mediaQueries.mobile} {
    width: 32rem;
  }
`;

const TagListWrapper = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  overflow-y: auto;
  align-content: baseline;
  height: 13.9rem;
`;
