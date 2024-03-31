import { CategoryList, listPageSelectedFilterOptional } from "@/types/categoryAndFilterTypes";

export interface Filter {
  category: CategoryList;
  filters: listPageSelectedFilterOptional;
}

export type Title = "💥 New! 스터디 💥" | "🎊 인기 스터디 🎊" | "✨ 신규 프로젝트 ✨" | "🎉 인기 프로젝트 🎉";

interface ListInfo {
  title: Title;
  filter: Filter;
}

interface HotAndNewList {
  newStudyLists: ListInfo;
  hotStudyLists: ListInfo;
  newProjectLists: ListInfo;
  hotProjectLists: ListInfo;
}

export const HOT_AND_NEW_LIST: HotAndNewList = {
  newStudyLists: { title: "💥 New! 스터디 💥", filter: { category: "STUDY", filters: { sortBy: "LATEST" } } },
  hotStudyLists: { title: "🎊 인기 스터디 🎊", filter: { category: "STUDY", filters: { sortBy: "BY_VIEW" } } },
  newProjectLists: { title: "✨ 신규 프로젝트 ✨", filter: { category: "PROJECT", filters: { sortBy: "LATEST" } } },
  hotProjectLists: {
    title: "🎉 인기 프로젝트 🎉",
    filter: { category: "PROJECT", filters: { sortBy: "BY_VIEW" } },
  },
};
