import RecruitmentRequestLayout from "@/components/commons/RecruitmentRequestLayout";
import * as S from "./styled";
import { RecruitApiRequestDto } from "@/lib/api/post/type";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import usePostMutation from "@/hooks/useMutation/usePostMutation";
import { FieldValues } from "react-hook-form";
import { useToast } from "@/hooks/useToast";
import TOAST from "@/constants/toast";
import { useUserInfoStore } from "@/stores/userInfoStore";
import useOpenToggle from "@/hooks/useOpenToggle";
import MetaTag from "@/components/commons/MetaTag";

const { serverError, unauthorized } = TOAST;

export default function Recruit() {
  const [selectedOptions, setSelectedOptions] = useState<RecruitApiRequestDto>({
    type: "STUDY",
    recruitEndAt: "",
    progressPeriod: "",
    capacity: 999,
    contactWay: "",
    progressWay: "",
    stacks: [],
    positions: [],
    title: "",
    content: "",
    link: "",
  });

  const navigate = useNavigate();
  const { uploadMutation } = usePostMutation();
  const pushToast = useToast();
  const { userInfo } = useUserInfoStore();

  const handleSubmit = (data: FieldValues) => {
    if (userInfo) {
      uploadMutation.mutate(data as RecruitApiRequestDto, {
        onSuccess: (data) => {
          pushToast("포스트가 성공적으로 업로드되었습니다.", "success");
          navigate(`/list/${data.postId}`);
        },
        onError: () => {
          pushToast(serverError.message, serverError.type);
        },
      });
    } else {
      pushToast(unauthorized.message, unauthorized.type);
    }
  };

  return (
    <>
      <MetaTag title="스터디/프로젝트 모집하기 | CO-KKIRI" />
      <S.Container>
        <RecruitmentRequestLayout
          isLoading={uploadMutation.isPending}
          selectedOptions={selectedOptions}
          onSubmitClick={handleSubmit}
          buttonText="글 등록하기"
        />
      </S.Container>
    </>
  );
}
