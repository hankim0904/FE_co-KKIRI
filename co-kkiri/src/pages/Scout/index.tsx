import { useEffect, useState } from "react";
import * as S from "./styled";
import ScoutFilters from "@/components/domains/scout/ScoutFilters";
import ScoutCards from "@/components/domains/scout/ScoutCards";
import SearchInput from "@/components/commons/SearchInput";
import Pagination from "@/components/commons/Pagination";
import NoResultText from "@/components/commons/NoResultText";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSearchedMemberProfile } from "@/lib/api/member";
import { useDebounceValue } from "usehooks-ts";
import useResponsiveSidebar from "@/hooks/useResponsiveSideBar";
import ScoutCardsSkeleton from "@/components/commons/Skeleton/ScoutCardsSkeleton";
import useSkeleton from "@/hooks/useSkeleton";
import { useUserInfoStore } from "@/stores/userInfoStore";

export interface SelectedFilter {
  position: string;
  stacks: string[];
}

export default function Scout() {
  const { userInfo } = useUserInfoStore();
  const isSidebarOpenNarrow = useResponsiveSidebar();
  const [selectedFilter, setSelectedFilter] = useState<SelectedFilter>({
    position: "",
    stacks: [],
  });
  const [searchNickname, setSearchNickname] = useDebounceValue("", 500);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading } = useQuery({
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
    enabled: !!userInfo,
  });

  const isVisibleSkeleton = useSkeleton(isLoading);
  const totalPages = data?.meta.pageCount || 0;
  const scoutCardData = data?.data || [];

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
        {!userInfo ? (
          <NoResultText text="로그인하시면 스카우트를 시작할 수 있어요! 🌟" padding={120} color="black" />
        ) : isVisibleSkeleton ? (
          <ScoutCardsSkeleton />
        ) : (
          <ScoutCards userProfiles={scoutCardData} />
        )}
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      </S.Box>
    </S.Container>
  );
}
