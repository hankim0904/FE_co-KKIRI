import EvaluationChip from "@/components/commons/Chips/EvaluationChip.tsx";
import ModalLayout from "@/components/modals/ModalLayout";
import * as S from "./ReviewModal.styled";
import { ICONS } from "@/constants/icons";
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getReview } from "@/lib/api/review/index.ts";
import { TEAM_REVIEW_INFO, emojis } from "@/lib/mock/review/teamReview.ts";

interface ReviewModalProps {
  onClose: () => void;
  postId: number;
}

export default function ReviewModal({ onClose, postId }: ReviewModalProps) {
  const selectedEmojisRef = useRef<string[]>([]);

  const randomPicker = () => {
    const availableEmojis = emojis.filter((emoji) => !selectedEmojisRef.current.includes(emoji));
    const randomIndex = Math.floor(Math.random() * availableEmojis.length);
    const selectedEmoji = availableEmojis[randomIndex];

    selectedEmojisRef.current = [...selectedEmojisRef.current, selectedEmoji];

    return selectedEmoji;
  };

  const { data } = useQuery({
    queryKey: ["teamReview", postId],
    queryFn: () => getReview(postId),
  });

  return (
    <ModalLayout desktopWidth={430} mobileWidth={320} onClose={onClose} isCloseClickOutside>
      <S.Container>
        <h3>스터디 리뷰</h3>
        <S.Box>
          <S.ContentBox>
            <Link to={`/list/${postId}`}>
              <h6>
                스터디/프로젝트
                <img src={ICONS.arrowRightGray.src} alt={ICONS.arrowRightGray.alt} />
              </h6>
            </Link>
            <p>{data?.postTitle}</p>
          </S.ContentBox>
          <S.ContentBox>
            <h6>스터디 태그 모음</h6>
            <S.TagBox>
              {data?.postReviews.map((tag) => (
                <EvaluationChip key={tag.content} label={tag.content} evaluationWay={tag.type} />
              ))}
            </S.TagBox>
          </S.ContentBox>
          <S.ContentBox>
            <h6>내가 받은 태그</h6>
            <S.TagBox>
              {data?.memberReviews.map((tag) => (
                <EvaluationChip key={tag.content} label={tag.content} evaluationWay={tag.type} />
              ))}
            </S.TagBox>
          </S.ContentBox>
          <S.ContentBox>
            <h6>팀원들의 한마디</h6>
            <S.CommentBox>
              {data?.memberReviewComments.map((memberComment) => (
                <S.EmojiBox key={memberComment.comment}>
                  <S.Emoji>
                    <div>{randomPicker()}</div>
                  </S.Emoji>
                  <p>: {memberComment.comment}</p>
                </S.EmojiBox>
              ))}
            </S.CommentBox>
          </S.ContentBox>
        </S.Box>
      </S.Container>
    </ModalLayout>
  );
}
