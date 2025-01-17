import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";
import { ICONS } from "@/constants/icons";
import { Stack as StackType } from "@/types/stackTypes";
import { Image } from "@/types/imageTypes";

interface StackProps {
  stack?: Pick<StackType, "name" | "img">;
  className?: string;
}

export default function Stack({ stack, className }: StackProps) {
  const icon: Image =
    stack && stack.img
      ? {
          src: stack.img,
          alt: stack.name,
        }
      : ICONS.questionMark;

  return (
    <Background className={className}>
      {stack && stack.img ? (
        <Icon>
          <use href={icon.src} />
        </Icon>
      ) : (
        <img src={icon.src} alt={icon.alt} width={12} />
      )}
    </Background>
  );
}

const { color } = DESIGN_TOKEN;

const Background = styled.div`
  padding: 0.8rem;

  background-color: ${color.gray[3]};
  border-radius: 50%;
  width: 3.6rem;
  height: 3.6rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.svg`
  width: 100%; /* 컨테이너 너비에 맞춤 */
  height: 100%; /* 컨테이너 높이에 맞춤 */
  object-fit: contain;
`;
