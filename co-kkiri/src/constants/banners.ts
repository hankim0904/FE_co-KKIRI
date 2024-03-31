import { ROUTER_PATH } from "@/lib/path";
import { CategoryListFilter, listPageInitialFilter } from "./categoriesAndFilters";
import { listPageSelectedFilterOptional } from "@/types/categoryAndFilterTypes";

export interface Filter {
  category: CategoryListFilter;
  filters: listPageSelectedFilterOptional;
}

interface BannerItem {
  img: {
    src: string;
    alt: string;
  };
  path: string;
  filter?: Filter;
}

type BannersKey = "studyList" | "scout" | "recruit";

type BannersType = {
  [key in BannersKey]: BannerItem;
};

const { RECRUIT_PATH, STUDY_LIST_PATH, SCOUT } = ROUTER_PATH;

export const BANNERS: BannersType = {
  recruit: { img: { src: "", alt: "" }, path: RECRUIT_PATH },
  studyList: {
    img: { src: "", alt: "" },
    path: STUDY_LIST_PATH,
    filter: { category: "ALL", filters: listPageInitialFilter },
  },
  scout: { img: { src: "", alt: "" }, path: SCOUT },
};
