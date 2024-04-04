import useOpenToggle from "@/hooks/useOpenToggle";
import SquareDropButton from "./commons/SquareDropButton";
import DropMenu from "./commons/DropMenu";
import styled from "styled-components";
import { Option } from "../RecruitmentRequestLayout/PositionChips";

interface DropdownProps {
  placeholder: string;
  selectedOption?: string | null;
  options: Option[];
  isError?: boolean;
  onSelect: (option: Option) => void;
  dropdownRef?: React.RefCallback<HTMLButtonElement>;
}

export default function Dropdown({
  placeholder,
  selectedOption,
  options,
  onSelect,
  isError,
  dropdownRef,
}: DropdownProps) {
  const { isOpen, openToggle: toggleDropdown, ref } = useOpenToggle();

  const handleSelectOption = (option: Option) => {
    onSelect(option);
    toggleDropdown();
  };

  return (
    <Container ref={ref}>
      <SquareDropButton
        selectOption={selectedOption || placeholder || ""}
        onClick={toggleDropdown}
        $isSelected={!!selectedOption}
        $iconType="default"
        dropButtonRef={dropdownRef}
        $isError={isError}
        isOpen={isOpen}
      />
      <DropMenu isOpen={isOpen} handleSelectOption={handleSelectOption} $borderType="square" options={options} />
    </Container>
  );
}

interface ContainerProps {
  $isError?: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0;
  gap: 0.8rem;
`;
