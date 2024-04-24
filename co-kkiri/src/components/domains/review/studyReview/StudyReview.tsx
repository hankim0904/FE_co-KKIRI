import { ICONS } from "@/constants/icons";
import StudyEvaluationSection from "./StudyEvaluationSection";
import { ReviewFormValues } from "@/lib/api/review/type";
import { Control } from "react-hook-form";
import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";

interface StudyReviewProps {
  control: Control<ReviewFormValues>;
}

export default function StudyReview({ control }: StudyReviewProps) {
  return (
    <Container>
      <Title>
        <img src={ICONS.number1.src} alt={ICONS.number1.alt} />
        <div>스터디 전체 평가</div>
      </Title>
      <StudyEvaluationSection control={control} />
    </Container>
  );
}

const { typography, color, mediaQueries } = DESIGN_TOKEN;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;

  ${mediaQueries.mobile} {
    gap: 2rem;
  }
`;

const Title = styled.div`
  ${typography.font20Bold}
  color: ${color.black[1]};
  display: flex;
  gap: 0.8rem;
`;
