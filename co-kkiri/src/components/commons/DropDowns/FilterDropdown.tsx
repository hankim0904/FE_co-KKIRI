import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import FilterButton from "./commons/FilterButton";
import useOpenToggle from "@/hooks/useOpenToggle";
import DropMenu from "./commons/DropMenu";
import { Option } from "../RecruitmentRequestLayout/PositionChips";

interface FilterDropdownProps {
  currentOption?: string;
  placeholder: string;
  options: Option[];
  onSelectFilter: (selectedFilter: Option) => void;
}

/**
 * FilterDropdown 컴포넌트
 * @param menuInfoType: 드랍메뉴 내용
 * @property {"position"|"progressWay"} menuInfoType
 * */
export default function FilterDropdown({ currentOption, placeholder, options, onSelectFilter }: FilterDropdownProps) {
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
    setSelectOption(option);
    onSelectFilter(option);
    toggleDropdown();
  };

  const handleReset = () => {
    setSelectOption(defaultOption);
    onSelectFilter(defaultOption);
  };

  const isSelected = selectOption.value !== "";

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
