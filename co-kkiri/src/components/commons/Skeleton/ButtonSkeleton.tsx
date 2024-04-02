import React from "react";
import DefaultSkeleton from "./elements/DefaultSkeleton";
import styled from "styled-components";

// type Page = "mystudy" | "detail";

// interface ButtonSkeletonProps {
//   page: Page;
// }

export default function ButtonSkeleton() {
  return <Container />;
}
const Container = styled(DefaultSkeleton)`
  height: 4.8rem;
  width: 100%;
  border-radius: 7.6rem;
`;
