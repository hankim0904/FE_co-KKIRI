import { ROUTER_PATH } from "@/lib/path";
import { CategoryListFilter, listPageInitialFilter } from "./categoriesAndFilters";
import { listPageSelectedFilterOptional } from "@/types/categoryAndFilterTypes";
import { IMAGES } from "./images";

export interface Filter {
  category: CategoryListFilter;
  filters: listPageSelectedFilterOptional;
}

export interface BannerImage {
  desktopWide: { src: string; alt: string };
  desktopNarrow: { src: string; alt: string };
  tablet: { src: string; alt: string };
  mobile: { src: string; alt: string };
}

interface BannerItem {
  img: BannerImage;
  path: string;
  filter?: Filter;
}

type BannersKey = "studyList" | "scout" | "recruit";

type BannersType = {
  [key in BannersKey]: BannerItem;
};

const { RECRUIT_PATH, STUDY_LIST_PATH, SCOUT } = ROUTER_PATH;
const {
  banners: { recruit, studyList, scout },
} = IMAGES;

export const BANNERS: BannersType = {
  recruit: {
    img: {
      desktopWide: { src: recruit.desktopWide.src, alt: recruit.desktopWide.alt },
      desktopNarrow: { src: recruit.desktopNarrow.src, alt: recruit.desktopNarrow.alt },
      tablet: { src: recruit.tablet.src, alt: recruit.tablet.alt },
      mobile: { src: recruit.mobile.src, alt: recruit.mobile.alt },
    },
    path: RECRUIT_PATH,
  },
  studyList: {
    img: {
      desktopWide: { src: studyList.desktopWide.src, alt: studyList.desktopWide.alt },
      desktopNarrow: { src: studyList.desktopNarrow.src, alt: studyList.desktopNarrow.alt },
      tablet: { src: studyList.tablet.src, alt: studyList.tablet.alt },
      mobile: { src: studyList.mobile.src, alt: studyList.mobile.alt },
    },
    path: STUDY_LIST_PATH,
    filter: { category: "ALL", filters: listPageInitialFilter },
  },
  scout: {
    img: {
      desktopWide: { src: scout.desktopWide.src, alt: scout.desktopWide.alt },
      desktopNarrow: { src: scout.desktopNarrow.src, alt: scout.desktopNarrow.alt },
      tablet: { src: scout.tablet.src, alt: scout.tablet.alt },
      mobile: { src: scout.mobile.src, alt: scout.mobile.alt },
    },
    path: SCOUT,
  },
};
