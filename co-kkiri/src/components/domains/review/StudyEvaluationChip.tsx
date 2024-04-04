import styled from "styled-components";
import SelectPositionChip from "@/components/commons/Chips/SelectPositionChip";
import { StudyReviewType, ReviewType } from "@/lib/api/review/type";
import { EVALUATION_COMMENT } from "@/constants/evaluationChip";

export type Option = {
  label: string;
  value: unknown;
};
interface EvaluationPartProps {
  evaluationCategory: { [key: string]: string };
  selectedChips: StudyReviewType[];
  onChange: (updatedOptions: StudyReviewType[]) => void;
  selectedMemberId: number;
}

export default function EvaluationPart({ evaluationCategory, selectedChips = [], onChange }: EvaluationPartProps) {
  const onChipClick = (content: string) => {
    const isAlreadySelected = selectedChips?.some((option) => option.content === content);
    let updatedOptions;
    if (isAlreadySelected) {
      updatedOptions = selectedChips.filter((option) => option.content !== content);
    } else {
      updatedOptions = [...selectedChips, { content: content, type: reviewType(content) }];
    }

    onChange(updatedOptions);
  };

  const reviewType = (content: string): ReviewType => {
    if (
      Object.values(EVALUATION_COMMENT.compliments.team).includes(content) ||
      Object.values(EVALUATION_COMMENT.compliments.member).includes(content)
    ) {
      return "COMPLIMENT";
    }
    if (
      Object.values(EVALUATION_COMMENT.improvements.team).includes(content) ||
      Object.values(EVALUATION_COMMENT.improvements.member).includes(content)
    ) {
      return "IMPROVEMENT";
    }
    throw new Error("");
  };

  return (
    <Box>
      {Object.entries(evaluationCategory).map(([key, value]) => (
        <SelectPositionChip
          key={key}
          label={value}
          isSelected={selectedChips.some((option) => option.content === value)}
          onClick={() => onChipClick(value)}
        />
      ))}
    </Box>
  );
}
const Box = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;
