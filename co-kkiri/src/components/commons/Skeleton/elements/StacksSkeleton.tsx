import styled from "styled-components";
import DefaultSkeleton from "./DefaultSkeleton";

export default function StacksSkeleton() {
  return (
    <Container>
      {new Array(3).fill("").map((_, i) => (
        <Stack key={i} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const Stack = styled(DefaultSkeleton)`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
`;
