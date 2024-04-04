import { RefObject, useEffect, useLayoutEffect, useRef } from "react";
import PopoverPortal from "./PopoverPortal";
import { useOnClickOutside, useResizeObserver, useWindowSize } from "usehooks-ts";
import styled from "styled-components";

interface PopoverContainerProps {
  triggerRef: RefObject<HTMLElement>;
  marginFromTrigger?: number;
  children: React.ReactNode;
  onClose?: () => void;
}

export default function PopoverContainer({ triggerRef, children, marginFromTrigger, onClose }: PopoverContainerProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  const { width: windowWidth, height: windowHeight } = useWindowSize({});
  const { width: triggerWidth = 0, height: triggerHeight = 0 } = useResizeObserver({
    ref: triggerRef,
    box: "border-box",
  });
  const { width: popoverWidth = 0, height: popoverHeight = 0 } = useResizeObserver({
    ref: popoverRef,
    box: "border-box",
  });

  const handleClose = () => {
    if (onClose) onClose();
  };

  useOnClickOutside([popoverRef, triggerRef], (e) => {
    handleClose();
  });

  useLayoutEffect(() => {
    if (!triggerRef.current) return;
    if (!popoverRef.current) return;

    // Trigger한 element의 위치를 가지고옴
    const triggerBoundary = triggerRef.current.getBoundingClientRect();

    if (popoverHeight <= 0) popoverRef.current.style.visibility = "hidden";

    if (windowHeight - triggerBoundary.bottom > popoverHeight) {
      popoverRef.current.style.top = `${triggerBoundary.bottom + (marginFromTrigger || 0)}px`;
    } else {
      popoverRef.current.style.top = `${triggerBoundary.top - popoverHeight - (marginFromTrigger || 0)}px`;
    }

    if (windowWidth - triggerBoundary.left > popoverWidth) {
      popoverRef.current.style.left = `${triggerBoundary.left}px`;
    } else {
      popoverRef.current.style.right = `0`;
    }
    if (popoverHeight > 0) {
      popoverRef.current.style.visibility = "visible";
    }
  }, [
    marginFromTrigger,
    popoverHeight,
    popoverWidth,
    triggerRef,
    triggerHeight,
    triggerWidth,
    windowHeight,
    windowWidth,
  ]);

  useEffect(() => {
    window.addEventListener("resize", handleClose);
    window.addEventListener("scroll", handleClose, true);

    return () => {
      window.removeEventListener("resize", handleClose);
      window.removeEventListener("scroll", handleClose, true);
    };
  }, [onClose]);

  return (
    <PopoverPortal>
      <Container ref={popoverRef}>{children}</Container>
    </PopoverPortal>
  );
}

const Container = styled.div`
  position: fixed;
  z-index: 9999;
`;
