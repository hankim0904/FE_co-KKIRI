import useStudyListStore from "@/stores/studyListStore";
import useMyStudyStore from "@/stores/myStudyStore";
import { CategoryListFilter, listPageInitialFilter } from "@/constants/categoriesAndFilters";
import { CategoryStudyStatus, listPageSelectedFilterOptional } from "@/types/categoryAndFilterTypes";

interface StudyListCondition {
  category: CategoryListFilter;
  filters: listPageSelectedFilterOptional;
}

export interface MyStudyCondition {
  category: CategoryStudyStatus;
}

type Condition = StudyListCondition | MyStudyCondition;

export function useFilterSetting() {
  const { setCurrentCategory: setListCurrentCategory, setSelectedFilter: setSelectedListFilter } = useStudyListStore();
  const { setCurrentCategory: setMyStudyCurrentCategory } = useMyStudyStore();

  const filterMappings = {
    studyList: ({ category, filters }: StudyListCondition) => {
      setListCurrentCategory(category);
      setSelectedListFilter({ ...listPageInitialFilter, ...filters });
    },

    myStudy: ({ category }: MyStudyCondition) => {
      setMyStudyCurrentCategory(category);
    },
  };

  const getFilterAction = (key: keyof typeof filterMappings, condition: Condition) => {
    if (filterMappings[key]) {
      if (key === "studyList") {
        return () => filterMappings[key](condition as StudyListCondition);
      } else if (key === "myStudy") {
        return () => filterMappings[key](condition as MyStudyCondition);
      }
    }

    return () => {};
  };

  return { getFilterAction, filterMappings };
}
