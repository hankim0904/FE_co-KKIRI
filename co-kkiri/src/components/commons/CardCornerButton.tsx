import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";
import { CARD_CORNER_BUTTON, CardCornerButtonType } from "@/constants/cardCornerButton";
import useScrapMutations from "@/hooks/useMutation/useScrapMutation";

interface CardCornerButtonProps {
  cardCornerType?: CardCornerButtonType;
  isScraped?: boolean;
  postId: number;
  onModalClick?: () => void;
  className?: string;
}

/**
 * CardCornerButton 컴포넌트는 카드 모서리에 위치하는 버튼(스크랩, 관리, 리뷰 작성, 리뷰 보기)을 표시합니다.
 *
 * @param {CardCornerButtonType} cardCornerType - 버튼의 타입을 결정합니다. ("scrap", "manage", "write", "view" 중 하나)
 * 각 타입의 icon, width, text는 CARD_CORNER_BUTTON객체에서 관리합니다.
 * @param {boolean} isScraped - 스크랩 버튼의 경우, 현재 스크랩이 되어있는지 여부를 나타냅니다.
 * @param {number} [postId] - 관리, 리뷰 작성 버튼의 경우, 해당 포스트의 ID입니다.
 *
 * @example
 * <CardCornerButton cardCornerType="scrap" isScraped={true} postId={123}/>
 */
export default function CardCornerButton({
  cardCornerType = "scrap",
  isScraped = false,
  postId,
  onModalClick,
  className,
}: CardCornerButtonProps) {
  const navigate = useNavigate();
  const { text, icon, width } = CARD_CORNER_BUTTON[cardCornerType as CardCornerButtonType];
  const { ScrapMutation, CancelScrapMutation } = useScrapMutations(postId, isScraped);
  const isLoading = ScrapMutation.isPending || CancelScrapMutation.isPending;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    switch (cardCornerType) {
      case "scrap":
        if (isLoading) {
          return;
        }
        isScraped ? CancelScrapMutation.mutate() : ScrapMutation.mutate();
        break;
      case "manage":
        navigate(`/mystudy/${postId}`);
        break;
      case "write":
        navigate(`/mystudy/${postId}/review`);
        break;
      case "view":
        if (onModalClick) {
          onModalClick();
        }
    }
  };

  return (
    <Wrapper onClick={handleClick} className={className} $cardCornerType={cardCornerType} $isLoading={isLoading}>
      {text && <Text $cardCornerType={cardCornerType}>{text}</Text>}
      <Icon src={icon(isScraped).src} alt={icon(isScraped).alt} $width={width} />
    </Wrapper>
  );
}

const {
  color,
  typography: { font12Bold },
} = DESIGN_TOKEN;

const Wrapper = styled.div<{ $cardCornerType: CardCornerButtonType | null; $isLoading: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  ${({ $isLoading, $cardCornerType }) =>
    $isLoading ? "cursor: wait" : $cardCornerType === "complete" ? "cursor: default;" : "cursor: pointer;"};
  ${({ $cardCornerType }) =>
    $cardCornerType === "write" || $cardCornerType === "view" || $cardCornerType === "complete"
      ? `padding-top:0.5rem; padding-bottom: 1.5rem;`
      : ""};
`;

const Text = styled.span<{ $cardCornerType: CardCornerButtonType | null }>`
  ${font12Bold}
  color: ${({ $cardCornerType }) =>
    $cardCornerType === "write"
      ? `${color.primary[1]}`
      : $cardCornerType === "view"
        ? `${color.secondary}`
        : `${color.gray[1]}`};
`;

const Icon = styled.img<{ $width?: number }>`
  width: ${({ $width }) => ($width ? `${$width / 10}rem` : "100%")};
`;
