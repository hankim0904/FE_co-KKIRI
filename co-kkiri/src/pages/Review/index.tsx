import * as S from "./styled";
import Button from "@/components/commons/Button";
import MemberReview from "@/components/domains/review/MemberReview";
import StudyEvaluationSection from "@/components/domains/review/StudyEvaluationSection";
import { ICONS } from "@/constants/icons";
import { useHandleError } from "@/hooks/useHandleError";
import { useToast } from "@/hooks/useToast";
import { getMemberList, postReview } from "@/lib/api/review";
import { ReviewFormValues } from "@/lib/api/review/type";
import useReviewStore from "@/stores/reviewStore";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function Review() {
  const pushToast = useToast();
  const navigate = useNavigate();
  const handleError = useHandleError();
  const { selectedMemberId, setSelectedMemberId } = useReviewStore();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const postId = Number(id);

  const { control, handleSubmit, watch, setValue } = useForm<ReviewFormValues>({
    defaultValues: {
      postId: postId,
      postReview: [],
      memberReview: [],
      memberReviewComment: [],
    },
    mode: "onBlur",
  });

  const { data: memberList, error } = useQuery({
    queryKey: [`review/${postId}/member`, selectedMemberId],
    queryFn: () => getMemberList(postId),
    placeholderData: keepPreviousData,
  });

  if (error) {
    handleError(error);
  }

  const handleSubmitReview = useMutation({
    mutationFn: (formData: ReviewFormValues) => postReview(formData),
    onSuccess: () => {
      pushToast("리뷰 작성이 완료되었습니다.", "success");
      queryClient.invalidateQueries();
    },
    onError: () => {
      pushToast("요청에 실패하였습니다.", "error");
    },
    onSettled: () => {
      navigate(-1);
    },
  });

  const onSubmitHandler = (formData: ReviewFormValues) => {
    const { postId, postReview, memberReview, memberReviewComment } = formData;
    const filteredReviewComment = memberReviewComment.filter((item) => item && item.comment);
    const formatedForm: ReviewFormValues = {
      postId,
      postReview,
      memberReview,
      memberReviewComment: filteredReviewComment,
    };
    handleSubmitReview.mutate(formatedForm);
  };

  const currentComment = watch(`memberReviewComment.${selectedMemberId}.comment`);

  const handleMemberClick = (memberId: number) => {
    setSelectedMemberId(memberId);
  };

  useEffect(() => {
    setValue(`memberReviewComment.${selectedMemberId}.revieweeMemberId`, selectedMemberId);
    setValue(`memberReviewComment.${selectedMemberId}.comment`, currentComment);
  }, [selectedMemberId, setValue, watch, currentComment]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedMemberId !== 0) {
      setValue(`memberReviewComment.${selectedMemberId}.revieweeMemberId`, selectedMemberId);
      setValue(`memberReviewComment.${selectedMemberId}.comment`, e.target.value);
    }
  };

  return (
    <S.Container onSubmit={handleSubmit(onSubmitHandler)}>
      <S.Box>
        <S.Wrapper>
          <S.EvaluationWrapper>
            <S.Title>
              <img src={ICONS.number1.src} alt={ICONS.number1.alt} />
              <div>스터디 전체 평가</div>
            </S.Title>
            <StudyEvaluationSection control={control} />
          </S.EvaluationWrapper>
          <S.EvaluationWrapper>
            <S.Title>
              <img src={ICONS.number2.src} alt={ICONS.number2.alt} />
              <div>멤버 평가</div>
            </S.Title>
            {memberList && (
              <MemberReview
                member={memberList}
                selectedMemberId={selectedMemberId}
                onMemberClick={handleMemberClick}
                control={control}
                onChange={handleCommentChange}
                value={currentComment}
              />
            )}
          </S.EvaluationWrapper>
        </S.Wrapper>
        <S.ButtonWrapper>
          <Button type="reset" variant="primaryLight" width={156}>
            취소하기
          </Button>
          <Button type="submit" variant="primary" width={156}>
            리뷰 등록하기
          </Button>
        </S.ButtonWrapper>
      </S.Box>
    </S.Container>
  );
}
