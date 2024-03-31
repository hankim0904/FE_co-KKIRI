import styled from "styled-components";
import FilterDropdown from "@/components/commons/DropDowns/FilterDropdown";
import SortDropdown from "@/components/commons/DropDowns/SortDropdown";
import DESIGN_TOKEN from "@/styles/tokens";
import { Option } from "@/components/commons/RecruitmentRequestLayout/PositionChips";
import { DROPDOWN_FILTER_INFO } from "@/constants/dropDown";
import StacksPopover from "@/components/commons/StackPopover";
import { listPageSelectedFilter } from "@/types/categoryAndFilterTypes";

interface FiltersProps {
  selectedFilter: listPageSelectedFilter;
  handleStacksChange: (stacks: string[]) => void;
  handlePositionChange: (positions: string) => void;
  handleProgressWayChange: (progressWay: string) => void;
  handleSortByChange: (sortBy: string) => void;
}

export default function Filters({
  selectedFilter,
  handleStacksChange,
  handlePositionChange,
  handleProgressWayChange,
  handleSortByChange,
}: FiltersProps) {
  const {
    filter: { position, progressWay },
    sort: { sort },
  } = DROPDOWN_FILTER_INFO;

  const onSelectPosition = (selectedOption: Option) => {
    const selectedPosition = String(selectedOption.value);
    handlePositionChange(selectedPosition);
  };

  const onSelectProgressWay = (selectedOption: Option) => {
    const selectedProgressWay = String(selectedOption.value);
    handleProgressWayChange(selectedProgressWay);
  };

  const onSelectSortBy = (selectedOption: Option) => {
    const selectedSortBy = String(selectedOption.value);
    handleSortByChange(selectedSortBy);
  };

  return (
    <Container>
      <FilterWrapper>
        <StacksPopover stacks={selectedFilter.stacks} onStacksChange={(stacks) => handleStacksChange(stacks)} />
        <FilterDropdown
          currentOption={selectedFilter.position}
          onSelectFilter={onSelectPosition}
          placeholder={"포지션"}
          options={position}
        />
        <FilterDropdown
          currentOption={selectedFilter.progressWay}
          onSelectFilter={onSelectProgressWay}
          placeholder={"진행 방식"}
          options={progressWay}
        />
      </FilterWrapper>
      <SortDropdown
        currentOption={selectedFilter.sortBy}
        handleSortChange={onSelectSortBy}
        placeholder={"최신순"}
        options={sort}
      />
    </Container>
  );
}

const { mediaQueries } = DESIGN_TOKEN;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mediaQueries.tablet} {
    padding: 0 3rem;
    width: 76.8rem;
  }

  ${mediaQueries.mobile} {
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    width: 32rem;
    gap: 1.6rem;
    padding: 0;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  ${mediaQueries.mobile} {
    gap: 0.4rem;
  }
`;
