import * as S from "./styled";
import FilterList from "@/components/commons/FilterList";
import SearchInput from "@/components/commons/SearchInput";
import Filters from "@/components/domains/studyList/Filters";
import Cards from "@/components/commons/Cards";
import Pagination from "@/components/commons/Pagination";
import CreatePost from "@/components/commons/FloatingButton/CreatePost";
import { CategoryListFilter, categoryListFilter } from "@/constants/categoriesAndFilters";
import { CategoryList } from "@/types/categoryAndFilterTypes";
import { getFilterKey } from "@/utils/objectUtils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPostList } from "@/lib/api/post";
import useStudyListStore from "@/stores/studyListStore";
import { useDebounceValue } from "usehooks-ts";
import useResponsiveSidebar from "@/hooks/useResponsiveSideBar";
import { useToast } from "@/hooks/useToast";
import CardsSkeleton from "@/components/commons/Skeleton/CardsSkeleton";
import useSkeleton from "@/hooks/useSkeleton";
import styled from "styled-components";
import MetaTag from "@/components/commons/MetaTag";

export default function StudyList() {
  const pushToast = useToast();
  const isSidebarOpenNarrow = useResponsiveSidebar();
  const { currentCategory, setCurrentCategory, selectedFilter, setSelectedFilter, currentPage, setCurrentPage } =
    useStudyListStore();
  const [searchTitle, setSearchTitle] = useDebounceValue("", 500);

  const { data, error, isError, isLoading } = useQuery({
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
  });

  const isVisibleSkeleton = useSkeleton(isLoading);
  const list = data?.data || [];

  const handleStacksChange = (stacks: string[]) => {
    setSelectedFilter({ ...selectedFilter, stacks });
    setCurrentPage(1);
  };

  const handlePositionChange = (position: string) => {
    setSelectedFilter({ ...selectedFilter, position });
    setCurrentPage(1);
  };

  const handleProgressWayChange = (progressWay: string) => {
    setSelectedFilter({ ...selectedFilter, progressWay });
    setCurrentPage(1);
  };

  const handleSortByChange = (sortBy: string) => {
    setSelectedFilter({ ...selectedFilter, sortBy });
    setCurrentPage(1);
  };

  const handleTitleChange = (title: string) => {
    setSearchTitle(title);
    setCurrentPage(1);
  };

  if (isError) {
    pushToast(`${error.message}`, "error");
  }

  const handleCategoryChange = (category: string) => {
    const filterKey = getFilterKey<CategoryList>(categoryListFilter, category);
    const newCategory = filterKey as CategoryListFilter;
    setCurrentCategory(newCategory);
    setCurrentPage(1);
  };

  const totalPage = data?.meta.pageCount || 0;

  return (
    <>
      <MetaTag title="스터디/프로젝트 찾기 | CO-KKIRI" />
      <S.Container>
        <S.Box $isSidebarOpenNarrow={isSidebarOpenNarrow}>
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
            selectedFilter={selectedFilter}
            handleStacksChange={handleStacksChange}
            handlePositionChange={handlePositionChange}
            handleProgressWayChange={handleProgressWayChange}
            handleSortByChange={handleSortByChange}
          />
          {isVisibleSkeleton ? (
            <S.CardsSkeletonWarper>
              <CardsSkeleton />
            </S.CardsSkeletonWarper>
          ) : (
            <Cards data={list} page="studyList" />
          )}
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPage} />
        </S.Box>
        <CreatePost />
      </S.Container>
    </>
  );
}
