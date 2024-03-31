import { DROPDOWN_INFO } from "@/constants/dropDown";
import DESIGN_TOKEN from "@/styles/tokens";
import styled from "styled-components";

interface SharePopoverProps {
  handleShare: (type: string) => void;
}

const { share } = DROPDOWN_INFO;

export default function SharePopover({ handleShare }: SharePopoverProps) {
  return (
    <Container>
      <Box>
        {share.map((options) => (
          <Option
            key={options.type}
            onClick={() => {
              handleShare(options.type);
            }}>
            {options.option}
          </Option>
        ))}
      </Box>
    </Container>
  );
}

const { mediaQueries, color, boxShadow, zIndex } = DESIGN_TOKEN;

const Container = styled.div`
  ${zIndex.dropdown}
  position: absolute;
  top: 4.6rem;
  right: 0;

  ${mediaQueries.tablet} {
    top: -11rem;
    left: 50%;
    margin-left: -7.8rem;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
  width: 15.6rem;
  height: 9.8rem;
  border-radius: 0.5rem;
  background: ${color.white};
  box-shadow: ${boxShadow.content};
  padding: 2rem;
`;

const Option = styled.div`
  font-size: 1.4rem;
  line-height: normal;
  font-weight: 500;
  cursor: pointer;
`;
