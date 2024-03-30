import { useEffect, useState } from "react";
import * as S from "./styled";
import FilterList from "@/components/commons/FilterList";
import SearchInput from "@/components/commons/SearchInput";
import Filters from "@/components/domains/studyList/Filters";
import Cards from "@/components/commons/Cards";
import Pagination from "@/components/commons/Pagination";
import CreatePost from "@/components/commons/FloatingButton/CreatePost";
import { CategoryListFilter, categoryListFilter } from "@/constants/categories";
import { CategoryList } from "@/types/categoryTypes";
import { getFilterKey } from "@/utils/objectUtils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPostList } from "@/lib/api/post";
import useStudyListStore from "@/stores/studyListStore";
import { useDebounceValue } from "usehooks-ts";

export interface SelectedFilter {
  stacks: string[];
  position: string;
  progressWay: string;
  sortBy: string;
}

export default function StudyList() {
  const { currentCategory, setCurrentCategory } = useStudyListStore();
  const [selectedFilter, setSelectedFilter] = useState<SelectedFilter>({
    stacks: [],
    position: "",
    progressWay: "",
    sortBy: "LATEST",
  });
  const [searchTitle, setSearchTitle] = useDebounceValue("", 500);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: [
      "/post/list",
      {
        meetingType: currentCategory,
        position: selectedFilter.position,
        progressWay: selectedFilter.progressWay,
        stacks: selectedFilter.stacks,
        sortBy: selectedFilter.sortBy,
        search: searchTitle,
        page: currentPage,
      },
    ],
    queryFn: () =>
      getPostList({
        meetingType: currentCategory,
        position: selectedFilter.position,
        progressWay: selectedFilter.progressWay,
        stacks: selectedFilter.stacks,
        sortBy: selectedFilter.sortBy,
        search: searchTitle,
        page: currentPage,
        take: 12,
      }),
    placeholderData: keepPreviousData,
    gcTime: 0,
  });

  const list = data?.data || [];

  const handleStacksChange = (stacks: string[]) => setSelectedFilter((prev) => ({ ...prev, stacks }));

  const handlePositionChange = (position: string) => setSelectedFilter((prev) => ({ ...prev, position }));

  const handleProgressWayChange = (progressWay: string) => setSelectedFilter((prev) => ({ ...prev, progressWay }));

  const handleSortByChange = (sortBy: string) => setSelectedFilter((prev) => ({ ...prev, sortBy }));

  const handleTitleChange = (title: string) => setSearchTitle(title);

  if (error) {
    console.error(error);
  }

  // 임시
  if (isLoading) {
    <div>Loading...</div>;
  }

  const handleCategoryChange = (category: string) => {
    const filterKey = getFilterKey<CategoryList>(categoryListFilter, category);
    const newCategory = filterKey as CategoryListFilter;
    setCurrentCategory(newCategory);
  };

  const totalPage = data?.meta.pageCount || NaN;

  useEffect(() => {
    setCurrentPage(1);
  }, [currentCategory]);

  return (
    <S.Container>
      <S.Box>
        <S.CategoryWrapper>
          <FilterList
            type="category"
            currentFilter={categoryListFilter[currentCategory]}
            filters={Object.values(categoryListFilter)}
            onFilterClick={handleCategoryChange}
          />
          <SearchInput placeholder="제목을 검색해보세요!" handleValueChange={handleTitleChange} />
        </S.CategoryWrapper>
        <Filters
          selectedFilter={selectedFilter.stacks}
          handleStacksChange={handleStacksChange}
          handlePositionChange={handlePositionChange}
          handleProgressWayChange={handleProgressWayChange}
          handleSortByChange={handleSortByChange}
        />
        <Cards data={list} page="studyList" />
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPage} />
      </S.Box>
      <CreatePost />
    </S.Container>
  );
}
