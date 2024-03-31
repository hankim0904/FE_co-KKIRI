import { Control, Controller, FieldValues, Path } from "react-hook-form";
import LinkInput from "./LinkInput";
import DESIGN_TOKEN from "@/styles/tokens";
import { styled } from "styled-components";

interface RHFDropdownProps<ControlType extends FieldValues> {
  placeholder: string;
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
}

export default function RHFLinkInput<ControlType extends FieldValues>({
  formFieldName,
  control,
  placeholder,
}: RHFDropdownProps<ControlType>) {
  return placeholder !== "기타" ? (
    <Controller
      name={formFieldName}
      control={control}
      rules={{
        pattern: {
          value:
            placeholder === "이메일"
              ? /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
              : /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,})\/?([\w/#.-]*)*(\?[\w=&.-]*)?(#[\w-]*)?$/,
          message: placeholder === "이메일" ? "올바른 이메일 형식이 아닙니다." : "올바른 URL 형식이 아닙니다.",
        },
      }}
      render={({ field, fieldState }) => (
        <Container>
          <LinkInput
            placeholder={placeholder}
            value={field.value}
            onChange={field.onChange}
            $isError={fieldState.invalid}
          />
          {fieldState.invalid && <ErrorMessage>{fieldState.error?.message}</ErrorMessage>}
        </Container>
      )}
    />
  ) : null;
}

const { color, typography } = DESIGN_TOKEN;

const Container = styled.div`
  width: 100%;
  height: 4.8rem;
  position: relative;
  top: -1.4rem;
  ${typography.font12Medium};
`;

const ErrorMessage = styled.div`
  ${typography.font12Medium};
  color: ${color.red};
  margin-top: 0.8rem;
`;
