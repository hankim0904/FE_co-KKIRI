import * as S from "./ScrapList.styled";
import SectionTitle from "../manage/SectionTitle";
import Card from "@/components/commons/Card";
import Button from "@/components/commons/Button";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getScrapList } from "@/lib/api/myPage";
import NoResultText from "@/components/commons/NoResultText";
import { useToast } from "@/hooks/useToast";

export default function ScrapList() {
  const pushToast = useToast();
  const PAGE_LIMIT = 6;

  const { data, error, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["/my-page/scrap/list"],
    queryFn: ({ pageParam = 1 }) => getScrapList({ page: pageParam, take: PAGE_LIMIT }),
    initialPageParam: 1,
    getNextPageParam: (prevPage, pages) => {
      if (prevPage.meta.hasNextPage) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
    placeholderData: keepPreviousData,
  });

  const count = data?.pages[0].meta.totalCount;
  const allCards = data?.pages.flatMap((page) => page.data) ?? [];

  if (error) {
    pushToast(`${error.message}`, "error");
  }

  return (
    <S.Container>
      <SectionTitle title="스터디/프로젝트 스크랩 목록" count={count} type="cardList" />
      {count ? (
        <S.Box>
          <S.Wrapper>
            {allCards.map(
              (scrap) =>
                scrap.isScraped && (
                  <div key={scrap.postId}>
                    <Card page="studyList" cardData={scrap} />
                  </div>
                ),
            )}
          </S.Wrapper>
          {hasNextPage && (
            <Button variant="ghost" width={158} onClick={() => fetchNextPage()}>
              더보기
            </Button>
          )}
        </S.Box>
      ) : (
        <NoResultText text="스크랩 목록이 없어요." padding={60} color="gray" />
      )}
    </S.Container>
  );
}
