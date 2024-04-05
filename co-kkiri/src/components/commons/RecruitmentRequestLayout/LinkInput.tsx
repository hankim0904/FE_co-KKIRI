import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";

interface LinkInputProps {
  onChange: () => void;
  value: string;
  $isError?: boolean;
  placeholder: string;
}

export default function LinkInput({ onChange, placeholder, value, $isError }: LinkInputProps) {
  const innerText: { [key: string]: string } = {
    "카카오 오픈톡": "오픈채팅 링크",
    이메일: "이메일 주소",
    구글폼: "구글폼 주소",
  };

  return (
    <Container>
      <Input placeholder={innerText[placeholder]} value={value} onChange={onChange} $isError={$isError} />
    </Container>
  );
}

const { color } = DESIGN_TOKEN;

const Container = styled.div`
  width: 100%;
  height: 4.8rem;
`;

const Input = styled.input<{ $isError?: boolean }>`
  width: 100%;
  height: 4.8rem;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  border: 0.1rem solid ${({ $isError }) => ($isError ? color.red : color.gray[2])};
  padding: 1.858rem;

  &:focus {
    outline: none;
  }
`;
