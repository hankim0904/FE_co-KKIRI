import DESIGN_TOKEN from "@/styles/tokens";
import SectionTitle from "../manage/SectionTitle";
import styled from "styled-components";
import NoResultText from "@/components/commons/NoResultText";
import { recievedReviews } from "@/lib/mock/mypage/review";
import EvaluationChip from "@/components/commons/Chips/EvaluationChip";

export default function TagList() {
  return (
    <Container>
      <SectionTitle title="내가 받은 태그" lineLength="mypage" />
      {/* // api 명세가 어떻게 나오는지 보고 해야할 것 같다 */}
      {/* {recievedReviews.compliments.map((tags) => (
        <EvaluationChip label={tags.informative} evaluationWay="compliments" />
      ))} */}
      <NoResultText text="Coming Soon..." padding={60} color="gray" />
    </Container>
  );
}

const { mediaQueries } = DESIGN_TOKEN;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 35rem;

  ${mediaQueries.tablet} {
    width: 70.8rem;
  }

  ${mediaQueries.mobile} {
    width: 32rem;
  }
`;
