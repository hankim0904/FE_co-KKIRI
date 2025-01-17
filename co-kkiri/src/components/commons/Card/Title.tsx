import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";

interface TitleProps {
  title: string;
}

export default function Title({ title }: TitleProps) {
  return <CardTitle>{title}</CardTitle>;
}

const {
  color,
  typography: { font16Bold },
} = DESIGN_TOKEN;

const CardTitle = styled.h3`
  ${font16Bold}
  color: ${color.black[1]};
  height: 4.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
