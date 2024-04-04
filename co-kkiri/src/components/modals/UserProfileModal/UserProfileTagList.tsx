import styled from "styled-components";
import EvaluationChip from "@/components/commons/Chips/EvaluationChip";
import { TagType } from "@/types/tagtypes";
import DESIGN_TOKEN from "@/styles/tokens";
import { emptyMessages } from "@/components/commons/UserProfileCard/constants";

interface UserProfileTagListProps {
  reviewList: TagType[];
}

export default function UserProfileTagList({ reviewList }: UserProfileTagListProps) {
  const noTags = reviewList.length === 0;
  const compliments = reviewList.filter((tag) => tag.type === "COMPLIMENT");
  return (
    <Container>
      {noTags ? (
        <NoResultText>{emptyMessages.tags}</NoResultText>
      ) : (
        <>
          {compliments.map((tag, index) => (
            <EvaluationChip
              key={`${tag.content}-${index}`}
              label={tag.content || ""}
              evaluationWay={tag.type}
              count={tag.count}
            />
          ))}
        </>
      )}
    </Container>
  );
}

const { typography, color } = DESIGN_TOKEN;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const NoResultText = styled.p`
  margin: 4rem 0;
  
  color: ${color.gray[1]};
  ${typography.font12Regular}
`;
