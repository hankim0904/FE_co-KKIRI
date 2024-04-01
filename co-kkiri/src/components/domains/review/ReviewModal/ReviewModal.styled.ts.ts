import DESIGN_TOKEN from "@/styles/tokens";
import { styled } from "styled-components";

const { color, mediaQueries, typography } = DESIGN_TOKEN;

export const Container = styled.div`
  width: 43rem;
  height: 72rem;

  padding: 4rem 3rem;

  & h3 {
    text-align: center;
    ${typography.font20Bold};
    margin-bottom: 2rem;
  }
  & h6 {
    ${typography.font14Bold};
    color: ${color.gray[1]};
    margin-bottom: 0.8rem;
  }

  ${mediaQueries.tablet} {
    max-height: 72rem;
    overflow: hidden;
  }

  ${mediaQueries.mobile} {
    width: 32rem;
    max-height: 62rem;
    gap: 3rem;
    padding: 0 2rem;
    padding-top: 4rem;
    padding-bottom: 2rem;
  }
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  height: 55.4rem;
  margin-top: 6rem;
  overflow-y: auto;
  overflow-x: hidden;

  ${mediaQueries.mobile} {
    height: 45.4rem;
  }
`;

export const ContentBox = styled.div`
  & h6 {
    display: flex;
    gap: 0.4rem;
  }
  & p {
    ${typography.font16Bold}
    color: ${color.black[2]};
  }
`;

export const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 37rem;
  gap: 0.6rem;

  ${mediaQueries.mobile} {
    width: 28rem;
  }
`;

export const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  justify-content: start;

  ${mediaQueries.mobile} {
    width: 28rem;
  }
`;

export const Emoji = styled.div`
  width: 1.8rem;
  display: flex;
  justify-content: center;
  align-items: center;

  & div {
    width: fit-content;
  }
`;

export const EmojiBox = styled.div`
  display: flex;
  justify-content: start;
  gap: 0.5rem;

  & p {
    ${typography.font16Medium};
  }
`;
