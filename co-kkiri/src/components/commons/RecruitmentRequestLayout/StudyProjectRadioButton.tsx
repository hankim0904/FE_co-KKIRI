import DESIGN_TOKEN from "@/styles/tokens";
import RadioButton from "../RadioButton";
import { styled } from "styled-components";

interface StudyProjectRadioButtonProp {
  selectedValue: string;
  onChange: (value: string) => void;
}

export default function StudyProjectRadioButton({ selectedValue, onChange }: StudyProjectRadioButtonProp) {
  return (
    <Container>
      <RadioButtonBox>
        <RadioButton
          checked={selectedValue === "STUDY"}
          value="STUDY"
          onClick={() => {
            onChange("STUDY");
          }}>
          <div>스터디</div>
        </RadioButton>
      </RadioButtonBox>
      <RadioButtonBox>
        <RadioButton
          checked={selectedValue === "PROJECT"}
          value="PROJECT"
          onClick={() => {
            onChange("PROJECT");
          }}>
          <div>프로젝트</div>
        </RadioButton>
      </RadioButtonBox>
    </Container>
  );
}

const { mediaQueries } = DESIGN_TOKEN;

const RadioButtonBox = styled.div`
  display: flex;
  gap: 4.4rem;
`;

const Container = styled.div`
  width: 36.7rem;
  display: flex;
  align-items: center;
  gap: 4.4rem;

  ${mediaQueries.tablet} {
    gap: 3rem;
  }
`;
