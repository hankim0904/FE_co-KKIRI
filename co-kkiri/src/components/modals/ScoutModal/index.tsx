import { SearchedMemberProfile } from "@/lib/api/member/type";
import DESIGN_TOKEN from "@/styles/tokens";
import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import RHFDropdown from "../../commons/Form/RHFDropdown";
import DefaultModalLayout from "../ModalLayout";
import { mapSubmitData } from "./utils";
import Button from "@/components/commons/Button";
import FormElement from "@/components/commons/Form/FormElement";
import RHFTextArea from "@/components/commons/Form/RHFTextArea";
import ScoutUserProfile from "./ScoutUserProfile";
import { getPostsForScout } from "@/lib/api/scout";
import { InviteMemberRequestDto, ScoutListApiResponseDto } from "@/lib/api/scout/type";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";
import useScoutMutations from "@/hooks/useMutation/useScoutMutation";
import { Option } from "@/types/PositionTypes";
import { CombinedResults } from "./types";

interface ScoutModalProps {
  memberInfo: Pick<SearchedMemberProfile, "memberId" | "nickname" | "profileImageUrl" | "position">;
  onClose: () => void;
}

export default function ScoutModal({ memberInfo, onClose }: ScoutModalProps) {
  const pushToast = useToast();
  const [options, setOptions] = useState<Option[]>([]);

  const { data: scoutPostData, error: scoutPostError } = useInfiniteQuery({
    queryKey: ["scout", "post"],
    queryFn: ({ pageParam }) => getPostsForScout({ page: pageParam, take: 100 }),
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => (firstPage.meta.hasPreviousPage ? firstPage.meta.page - 1 : null),
    getNextPageParam: (lastPage) => (lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : null),
  });

  const { ScoutMutation } = useScoutMutations();

  const { control, handleSubmit } = useForm<InviteMemberRequestDto>({
    defaultValues: {
      postId: undefined,
      memberId: memberInfo.memberId,
      message: "",
    },
    mode: "onSubmit",
  });

  const onSubmitHandler = (formData: InviteMemberRequestDto) => {
    const queryData: CombinedResults = {
      options,
      userInfo: memberInfo,
    };
    const mappedData = mapSubmitData(queryData, formData);
    ScoutMutation.mutate(mappedData);
    // console.log(mappedData);
    //TODO: mutate
  };

  useEffect(() => {
    if (scoutPostError) {
      pushToast("스터디/프로젝트 목록을 불러오는 중 오류가 발생했습니다", "error");
    }

    if (!scoutPostData) return;

    const options = scoutPostData.pages[0].data.map((post) => ({ label: post.title, value: post.postId }));

    setOptions(options);
  }, [scoutPostData, scoutPostError, pushToast]);

  return (
    <ModalLayout desktopWidth={430} mobileWidth={320} onClose={onClose}>
      <Title>유저 초대하기</Title>
      <FormBox onSubmit={handleSubmit(onSubmitHandler)}>
        <FormElement label="초대할 유저" FormFieldComponent={<ScoutUserProfile {...memberInfo} />} />
        <Wrapper>
          <FormElement
            label="스터디/프로젝트 선택"
            FormFieldComponent={
              <RHFDropdown
                formFieldName="postId"
                placeholder="스터디/프로젝트 선택"
                //TODO: 실 데이터 가져와야함
                options={options}
                control={control}
                errorMessage="스터디/프로젝트를 선택해주세요"
                isEssential
              />
            }
            isEssential
          />
          <FormElement
            label="초대 메시지"
            FormFieldComponent={
              <RHFTextArea formFieldName="message" placeholder="초대 메시지를 입력해주세요" control={control} />
            }
          />
        </Wrapper>
        <Button variant="primary">초대하기</Button>
      </FormBox>
    </ModalLayout>
  );
}

const { color, typography } = DESIGN_TOKEN;

const ModalLayout = styled(DefaultModalLayout)`
  padding: 4rem 3rem 3rem;

  display: flex;
  flex-direction: column;
  gap: 6rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
`;

const Title = styled.h1`
  color: ${color.black[1]};
  ${typography.font20Bold}
`;

const FormBox = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 4rem;
`;
