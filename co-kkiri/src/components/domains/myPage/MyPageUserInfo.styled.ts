import DESIGN_TOKEN from "@/styles/tokens";
import styled from "styled-components";

const { typography, color, mediaQueries, boxShadow } = DESIGN_TOKEN;

export const Container = styled.div`
  width: 43rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  ${mediaQueries.mobile} {
    width: 32rem;
  }
`;

export const InfoBox = styled.div`
  width: 100%;
  min-width: fit-content;

  padding: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  border-radius: 2rem;
  box-shadow: ${boxShadow.content};
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 43rem;
  ${mediaQueries.mobile} {
    width: 32rem;
  }
`;

export const Scout = styled.div`
  display: flex;
  gap: 1.2rem;
`;

export const DeleteUser = styled.button`
  ${typography.font14Semibold}
  color: ${color.gray[1]};
`;
