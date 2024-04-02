import CardSkeleton from "./elements/CardSkeleton";
import useResponsiveSidebar from "@/hooks/useResponsiveSideBar";
import { CardList } from "../Cards";

export default function CardsSkeleton() {
  const isSidebarOpenNarrow = useResponsiveSidebar();
  return (
    <CardList $isSidebarOpenNarrow={isSidebarOpenNarrow}>
      {new Array(12).fill("").map((_, i) => (
        <CardSkeleton page="studyList" key={i} />
      ))}
    </CardList>
  );
}
