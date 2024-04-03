import styled, { css } from "styled-components";
import DefaultChip from "./DefaultChip";
import { VariantStyle } from "@/types/styledUtilTypes";
import DESIGN_TOKEN from "@/styles/tokens";
import { ReviewType } from "@/lib/api/review/type";

interface EvaluationChipProps {
  label: string;
  evaluationWay: ReviewType;
  count?: number;
}

/**
 *  * EvaluationChip 컴포넌트
 * @param evaluationWay: 바탕, 글씨 색상 지정
 * @property {"compliments" | "improvements"} evaluationWay
 */
export default function EvaluationChip({ label, evaluationWay, count }: EvaluationChipProps) {
  return <Container evaluationWay={evaluationWay} label={label} count={count} />;
}

const { color, typography } = DESIGN_TOKEN;

const EvaluationChipStyle = css`
  padding: 0.35rem 1.2rem;
  height: 2.2rem;
  border-radius: 9.9rem;
`;

const VARIANT_STYLE: VariantStyle<ReviewType> = {
  COMPLIMENT: css`
    background-color: ${color.primary[3]};
    color: ${color.primary[1]};
    ${typography.font12Semibold}
    ${EvaluationChipStyle}
  `,
  IMPROVEMENT: css`
    background-color: #ffdbe4;
    color: ${color.red};
    ${EvaluationChipStyle}
  `,
};

const Container = styled(DefaultChip)<{ evaluationWay: ReviewType }>`
  ${({ evaluationWay }) => VARIANT_STYLE[evaluationWay]}
`;
