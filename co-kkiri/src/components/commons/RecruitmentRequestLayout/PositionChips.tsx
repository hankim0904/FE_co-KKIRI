import { styled } from "styled-components";
import SelectPositionChip from "../Chips/SelectPositionChip";
import DESIGN_TOKEN from "@/styles/tokens";

export type Option = {
  label: string;
  value: unknown;
};

interface EvaluationPartProps {
  positionCategory: Option[];
  selectedChips: string[];
  onChange: (updatedOptions: string[]) => void;
  helperText: string | undefined;
}

export default function PositionChips({ positionCategory, selectedChips, onChange, helperText }: EvaluationPartProps) {
  const onChipClick = (selectedKey: string) => {
    const updatedOptions = selectedChips.includes(selectedKey)
      ? selectedChips.filter((option: string) => option !== selectedKey)
      : [...selectedChips, selectedKey];
    onChange(updatedOptions);
  };

  return (
    <Container>
      <Box>
        {positionCategory.map((position) => (
          <SelectPositionChip
            key={position.label}
            label={position.label}
            isSelected={selectedChips.includes(position.label)}
            onClick={() => {
              onChipClick(position.label);
            }}
          />
        ))}
      </Box>
      <HelperText>{helperText}</HelperText>
    </Container>
  );
}

const { color, typography } = DESIGN_TOKEN;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
`;

const Box = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const HelperText = styled.p`
  position: relative;
  top: -1.4rem;
  color: ${color.red};
  ${typography.font12Medium}
`;
