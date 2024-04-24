import MemberReview from "@/components/domains/review/memberReview/MemberReview";
import { create } from "zustand";

interface MemberReview {
  selectedMemberId: number;
  setSelectedMemberId: (memberId: number) => void;
}

const useReviewStore = create<MemberReview>()((set) => ({
  selectedMemberId: 0,
  setSelectedMemberId: (memberId) => set({ selectedMemberId: memberId }),
}));

export default useReviewStore;
