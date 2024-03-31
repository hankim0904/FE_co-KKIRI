export type CategoryList = "STUDY" | "PROJECT";

export type CategoryStudyStatus = "APPLIED" | "RECRUITING" | "ON_GOING" | "COMPLETED";

export interface listPageSelectedFilter {
  stacks: string[];
  position: string;
  progressWay: string;
  sortBy: string;
}

export interface listPageSelectedFilterOptional {
  stacks?: string[];
  position?: string;
  progressWay?: string;
  sortBy?: string;
}
