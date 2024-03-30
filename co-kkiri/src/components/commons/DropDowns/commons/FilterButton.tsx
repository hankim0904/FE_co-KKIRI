import { MouseEvent } from "react";
import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";
import { ICONS } from "@/constants/icons";

interface FilterButtonProps {
  selectOption: string;
  isSelected: boolean;
  isOpen?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onReset?: () => void;
}

const { popover, popoverSelected, filterReset } = ICONS;

export default function FilterButton({ selectOption, onClick, isSelected, isOpen, onReset }: FilterButtonProps) {
  return (
    <Container $isSelected={isSelected} onClick={onClick}>
      {selectOption}
      {isSelected ? (
        onReset ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
              onReset();
            }}>
            <Icon src={filterReset.src} alt={filterReset.alt} />
          </div>
        ) : (
          <Icon $isOpen={isOpen} src={popoverSelected.src} alt={popoverSelected.alt} />
        )
      ) : (
        <Icon $isOpen={isOpen} src={popover.src} alt={popover.alt} />
      )}
    </Container>
  );
}

const { color, typography } = DESIGN_TOKEN;

interface Container {
  $isSelected: boolean;
}

const Container = styled.button<Container>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  padding-left: 1.4rem;
  padding-right: 1.2rem;
  width: 10.4rem;
  height: 3.6rem;
  ${({ $isSelected }) =>
    $isSelected
      ? `color:${color.secondary}; border:1px solid ${color.secondary};`
      : `color:${color.black[1]}; border:1px solid ${color.gray[2]}`};
  border-radius: 9.8rem;
  background: ${color.white};
  ${typography.font12Semibold}
`;
interface Icon {
  $isOpen?: boolean;
}

const Icon = styled.img<Icon>`
  width: 1.2rem;
  height: 1.2rem;

  ${({ $isOpen }) => $isOpen && `transform: rotate(180deg);`}
`;
