import DESIGN_TOKEN from "@/styles/tokens";
import SectionTitle from "../manage/SectionTitle";
import styled from "styled-components";
import NoResultText from "@/components/commons/NoResultText";
import EvaluationChip from "@/components/commons/Chips/EvaluationChip";
import { MyPageReviewApiResponseDto } from "@/lib/api/myPage/type";

interface TagListProps {
  reviewList: MyPageReviewApiResponseDto["reviewList"];
}

export default function TagList({ reviewList }: TagListProps) {
  return (
    <Container>
      <SectionTitle title="내가 받은 태그" lineLength="mypage" />
      <TagListWrapper>
        {reviewList.length > 0 ? (
          reviewList.map(
            (tags) =>
              tags && (
                <EvaluationChip
                  key={tags.content}
                  label={tags.content || ""}
                  evaluationWay={tags.type}
                  count={tags.count}
                />
              ),
          )
        ) : (
          <NoResultText text="아직 받은 태그가 없어요" padding={60} color="gray" />
        )}
      </TagListWrapper>
    </Container>
  );
}

const { color, mediaQueries } = DESIGN_TOKEN;

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
  height: 13.9rem;
`;
