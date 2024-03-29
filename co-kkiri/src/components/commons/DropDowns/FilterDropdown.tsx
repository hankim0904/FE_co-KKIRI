import { useState } from "react";
import styled from "styled-components";
import FilterButton from "./commons/FilterButton";
import useOpenToggle from "@/hooks/useOpenToggle";
import DropMenu from "./commons/DropMenu";
import { Option } from "../Form/RHFDropdown";

interface FilterDropdownProps {
  placeholder: string;
  options: Option[];
  onSelectFilter: (selectedFilter: Option) => void;
}

/**
 * FilterDropdown 컴포넌트
 * @param menuInfoType: 드랍메뉴 내용
 * @property {"position"|"progressWay"} menuInfoType
 * */
export default function FilterDropdown({ placeholder, options, onSelectFilter }: FilterDropdownProps) {
  const defaultOption = { label: placeholder, value: "" };
  const [selectOption, setSelectOption] = useState<Option>(defaultOption);
  const [isSelected, setIsSelected] = useState(false);
  const { isOpen, openToggle: toggleDropdown, ref } = useOpenToggle();

  const handleSelectOption = (option: Option) => {
    setSelectOption(option);
    setIsSelected(true);
    onSelectFilter(option);
    toggleDropdown();
  };

  const handleReset = () => {
    setSelectOption(defaultOption);
    setIsSelected(false);
    onSelectFilter(defaultOption);
  };

  return (
    <Container ref={ref}>
      <FilterButton
        onClick={toggleDropdown}
        selectOption={selectOption.label}
        isSelected={isSelected}
        isOpen={isOpen}
        onReset={handleReset}
      />
      <DropMenu $borderType="round" isOpen={isOpen} handleSelectOption={handleSelectOption} options={options} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  position: relative;
  width: 10.4rem;
`;
