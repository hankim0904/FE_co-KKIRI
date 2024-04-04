import { useState, useEffect } from "react";

/**
 * 스켈레톤 UI를 최소한 지정된 시간 동안 표시하는 훅
 *
 * @param {boolean} isLoading - 데이터 로딩 상태
 * @returns {boolean} 스켈레톤 UI를 표시할지 여부
 */
export default function useSkeleton(isLoading: boolean) {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (!isLoading) {
      timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 800);
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  // 로딩 중이거나 최소 표시 시간이 지나지 않았다면 true를 반환
  return isLoading || showSkeleton;
}
