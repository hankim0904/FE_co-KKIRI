import * as S from "./RecruitLayout.styled";
import { DROPDOWN_FORM_INFO } from "@/constants/dropDown";
import { RecruitApiRequestDto } from "@/lib/api/post/type";
import Button from "../Button";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { handleRecruitFail, isButtonDisabled, validateFormData } from "./utils";
import FormElement from "../Form/FormElement";
import RHFDropdown from "../Form/RHFDropdown";
import RHFLinkInput from "./RHFLinkInput";
import { useMemo } from "react";
import RHFQuill from "./RHFQuill";
import RHFPosition from "./RHFPosition";
import RHFMultiselectDropdown from "./RHFMultiselectDropdown";
import RHFRadioButton from "./RHFRadioButton";
import FormDeadlineDropdown from "./RHFDeadlineDropdown";
import { useNavigate } from "react-router-dom";
interface RecruitmentRequestLayoutProps {
  onSubmitClick: (data: FieldValues) => void;
  buttonText: string;
  selectedOptions: RecruitApiRequestDto;
}

export default function RecruitmentRequestLayout({
  selectedOptions,
  buttonText,
  onSubmitClick,
}: RecruitmentRequestLayoutProps) {
  const {
    recruitment: { capacity, progressPeriod, progressWay, contactWay, position },
  } = DROPDOWN_FORM_INFO;

  const {
    watch,
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: useMemo(() => {
      return selectedOptions;
    }, [selectedOptions]),
    mode: "onBlur",
    values: selectedOptions,
  });
  const navigate = useNavigate();

  const onClickBtn = () => {
    navigate(-1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!validateFormData(errors)) {
      onSubmitClick(data);
    }
    console.log(data);
  };

  const contactWayValue = watch("contactWay");
  const titleValue = watch("title");
  const contentValue = watch("content");

  return (
    <S.SelectContainer onSubmit={handleSubmit(onSubmit)}>
      <h1>스터디/프로젝트 정보 입력</h1>
      <S.GirdContainer>
        <FormElement
          label="모집 구분"
          isEssential={true}
          FormFieldComponent={<RHFRadioButton formFieldName="type" control={control} />}
        />
        <S.FormElementBox>
          <FormElement
            label={"모집 마감 기간"}
            isEssential={true}
            FormFieldComponent={
              <FormDeadlineDropdown formFieldName="recruitEndAt" control={control} placeholder="모집 마감 기간" />
            }
          />
        </S.FormElementBox>
        <S.FormElementBox>
          <FormElement
            label="진행 기간"
            FormFieldComponent={
              <RHFDropdown
                formFieldName="progressPeriod"
                placeholder="진행 기간"
                options={progressPeriod}
                control={control}
              />
            }
          />
        </S.FormElementBox>
        <S.FormElementBox>
          <FormElement
            label="모집 인원"
            FormFieldComponent={
              <RHFDropdown formFieldName="capacity" placeholder="모집 인원" options={capacity} control={control} />
            }
          />
        </S.FormElementBox>
        <S.FormElementBox>
          <FormElement
            label="진행 방식"
            FormFieldComponent={
              <RHFDropdown
                formFieldName="progressWay"
                placeholder="진행 방식"
                options={progressWay}
                control={control}
                isEssential
              />
            }
            isEssential
          />
        </S.FormElementBox>
        <S.ContactWayBox>
          <FormElement
            label="연락 방법"
            FormFieldComponent={
              <RHFDropdown formFieldName="contactWay" placeholder="연락 방법" options={contactWay} control={control} />
            }
          />
          {contactWayValue !== "기타" && contactWayValue.trim() !== "" && (
            <RHFLinkInput formFieldName="link" control={control} placeholder={contactWayValue} />
          )}
        </S.ContactWayBox>
      </S.GirdContainer>
      <FormElement
        label={"기술 스택"}
        FormFieldComponent={<RHFMultiselectDropdown formFieldName="stacks" control={control} />}
      />
      <FormElement
        label={"모집 포지션"}
        isEssential={true}
        FormFieldComponent={<RHFPosition positionCategory={position} formFieldName="positions" control={control} />}
      />
      <S.QuillBox>
        <h1>스터디/프로젝트 소개</h1>
        <S.TitleInput
          {...register("title", { required: true })}
          placeholder="제목을 입력해주세요!"
          onChange={(e) => setValue("title", e.target.value)}
          value={titleValue}
        />
        <RHFQuill formFieldName="content" control={control} />
      </S.QuillBox>
      <S.SubmitButtonBox>
        <Button variant="primaryLight" onClick={onClickBtn}>
          취소하기
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleRecruitFail(errors);
          }}
          disabled={isButtonDisabled(titleValue, contentValue)}>
          {buttonText}
        </Button>
      </S.SubmitButtonBox>
    </S.SelectContainer>
  );
}
