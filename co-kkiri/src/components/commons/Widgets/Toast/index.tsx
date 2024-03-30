import { useToastStore } from "@/stores/toastStore";
import DESIGN_TOKEN from "@/styles/tokens";
import { fadeInOut } from "@/utils/animation";
import styled from "styled-components";
import ToastPortal from "./ToastPortal";
import { getToastIcon } from "./util";
import { TOAST_LENGTH } from "./constant";

export default function Toasts() {
  const { toasts } = useToastStore();

  return (
    <ToastPortal>
      <Container>
        {toasts.map(({ id, toastType, message }) => {
          return (
            <Toast key={id}>
              <Icon {...getToastIcon(toastType)} />
              <Message>{message}</Message>
            </Toast>
          );
        })}
      </Container>
    </ToastPortal>
  );
}

const { color, typography, mediaQueries } = DESIGN_TOKEN;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 0.4rem;

  position: fixed;
  top: 8rem;
  right: 4rem;
  z-index: 9998;

  ${mediaQueries.tablet} {
    right: 3rem;
  }
  ${mediaQueries.mobile} {
    align-items: center;

    top: unset;
    right: unset;
    bottom: 8rem;

    left: 50%;
    transform: translateX(-50%);
  }
`;

const Toast = styled.div`
  height: 6rem;
  width: fit-content;

  padding: 0 3rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  background-color: ${color.black[1]};
  border-radius: 0.5rem;

  z-index: 9998;

  overflow: hidden;

  ${mediaQueries.mobile} {
    height: 5rem;
    max-width: 32rem;

    gap: 1.2rem;

    ${typography.font14Medium}
  }

  animation: ${fadeInOut} ${TOAST_LENGTH / 1000}s ease-in-out forwards;
`;

const Message = styled.p`
  color: ${color.white};

  ${typography.font16Medium}

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 1;

  ${mediaQueries.mobile} {
    ${typography.font14Medium}
  }
`;

const Icon = styled.img`
  max-width: 2rem;
`;
