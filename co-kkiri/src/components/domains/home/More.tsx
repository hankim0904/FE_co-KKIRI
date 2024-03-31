import { Link } from "react-router-dom";
import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";

import { ROUTER_PATH } from "@/lib/path";

interface MoreProps {
  onClick: () => void;
}

export default function More({ onClick }: MoreProps) {
  return (
    <Link to={ROUTER_PATH.STUDY_LIST_PATH}>
      <Wrapper type="button" onClick={onClick}>
        <span>더보기</span>
      </Wrapper>
    </Link>
  );
}

const {
  color,
  typography: { font14Semibold },
} = DESIGN_TOKEN;

const Wrapper = styled.button`
  ${font14Semibold};
  color: ${color.primary[1]};
`;
