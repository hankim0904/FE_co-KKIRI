import useManageButtons from "@/hooks/useManageButtons";
import useOpenToggle from "@/hooks/useOpenToggle";
import styled from "styled-components";
import ReviewModal from "../../modals/ReviewModal";
import { useQuery } from "@tanstack/react-query";
import { getTeamMember } from "@/lib/api/teamMember";
import { useUserInfoStore } from "@/stores/userInfoStore";
import ManageButton from "./ManageButton";

interface ButtonsProps {
  buttonType: "READY" | "PROGRESS" | "PROGRESS_END" | "DONE";
  isLeader: boolean;
  postId: number;
  isReviewed?: boolean;
  studyType: string;
}

export default function Buttons({ buttonType, isLeader, postId, studyType, isReviewed }: ButtonsProps) {
  const { isOpen: isReviewModalOpen, openToggle: handleReviewModalOpen } = useOpenToggle();
  const { goToScoutPage, goToPostReviewPage, studyStartMutation, studyEndMutation, studyReviewEndMutation } =
    useManageButtons();

  const handleStudyStart = () => studyStartMutation.mutate(postId);
  const handleStudyEnd = () => studyEndMutation.mutate(postId);
  const handleReviewEnd = () => studyReviewEndMutation.mutate(postId);

  // 리뷰 여부 확인
  const { data: memberList } = useQuery({
    queryKey: ["memberList", postId],
    queryFn: () => getTeamMember(postId, { page: 1, take: 100 }),
  });
  const user = useUserInfoStore((state) => state.userInfo);
  const memberListData = memberList?.data || [];
  const userProfileImageUrl = user?.profileImageUrl || "";
  const memberProfileImageUrl = memberListData.filter((member) => member.profileImageUrl === userProfileImageUrl)[0];
  const memberReviewed = memberProfileImageUrl?.isReviewed;

  return (
    <Box>
      {isLeader && buttonType === "READY" && (
        <>
          <ManageButton text="초대하기" buttonCount={2} variant="ghost" onClick={goToScoutPage} />
          <ManageButton text={`${studyType} 시작`} buttonCount={2} variant="primary" onClick={handleStudyStart} />
        </>
      )}
      {!isLeader && buttonType === "READY" && (
        <ManageButton text={`${studyType} 대기 중`} buttonCount={1} variant="primary" disabled />
      )}
      {isLeader && buttonType === "PROGRESS" && (
        <ManageButton text={`${studyType} 완료`} buttonCount={1} variant="primary" onClick={handleStudyEnd} />
      )}
      {!isLeader && buttonType === "PROGRESS" && (
        <ManageButton text={`${studyType} 완료`} buttonCount={1} variant="primary" disabled />
      )}
      {memberReviewed === false && buttonType === "PROGRESS_END" && (
        <ManageButton text="리뷰 작성" buttonCount={1} variant="primary" onClick={() => goToPostReviewPage(postId)} />
      )}
      {!isLeader && memberReviewed === true && buttonType === "PROGRESS_END" && (
        <ManageButton text="리뷰 작성 완료" buttonCount={1} variant="primary" disabled />
      )}
      {isLeader && memberReviewed === true && buttonType === "PROGRESS_END" && (
        <ManageButton text="리뷰 마감" buttonCount={1} variant="primary" onClick={handleReviewEnd} />
      )}
      {buttonType === "DONE" && (
        <ManageButton text="내가 받은 리뷰 보기" buttonCount={1} variant="ghost" onClick={handleReviewModalOpen} />
      )}
      {isReviewModalOpen && <ReviewModal onClose={handleReviewModalOpen} postId={postId} />}
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;
