import * as S from "./styled";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import StudyReview from "@/components/domains/review/studyReview/StudyReview";
import MemberReview from "@/components/domains/review/memberReview/MemberReview";
import SubmitButton from "@/components/domains/review/SubmitButton";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { getMemberList, postReview } from "@/lib/api/review";
import { ReviewFormValues } from "@/lib/api/review/type";
import { useToast } from "@/hooks/useToast";
import useOpenToggle from "@/hooks/useOpenToggle";
import useReviewStore from "@/stores/reviewStore";
import TOAST from "@/constants/toast";
import { memberData } from "@/lib/mock/review/members";

export default function Review() {
  const { isOpen: isSubmitModalOpen, openToggle } = useOpenToggle();
  const pushToast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { selectedMemberId, setSelectedMemberId } = useReviewStore();
  const { id } = useParams();
  const postId = Number(id);

  const { control, handleSubmit, watch, setValue, setError } = useForm<ReviewFormValues>({
    defaultValues: {
      postId: postId,
      postReview: [],
      memberReview: [],
      memberReviewComment: [],
    },
    mode: "onBlur",
  });

  const { data: memberList, error } = useQuery({
    queryKey: [`review/${postId}/member`],
    queryFn: () => getMemberList(postId),
    placeholderData: keepPreviousData,
    retry: false,
  });

  if (error) {
    navigate("/");
    pushToast(TOAST.serverError.message, "error");
  }

  const handleSubmitReview = useMutation({
    mutationFn: (formData: ReviewFormValues) => postReview(formData),
    onSuccess: () => {
      pushToast("리뷰 작성이 완료되었습니다.", "success");
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      pushToast(error.message, "error");
    },
    onSettled: () => {
      navigate(-1);
    },
  });

  const memberListData = memberList || [];

  const onSubmitHandler = (formData: ReviewFormValues) => {
    const { postId, postReview, memberReview, memberReviewComment } = formData;
    // const filteredReviewComment = memberReviewComment.filter((item) => item && item.comment);
    const formatedForm: ReviewFormValues = {
      postId,
      postReview,
      memberReview,
      memberReviewComment,
      // memberReviewCommnet: filteredReviewComment
    };
    if (formatedForm.memberReview.length === 0 || formatedForm.postReview.length === 0) {
      const errorMessage = "스터디 리뷰와 멤버 리뷰를 모두 선택해주세요.";
      setError("postReview", {
        type: "manual",
        message: errorMessage,
      });
      setError("memberReview", {
        type: "manual",
        message: errorMessage,
      });
      pushToast(errorMessage, "error");
      return;
    }
    handleSubmitReview.mutate(formatedForm);
  };

  const memberReviewCommentIndex = memberData.findIndex((member) => member.memberId === selectedMemberId);
  const currentComment = watch(`memberReviewComment.${memberReviewCommentIndex}.comment`);

  const handleMemberClick = (memberId: number) => {
    setSelectedMemberId(memberId);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (memberReviewCommentIndex !== -1) {
      setValue(`memberReviewComment.${memberReviewCommentIndex}.revieweeMemberId`, selectedMemberId);
      setValue(`memberReviewComment.${memberReviewCommentIndex}.comment`, e.target.value);
    }
  };

  const handleModalConfirm = () => {
    handleSubmit(onSubmitHandler)();
    openToggle();
  };

  return (
    <S.Container>
      <S.Box>
        <S.Wrapper>
          <StudyReview control={control} />
          <MemberReview
            member={memberListData}
            selectedMemberId={selectedMemberId}
            onMemberClick={handleMemberClick}
            control={control}
            onChange={handleCommentChange}
            value={currentComment}
          />
        </S.Wrapper>
        <SubmitButton onClick={openToggle} />
      </S.Box>
      {isSubmitModalOpen && <ConfirmModal type="review" onClick={handleModalConfirm} onClose={openToggle} />}
    </S.Container>
  );
}
