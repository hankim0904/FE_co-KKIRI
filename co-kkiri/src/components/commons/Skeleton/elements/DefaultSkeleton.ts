import styled, { keyframes } from "styled-components";

const loading = keyframes`
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  
`;

const DefaultSkeleton = styled.div`
  background-color: #dbdbdb;
  position: relative;
  overflow: hidden;
  animation: ${loading} 1.7s ease-in-out infinite;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
export default DefaultSkeleton;
