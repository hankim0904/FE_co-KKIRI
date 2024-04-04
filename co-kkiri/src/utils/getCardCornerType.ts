import { Pages } from "@/types/pagesTypes";

export const getCardCornerType = (
  page: Pages,
  currentCategory: string | undefined,
  status: string | undefined,
  isReviewed: boolean | undefined,
) => {
  if (page !== "myStudy") {
    return "scrap";
  }
  switch (currentCategory) {
    case "RECRUITING":
    case "WAITING":
    case "ON_GOING":
      return "manage";
    case "COMPLETED":
      if (status === "PROGRESS_END" && isReviewed) {
        return "complete";
      }
      return status === "PROGRESS_END" ? "write" : status === "DONE" ? "view" : "scrap";
    default:
      return "scrap";
  }
};
