import { getApplyList, getCompletedList, getOnGoingList, getRecruitList, getWaitingList } from "@/lib/api/myPost";

const PAGE_LIMIT = 12;

export const fetchList = (currentCategory: string, { pageParam }: { pageParam: number }) => {
  const fetchParams = { order: "DESC" as const, page: pageParam, take: PAGE_LIMIT };
  switch (currentCategory) {
    case "APPLIED":
      return getApplyList(fetchParams);
    case "RECRUITING":
      return getRecruitList(fetchParams);
    case "WAITING":
      return getWaitingList(fetchParams);
    case "ON_GOING":
      return getOnGoingList(fetchParams);
    case "COMPLETED":
      return getCompletedList(fetchParams);
    default:
      return Promise.resolve({
        data: [],
        meta: {
          hasNextPage: false,
          hasPreviousPage: false,
          page: 1,
          take: 0,
          totalCount: 0,
          pageCount: 0,
        },
      });
  }
};
