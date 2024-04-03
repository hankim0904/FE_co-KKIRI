import DESIGN_TOKEN from "@/styles/tokens";
import styled from "styled-components";
import ProjectDetailRowContent, { ProjectDetailRowContentProps } from "./ProjectDetailRowContent";

export interface ProjectDetailRowProps extends ProjectDetailRowContentProps {
  label: string;
}

export default function ProjectDetailRow({ label, content, renderType }: ProjectDetailRowProps) {
  return (
    <Container>
      <Label>
        <span>{label}</span>
      </Label>
      <Box>{<ProjectDetailRowContent content={content} renderType={renderType} />}</Box>
    </Container>
  );
}

const { color, typography } = DESIGN_TOKEN;

const Container = styled.div`
  width: 100%;

  display: flex;
  align-items: flex-start;

  ${typography.font16Semibold}

  p {
    color: ${color.black[1]};
  }
`;

const Box = styled.div`
  //Label 정도의 크기만큼 작아짐
  width: calc(100% - 9.6rem);
`;

const Label = styled.div`
  width: 10rem;
  color: ${color.gray[1]};
`;
