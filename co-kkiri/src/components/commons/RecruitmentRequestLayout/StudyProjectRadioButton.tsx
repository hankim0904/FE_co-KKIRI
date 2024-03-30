import DESIGN_TOKEN from "@/styles/tokens";
import RadioButton from "../RadioButton";
import { styled } from "styled-components";

interface StudyProjectRadioButtonProp {
  selectedValue: string;
  onChang: (value: string) => void;
}

export default function StudyProjectRadioButton({ selectedValue, onChange }: StudyProjectRadioButtonProp) {
  return (
    <Container>
      <RadioButtonBox>
        <RadioButton
          defaultChecked={selectedValue === "STUDY" ? true : false}
          value="STUDY"
          onClick={(value) => {
            onChange(value);
          }}>
          <div>스터디</div>
        </RadioButton>
      </RadioButtonBox>
      <RadioButtonBox>
        <RadioButton
          defaultChecked={selectedValue === "PROJECT" ? true : false}
          value="PROJECT"
          onClick={(value) => {
            onChange(value);
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
