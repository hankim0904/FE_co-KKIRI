import CardSkeleton from "./elements/CardSkeleton";
import useResponsiveSidebar from "@/hooks/useResponsiveSideBar";
import { Wrapper } from "@/components/domains/home/Cards";

export default function HomeCardsSkeleton() {
  const isSidebarOpenNarrow = useResponsiveSidebar();
  return (
    <Wrapper $isSidebarOpenNarrow={isSidebarOpenNarrow}>
      {new Array(4).fill("").map((_, i) => (
        <CardSkeleton page="home" key={i} />
      ))}
    </Wrapper>
  );
}
