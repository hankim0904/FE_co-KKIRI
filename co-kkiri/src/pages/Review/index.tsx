import * as S from "./styled";
import Button from "@/components/commons/Button";
import MemberReview from "@/components/domains/review/MemberReview";
import StudyEvaluation from "@/components/domains/review/StudyEvaluation";
import { ICONS } from "@/constants/icons";
import { Member, memberData } from "@/lib/mock/review/members";
import { useState } from "react";
import { useForm } from "react-hook-form";

export interface FormValues {
  TeamCompliments: string[];
  TeamImprovements: string[];
  MemberCompliments: string[];
  MemberImprovements: string[];
  ReviewComment?: string;
}

export default function Review() {
  const { control, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      TeamImprovements: [],
      TeamCompliments: [],
      MemberCompliments: [],
      MemberImprovements: [],
      ReviewComment: "",
    },
  });
  const [selectedMemberId, setSelectedMember] = useState<Member["teamMemberId"]>(0);

  const commentValue = watch("ReviewComment");

  const onSubmitHandler = (data: FormValues) => {
    console.log(data);
  };

  const handleMemberClick = (memberId: Member["teamMemberId"]) => {
    setSelectedMember(memberId);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("ReviewComment", e.target.value); // 'ReviewComment' 필드에 값을 설정합니다.
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
            <MemberReview
              member={memberData.result}
              selectedMemberId={selectedMemberId}
              onMemberClick={handleMemberClick}
              control={control}
              onChange={handleCommentChange}
              value={commentValue}
            />
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
