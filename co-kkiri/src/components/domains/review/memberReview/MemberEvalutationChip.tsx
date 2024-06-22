import styled from "styled-components";
import SelectPositionChip from "@/components/commons/Chips/SelectPositionChip";
import { MemberReviewType } from "@/lib/api/review/type";
import { Option } from "lucide-react";
import { reviewType } from "@/utils/reviewType";

export type Option = {
  label: string;
  value: unknown;
};

interface MemberEvaluationChipProps {
  evaluationCategory: { [key: string]: string };
  selectedChips: MemberReviewType[];
  onOptionChange: (updatedOptions: MemberReviewType[]) => void;
  selectedMemberId: number;
}

export default function MemberEvaluationChip({
  evaluationCategory,
  selectedChips = [],
  onOptionChange,
  selectedMemberId,
}: MemberEvaluationChipProps) {
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
    onOptionChange(updatedOptions);
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
