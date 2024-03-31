import styled from "styled-components";
import DropMenu from "./commons/DropMenu";
import { useEffect, useMemo, useState } from "react";
import useOpenToggle from "@/hooks/useOpenToggle";
import TextDropButton from "./commons/TextDropButton";
import { Option } from "../RecruitmentRequestLayout/PositionChips";

interface SortDropdownProps {
  currentOption: string;
  placeholder: string;
  options: Option[];
  handleSortChange: (selectedSort: Option) => void;
}

export default function SortDropdown({ currentOption, placeholder, options, handleSortChange }: SortDropdownProps) {
  const defaultOption = useMemo(() => ({ label: placeholder, value: "" }), [placeholder]);
  const [selectOption, setSelectOption] = useState<Option>(
    () => options.find((option) => option.value === currentOption) || defaultOption,
  );
  const { isOpen, openToggle: toggleDropdown, ref } = useOpenToggle();

  useEffect(() => {
    const newCurrentOptionObject = options.find((option) => option.value === currentOption);
    setSelectOption(newCurrentOptionObject || defaultOption);
  }, [currentOption, options, defaultOption]);

  const handleSelectOption = (option: Option) => {
    handleSortChange(option);
    setSelectOption(option);
    toggleDropdown();
  };

  const isSelected = selectOption.value !== "";

  return (
    <Container ref={ref}>
      <TextDropButton onClick={toggleDropdown} selectOption={selectOption.label} $isSelected={isSelected} />
      <Wrapper>
        <DropMenu
          isOpen={isOpen}
          handleSelectOption={handleSelectOption}
          options={options}
          $borderType="round"></DropMenu>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  position: relative;
`;

const Wrapper = styled.div`
  padding: 0;
  width: 10.4rem;
  position: absolute;
  top: -0.9rem;
`;
