import DefulatFormElement from "@/components/commons/Form/FormElement";
import RHFDropdown from "@/components/commons/Form/RHFDropdown";
import RHFStackMultiSelectDropdown from "@/components/commons/Form/RHFStackMultiSelectDropdown";
import ModalTextFieldInput from "../ModalTextFieldInput";
import RHFEditableUserImage from "./RHFEditableUserImage";
import DESIGN_TOKEN from "@/styles/tokens";
import styled from "styled-components";
import { FormEvent, useState } from "react";
import { UserInfoEditApiRequestDto } from "@/lib/api/myPage/type";
import { Control } from "react-hook-form";
import { DROPDOWN_FORM_INFO } from "@/constants/dropDown";
import Button from "@/components/commons/Button";

interface EditUserProfileModalFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onTempImageChange: (file: File) => void;
  control: Control<UserInfoEditApiRequestDto>;
}

export default function EditUserProfileModalForm({
  onSubmit,
  onTempImageChange,
  control,
}: EditUserProfileModalFormProps) {
  const {
    user: { position, career },
  } = DROPDOWN_FORM_INFO;

  return (
    <Form onSubmit={onSubmit}>
      <UserImageWrapper $gridArea="user-image">
        <RHFEditableUserImage onImageChange={onTempImageChange} formFieldName="profileImageUrl" control={control} />
      </UserImageWrapper>
      <FormElement
        $gridArea="nickname"
        label={"닉네임"}
        FormFieldComponent={<ModalTextFieldInput name="nickname" control={control} />}
      />

      <FormElement
        $gridArea="position"
        label={"포지션"}
        FormFieldComponent={
          <RHFDropdown placeholder="포지션" options={position} formFieldName="position" control={control} />
        }
      />

      <FormElement
        $gridArea="career"
        label={"경력"}
        FormFieldComponent={
          <RHFDropdown placeholder="경력" options={career} formFieldName="career" control={control} />
        }
      />

      <FormElement
        $gridArea="link"
        label={"대표 링크"}
        FormFieldComponent={<ModalTextFieldInput name="link" control={control} />}
      />

      <FormElement
        $gridArea="stack"
        label={"관심 스택"}
        FormFieldComponent={<RHFStackMultiSelectDropdown limit={3} formFieldName="stack" control={control} />}
      />

      <FormElement
        $gridArea="introduce"
        label={"한줄 소개"}
        FormFieldComponent={<ModalTextFieldInput name="introduce" control={control} />}
      />

      <SubmitButton variant="primary" $gridArea="button">
        수정하기
      </SubmitButton>
    </Form>
  );
}

const { mediaQueries } = DESIGN_TOKEN;

const Form = styled.form`
  width: 100%;
  display: grid;
  gap: 1.8rem 2rem;

  grid-template-areas: "user-image user-image" "nickname position" "link career" "stack stack" "introduce introduce" "button button";
  grid-template-columns: 1fr 1fr;

  ${mediaQueries.mobile} {
    display: flex;
    flex-direction: column;
    height: 62rem;
    overflow-y: overlay;
    overflow-x: hidden;
  }
`;

const UserImageWrapper = styled.div<{ $gridArea: string }>`
  grid-area: ${({ $gridArea }) => $gridArea};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormElement = styled(DefulatFormElement)<{ $gridArea: string }>`
  grid-area: ${({ $gridArea }) => $gridArea};
`;

const SubmitButton = styled(Button)<{ $gridArea: string }>`
  grid-area: ${({ $gridArea }) => $gridArea};
`;
