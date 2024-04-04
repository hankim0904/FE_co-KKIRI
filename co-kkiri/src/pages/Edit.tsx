import RecruitmentRequestLayout from "@/components/commons/RecruitmentRequestLayout";
import * as S from "@/pages/Recruit/styled";
import { RecruitApiRequestDto } from "@/lib/api/post/type";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPostDetail } from "@/lib/api/post";
import { useNavigate, useParams } from "react-router-dom";
import usePostMutation from "@/hooks/useMutation/usePostMutation";
import { FieldValues } from "react-hook-form";
import { useToast } from "@/hooks/useToast";
import TOAST from "@/constants/toast";

const { serverError, unauthorized } = TOAST;

export default function Edit() {
  const [selectedOptions, setSelectedOptions] = useState<RecruitApiRequestDto>({
    type: "",
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
  const { id } = useParams();
  const postId = Number(id);
  const { editMutation } = usePostMutation();
  const pushToast = useToast();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["postEdit", postId],
    queryFn: () => getPostDetail(postId),
  });

  const handleSubmit = (data: FieldValues) => {
    editMutation.mutate(
      { postId, data: data as RecruitApiRequestDto },
      {
        onSuccess: () => {
          pushToast("포스트가 성공적으로 업로드되었습니다.", "success");
          navigate(`/list/${postId}`);
          queryClient.invalidateQueries();
        },
        onError: (error) => {
          pushToast(serverError.message, serverError.type);
          console.error(error);
        },
      },
    );
  };

  useEffect(() => {
    if (data) {
      if (data.postApplyStatus !== "OWNER") {
        pushToast("잘못된 접근입니다.", "error");
        navigate("/");
      } else {
        setSelectedOptions({
          title: data.postDetails.postTitle,
          content: data.postDetails.postContent,
          type: data.postDetails.type,
          recruitEndAt: data.postDetails.recruitEndAt,
          progressPeriod: data.postDetails.progressPeriod,
          progressWay: data.postDetails.progressWay,
          contactWay: data.postDetails.contactWay,
          capacity: data.postDetails.capacity,
          positions: data.postDetails.positions,
          stacks: data.postDetails.stacks,
          link: data.postDetails.link,
        });
      }
    }
  }, [data]);

  return (
    data && (
      <S.Container>
        <RecruitmentRequestLayout
          isLoading={editMutation.isPending}
          selectedOptions={selectedOptions}
          onSubmitClick={handleSubmit}
          buttonText="수정하기"
        />
      </S.Container>
    )
  );
}
