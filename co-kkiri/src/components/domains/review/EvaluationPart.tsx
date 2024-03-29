import styled from "styled-components";
import SelectPositionChip from "@/components/commons/Chips/SelectPositionChip";

interface EvaluationPartProps {
  evaluationCategory: { [key: string]: string };
  selectedChips: string[];
  onChange: (updatedOptions: string[]) => void;
}

export default function EvaluationPart({ evaluationCategory, selectedChips, onChange }: EvaluationPartProps) {
  const onChipClick = (selectedKey: string) => {
    const updatedOptions = selectedChips.includes(selectedKey)
      ? selectedChips.filter((option) => option !== selectedKey)
      : [...selectedChips, selectedKey];
    onChange(updatedOptions);
  };

  return (
    <Box>
      {Object.entries(evaluationCategory).map(([key, value]) => (
        <SelectPositionChip
          key={key}
          label={value}
          isSelected={selectedChips.includes(key)}
          onClick={() => {
            onChipClick(key);
          }}
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
