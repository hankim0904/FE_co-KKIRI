import styled from "styled-components";
import DefaultSkeleton from "./elements/DefaultSkeleton";

interface UserInfoSkeletonProps {
  className?: string;
}

export default function UserProfileSkeleton({ className }: UserInfoSkeletonProps) {
  return (
    <Wrapper className={className}>
      <AvatarSection />
      <NameSection />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;
const AvatarSection = styled(DefaultSkeleton)`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
`;

const NameSection = styled(DefaultSkeleton)`
  width: 10rem;
  height: 1.7rem;
`;
