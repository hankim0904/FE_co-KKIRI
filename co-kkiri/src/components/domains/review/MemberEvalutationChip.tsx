import styled from "styled-components";
import SelectPositionChip from "@/components/commons/Chips/SelectPositionChip";
import { MemberReviewType, ReviewType } from "@/lib/api/review/type";
import { EVALUATION_COMMENT } from "@/constants/evaluationChip";
import { Option } from "lucide-react";

export type Option = {
  label: string;
  value: unknown;
};

interface EvaluationPartProps {
  evaluationCategory: { [key: string]: string };
  selectedChips: MemberReviewType[];
  onChange: (updatedOptions: MemberReviewType[]) => void;
  selectedMemberId: number;
}

export default function MemberEvaluationChip({
  evaluationCategory,
  selectedChips = [],
  onChange,
  selectedMemberId,
}: EvaluationPartProps) {
  const onChipClick = (content: string) => {
    const isAlreadySelected = selectedChips?.some(
      (option) => option.content === content && option.revieweeMemberId === selectedMemberId,
    );
    let updatedOptions;
    if (isAlreadySelected) {
      updatedOptions = selectedChips.filter(
        (option) => option.revieweeMemberId !== selectedMemberId || option.content !== content,
      );
    } else {
      updatedOptions = [
        ...selectedChips,
        { content: content, revieweeMemberId: selectedMemberId, type: reviewType(content) },
      ];
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
          isSelected={selectedChips.some(
            (option) => option.content === value && option.revieweeMemberId === selectedMemberId,
          )}
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
