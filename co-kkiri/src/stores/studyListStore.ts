import { create } from "zustand";
import { CategoryListFilter, listPageInitialFilter } from "@/constants/categoriesAndFilters";
import { listPageSelectedFilter } from "@/types/categoryAndFilterTypes";

interface StudyState {
  currentCategory: CategoryListFilter;
  setCurrentCategory: (category: CategoryListFilter) => void;
  selectedFilter: listPageSelectedFilter;
  setSelectedFilter: (filter: listPageSelectedFilter) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const useStudyListStore = create<StudyState>((set) => ({
  currentCategory: "ALL",
  setCurrentCategory: (category) => set({ currentCategory: category }),
  selectedFilter: listPageInitialFilter,
  setSelectedFilter: (filter) => set((state) => ({ selectedFilter: { ...state.selectedFilter, ...filter } })),
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useStudyListStore;
