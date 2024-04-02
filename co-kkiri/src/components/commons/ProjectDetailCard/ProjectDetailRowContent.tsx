import DefaultStacks from "../Stacks";
import DefaultPositions from "../Positions";
import { ContentType, RenderType } from "./types";
import styled from "styled-components";
import Text from "./ProjectDetailRowContents/Text";
import Capacity from "./ProjectDetailRowContents/Capacity";
import ContactWay from "./ProjectDetailRowContents/ContactWay";

export interface ProjectDetailRowContentProps {
  content: ContentType;
  renderType: RenderType;
}

export default function ProjectDetailRowContent({ content, renderType }: ProjectDetailRowContentProps) {
  switch (renderType) {
    case "text":
      if (typeof content === "string") {
        return <Text content={content || "협의 후 결정"} />;
      }
      break;
    case "capacity":
      if (typeof content === "number") {
        return <Capacity content={content} />;
      }
      break;
    case "positions":
      if (Array.isArray(content)) {
        return <Positions positions={content} />;
      }
      break;
    case "stacks":
      if (Array.isArray(content)) {
        return <Stacks stacks={content} />;
      }
      break;
    case "contactWay":
      if (typeof content === "object" && "label" in content && "content" in content) {
        return <ContactWay content={content} />;
      }
  }
}

const Positions = styled(DefaultPositions)`
  height: fit-content;

  flex-wrap: wrap;
  flex-shrink: 1;
`;

const Stacks = styled(DefaultStacks)`
  height: fit-content;

  flex-wrap: wrap;
  flex-shrink: 1;

  gap: 0.8rem;
`;

export const RowContent = styled.p`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
