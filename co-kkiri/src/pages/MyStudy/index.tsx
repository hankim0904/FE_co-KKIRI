import { useEffect, useState } from "react";
import useMyStudyStore from "@/stores/myStudyStore";

import { useInfiniteQuery } from "@tanstack/react-query";
import * as S from "./styled";

import ScrollToTop from "@/components/commons/FloatingButton/ScrollToTop";
import { useToast } from "@/hooks/useToast";
import useResponsiveSidebar from "@/hooks/useResponsiveSideBar";
import { getFilterKey } from "@/utils/objectUtils";
import { fetchList } from "@/utils/myStudyPageFetchList";
import { categoryStudyStatusFilter } from "@/constants/categoriesAndFilters";
import TOAST from "@/constants/toast";
import { CategoryStudyStatus } from "@/types/categoryAndFilterTypes";
import CardsSkeleton from "@/components/commons/Skeleton/CardsSkeleton";
import useSkeleton from "@/hooks/useSkeleton";

const { serverError, unauthorized } = TOAST;

export default function MyStudy() {
  const { currentCategory, setCurrentCategory } = useMyStudyStore();
  const isSidebarOpenNarrow = useResponsiveSidebar();
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const fetchListWithCategory = ({ pageParam = 1 }) => fetchList(currentCategory, { pageParam });
  const pushToast = useToast();

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["myStudyList", currentCategory],
    queryFn: fetchListWithCategory,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) =>
      lastPage.meta.hasNextPage ? lastPageParam + 1 : undefined,
    retry: 0,
  });

  const handleCategoryChange = (category: string) => {
    const filterKey = getFilterKey<CategoryStudyStatus>(categoryStudyStatusFilter, category);
    setCurrentCategory(filterKey as CategoryStudyStatus);
  };

  useEffect(() => {
    if (!isLoading) {
      setIsFirstLoading(false);
    }
  }, [isLoading]);

  const isVisibleSkeleton = useSkeleton(isFirstLoading);
  const allCards = data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    if (error) {
      if (error.name === "Unauthorized") {
        pushToast(unauthorized.message, unauthorized.type);
        return;
      }
      pushToast(serverError.message, serverError.type);
    }
  }, [error, pushToast]);

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
        {isVisibleSkeleton ? (
          <CardsSkeleton />
        ) : (
          <>
            <S.CardsSection data={allCards} page="myStudy" />
            {hasNextPage && (
              <S.ButtonSection variant="ghost" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                더보기
              </S.ButtonSection>
            )}
          </>
        )}
        <ScrollToTop />
      </S.Box>
    </S.Container>
  );
}
