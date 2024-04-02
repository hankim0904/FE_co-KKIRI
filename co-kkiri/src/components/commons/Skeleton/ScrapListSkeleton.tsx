import CardSkeleton from "./elements/CardSkeleton";
import { Wrapper } from "@/components/domains/myPage/ScrapList.styled";

export default function ScrapListSkeleton() {
  return (
    <Wrapper>
      {new Array(6).fill("").map((_, i) => (
        <CardSkeleton page="studyList" key={i} />
      ))}
    </Wrapper>
  );
}
