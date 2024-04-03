import * as S from "./styled";
import Button from "@/components/commons/Button";
import MemberReview from "@/components/domains/review/MemberReview";
import StudyEvaluation from "@/components/domains/review/StudyEvaluation";
import { ICONS } from "@/constants/icons";
import { useToast } from "@/hooks/useToast";
import { getMemberList, postReview } from "@/lib/api/review";
import { ReviewFormValues } from "@/lib/api/review/type";
import useReviewStore from "@/stores/reviewStore";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function Review() {
  const pushToast = useToast();
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
    console.error(error);
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
  });

  const onSubmitHandler = (data: ReviewFormValues) => {
    console.log(data);
    handleSubmitReview.mutate(data);
  };

  const currentComment = watch(`memberReviewComment.${selectedMemberId}.content`);

  const handleMemberClick = (memberId: number) => {
    setSelectedMemberId(memberId);
  };

  useEffect(() => {
    setValue(`memberReviewComment.${selectedMemberId}.revieweeMemberId`, selectedMemberId);
    setValue(`memberReviewComment.${selectedMemberId}.content`, currentComment || "");
  }, [selectedMemberId, setValue, watch, currentComment]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(`memberReviewComment.${selectedMemberId}.revieweeMemberId`, selectedMemberId);
    setValue(`memberReviewComment.${selectedMemberId}.content`, e.target.value);
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
            <StudyEvaluation control={control} />
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
                isReviewed={true}
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
