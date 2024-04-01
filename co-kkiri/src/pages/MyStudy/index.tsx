import useMyStudyStore from "@/stores/myStudyStore";

import * as S from "./styled";

import Cards from "@/components/commons/Cards";
import ScrollToTop from "@/components/commons/FloatingButton/ScrollToTop";

import useResponsiveSidebar from "@/hooks/useResponsiveSideBar";
import { categoryStudyStatusFilter } from "@/constants/categoriesAndFilters";
import { CategoryStudyStatus } from "@/types/categoryAndFilterTypes";
import { getFilterKey } from "@/utils/objectUtils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchList } from "@/utils/myStudyPageFetchList";

export default function MyStudy() {
  const { currentCategory, setCurrentCategory } = useMyStudyStore();
  const isSidebarOpenNarrow = useResponsiveSidebar();
  const fetchListWithCategory = ({ pageParam = 1 }) => fetchList(currentCategory, { pageParam });

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["myStudyList", currentCategory],
    queryFn: fetchListWithCategory,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) =>
      lastPage.meta.hasNextPage ? lastPageParam + 1 : undefined,
  });

  const handleCategoryChange = (category: string) => {
    const filterKey = getFilterKey<CategoryStudyStatus>(categoryStudyStatusFilter, category);
    setCurrentCategory(filterKey as CategoryStudyStatus);
  };

  const allCards = data?.pages.flatMap((page) => page.data) ?? [];

  if (error) {
    console.error(error);
  }

  return (
    <S.Container>
      <S.Box $isSidebarOpenNarrow={isSidebarOpenNarrow}>
        <S.Title>나의 스터디/프로젝트</S.Title>
        <S.FilterListSection
          type="category"
          currentFilter={categoryStudyStatusFilter[currentCategory]}
          filters={Object.values(categoryStudyStatusFilter)}
          onFilterClick={handleCategoryChange}
        />
        <Cards data={allCards} page="myStudy" />
        {hasNextPage && (
          <S.ButtonSection variant="ghost" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            더보기
          </S.ButtonSection>
        )}
        <ScrollToTop />
      </S.Box>
    </S.Container>
  );
}
