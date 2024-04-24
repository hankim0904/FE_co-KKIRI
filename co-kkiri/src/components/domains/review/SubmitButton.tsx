import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "@/components/commons/Button";

interface SubmitButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function SubmitButton({ onClick }: SubmitButtonProps) {
  const navigate = useNavigate();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick(e);
  };

  return (
    <Wrapper>
      <Button type="button" variant="primaryLight" width={156} onClick={() => navigate(-1)}>
        취소하기
      </Button>
      <Button type="button" variant="primary" width={156} onClick={handleSubmit}>
        리뷰 등록하기
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 1.2rem;
`;
