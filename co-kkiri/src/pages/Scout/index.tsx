import { useEffect, useState } from "react";
import * as S from "./styled";
import ScoutFilters from "@/components/domains/scout/ScoutFilters";
import ScoutCards from "@/components/domains/scout/ScoutCards";
import SearchInput from "@/components/commons/SearchInput";
import Pagination from "@/components/commons/Pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSearchedMemberProfile } from "@/lib/api/member";
import { useDebounceValue } from "usehooks-ts";
import useResponsiveSidebar from "@/hooks/useResponsiveSideBar";
import { useToast } from "@/hooks/useToast";
import ScoutCardsSkeleton from "@/components/commons/Skeleton/ScoutCardsSkeleton";
import useSkeleton from "@/hooks/useSkeleton";

export interface SelectedFilter {
  position: string;
  stacks: string[];
}

export default function Scout() {
  const pushToast = useToast();
  const isSidebarOpenNarrow = useResponsiveSidebar();
  const [selectedFilter, setSelectedFilter] = useState<SelectedFilter>({
    position: "",
    stacks: [],
  });
  const [searchNickname, setSearchNickname] = useDebounceValue("", 500);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, error, isError, isLoading } = useQuery({
    queryKey: [
      "/member/search",
      {
        nickname: searchNickname,
        position: selectedFilter.position,
        stacks: selectedFilter.stacks,
        page: currentPage,
      },
    ],
    queryFn: () =>
      getSearchedMemberProfile({
        nickname: searchNickname,
        position: selectedFilter.position,
        stacks: selectedFilter.stacks,
        page: currentPage,
        take: 12,
      }),
    placeholderData: keepPreviousData,
  });

  const isVisibleSkeleton = useSkeleton(isLoading);
  const totalPages = data?.meta.pageCount || 0;
  const scoutCardData = data?.data || [];

  if (isError) {
    pushToast(`${error.message}`, "error");
  }

  const handlePositionChange = (position: string) => setSelectedFilter((prev) => ({ ...prev, position }));

  const handleStacksChange = (stacks: string[]) => setSelectedFilter((prev) => ({ ...prev, stacks }));

  const handleNicknameChange = (nickname: string) => setSearchNickname(nickname);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter, searchNickname]);

  return (
    <S.Container>
      <S.Box $isSidebarOpenNarrow={isSidebarOpenNarrow}>
        <S.TitleWrapper>
          <S.Title>스카우트</S.Title>
          <SearchInput placeholder="멤버를 찾아보세요!" handleValueChange={handleNicknameChange} />
        </S.TitleWrapper>
        <ScoutFilters
          selectedFilter={selectedFilter}
          handleStacksChange={handleStacksChange}
          handlePositionChange={handlePositionChange}
        />
        {isVisibleSkeleton ? <ScoutCardsSkeleton /> : <ScoutCards userProfiles={scoutCardData} />}
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      </S.Box>
    </S.Container>
  );
}
