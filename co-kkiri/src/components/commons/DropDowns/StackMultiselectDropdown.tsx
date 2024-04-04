import useOpenToggle from "@/hooks/useOpenToggle";
import SquareDropButton from "./commons/SquareDropButton";
import styled from "styled-components";
import DefaultSelectLayout from "../StackPopover/SelectLayout";
import { useRef } from "react";
import DeleteStackChipList from "../StackPopover/DeleteStackChipList";
import { useResizeObserver, useToggle } from "usehooks-ts";
import DESIGN_TOKEN from "@/styles/tokens";
import PopoverContainer from "../Widgets/Popover/PopoverContainer";

interface MultiselectDropdownProps {
  selectedOptions: string[];
  limit?: number;
  onSelectChange: (selectedOptions: string[]) => void;
  isError?: boolean;
}

export default function MultiselectDropdown({
  selectedOptions,
  limit,
  onSelectChange,
  isError,
}: MultiselectDropdownProps) {
  const [isToggled, _, setToggle] = useToggle();
  const dropButtonRef = useRef<HTMLButtonElement>(null);
  const { height } = useResizeObserver({
    ref: dropButtonRef,
    box: "border-box",
  });

  const closePopover = () => {
    setToggle(false);
  };

  return (
    <Container>
      <SquareDropButton
        selectOption={
          <DeleteStackChipList
            stacks={selectedOptions}
            onDeleteStack={(stack) => {
              onSelectChange(selectedOptions.filter((prevStack) => prevStack !== stack));
            }}
          />
        }
        onClick={(e) => {
          if (e.target !== e.currentTarget) return;
          setToggle((prev) => !prev);
        }}
        $iconType="default"
        $isSelected={isToggled}
        dropButtonRef={dropButtonRef}
        $isError={isError}
      />
      {isToggled && (
        <PopoverContainer triggerRef={dropButtonRef} onClose={closePopover} marginFromTrigger={8}>
          <SelectLayout
            stacks={selectedOptions}
            //TODO: limit 초과시 error 로직 짜야함
            limit={limit}
            onStacksChange={(stacks) => onSelectChange([...stacks])}
            $top={height ? height : undefined}
          />
        </PopoverContainer>
      )}
    </Container>
  );
}

const { mediaQueries } = DESIGN_TOKEN;
const Container = styled.div`
  position: relative;
  display: flex;

  ${mediaQueries.tablet} {
    justify-content: center;
  }
`;

interface SelectLayoutProps {
  $top: number | undefined;
}

const SelectLayout = styled(DefaultSelectLayout)<SelectLayoutProps>`
  border-radius: 0.5rem;
  top: ${({ $top }) => ($top ? `${$top / 10 + 0.6}rem` : `5.4rem`)};
`;
