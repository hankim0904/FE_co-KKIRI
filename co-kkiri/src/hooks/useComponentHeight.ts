import { useState, useEffect, RefObject } from "react";
import useSkeleton from "./useSkeleton";

function useComponentHeight<T>(
  data: T,
  componentRef: RefObject<HTMLElement>,
  isLoading: boolean,
  defaultValue: number = 0,
): number {
  const [componentHeight, setComponentHeight] = useState<number>(defaultValue);
  const isVisibleSkeleton = useSkeleton(isLoading);

  // 스켈레톤이 끝나고 실제 데이터가 반영된 컴포넌트의 높이 반영
  useEffect(() => {
    if (!isVisibleSkeleton) {
      const checkComponentHeight = () => {
        if (data && componentRef.current) {
          setComponentHeight(componentRef.current.offsetHeight);
        }
      };
      checkComponentHeight();
    }
  }, [data, componentRef, isVisibleSkeleton]);

  return componentHeight;
}

export default useComponentHeight;
