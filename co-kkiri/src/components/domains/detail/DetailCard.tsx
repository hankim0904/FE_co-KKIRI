import ProjectDetailCard from "@/components/commons/ProjectDetailCard";
import { ContactWay } from "@/components/commons/ProjectDetailCard/types";
import DetailCardSkeleton from "@/components/commons/Skeleton/DetailCardSkeleton";
import { PostDetails } from "@/lib/api/post/type";
import { formatDate } from "@/utils/formatDate";
import { postDetailInitialData } from "@/lib/initialData/detail";
import useSkeleton from "@/hooks/useSkeleton";

interface DetailCardProps {
  postDetails: PostDetails;
  className?: string;
  cardRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
}

export default function DetailCard({ postDetails, className, cardRef, isLoading }: DetailCardProps) {
  const { type, recruitEndAt, progressPeriod, positions, progressWay, contactWay, capacity, stacks, link } =
    postDetails;
  const isVisibleSkeleton = useSkeleton(isLoading);

  return (
    <div className={className} ref={cardRef}>
      {isVisibleSkeleton || postDetails === postDetailInitialData ? (
        <DetailCardSkeleton page="detail" />
      ) : (
        <ProjectDetailCard
          ProjectCategory={type}
          recruitEndAt={formatDate(recruitEndAt)}
          progressPeriod={progressPeriod}
          positions={positions}
          progressWay={progressWay}
          contactWay={{ label: contactWay as ContactWay, content: link }}
          capacity={capacity}
          stacks={stacks}
        />
      )}
    </div>
  );
}
