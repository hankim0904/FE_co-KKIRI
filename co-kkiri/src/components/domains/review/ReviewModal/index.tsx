import EvaluationChip from "@/components/commons/Chips/EvaluationChip.tsx";
import ModalLayout from "@/components/modals/ModalLayout";
import * as S from "./ReviewModal.styled.ts";
import { REVIEW_INFO } from "@/lib/mock/reviewComment.ts";
import { EVALUATION_COMMENT } from "@/constants/evaluationChip";
import { ICONS } from "@/constants/icons";
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";

interface ReviewModalProps {
  onClose: () => void;
}

export default function ReviewModal({ onClose }: ReviewModalProps) {
  const { id } = useParams();
  const { compliments, improvements } = EVALUATION_COMMENT;
  const teamComplimentsTag = [compliments.team.communication, compliments.team.develop, compliments.team.deadline];
  const teamImprovementsTag = [improvements.team.communication, improvements.team.deadline];
  const complimentsTag = [compliments.member.teaching, compliments.member.leadership, compliments.member.moodMaker];
  const improvementsTag = [improvements.member.dogmatic, improvements.member.harsh];
  const { comments, emojis } = REVIEW_INFO;
  const selectedEmojisRef = useRef<string[]>([]);

  const randomPicker = () => {
    const availableEmojis = emojis.filter((emoji) => !selectedEmojisRef.current.includes(emoji));
    const randomIndex = Math.floor(Math.random() * availableEmojis.length);
    const selectedEmoji = availableEmojis[randomIndex];

    selectedEmojisRef.current = [...selectedEmojisRef.current, selectedEmoji];

    return selectedEmoji;
  };

  return (
    <ModalLayout desktopWidth={430} mobileWidth={320} onClose={onClose} isCloseClickOutside>
      <S.Container>
        <h3>스터디 리뷰</h3>
        <S.Box>
          <S.ContentBox>
            <Link to={`/list/${id}`}>
              <h6>
                스터디/프로젝트
                <img src={ICONS.arrowRightGray.src} alt={ICONS.arrowRightGray.alt} />
              </h6>
            </Link>
            <p>실제 사용할 쇼핑몰 웹프로젝트 만들어나가실 분 구합니다. 쇼핑몰 사장</p>
          </S.ContentBox>
          <S.ContentBox>
            <h6>스터디 태그 모음</h6>
            <S.TagBox>
              {teamComplimentsTag.map((tag) => (
                <EvaluationChip key={tag} label={tag} evaluationWay="compliments" />
              ))}
              {teamImprovementsTag.map((tag) => (
                <EvaluationChip key={tag} label={tag} evaluationWay="improvements" />
              ))}
            </S.TagBox>
          </S.ContentBox>
          <S.ContentBox>
            <h6>내가 받은 태그</h6>
            <S.TagBox>
              {complimentsTag.map((tag) => (
                <EvaluationChip key={tag} label={tag} evaluationWay="compliments" />
              ))}
              {improvementsTag.map((tag) => (
                <EvaluationChip key={tag} label={tag} evaluationWay="improvements" />
              ))}
            </S.TagBox>
          </S.ContentBox>
          <S.ContentBox>
            <h6>팀원들의 한마디</h6>
            <S.CommentBox>
              {comments.map((comment) => (
                <S.EmojiBox key={comment}>
                  <S.Emoji>
                    <div>{randomPicker()}</div>
                  </S.Emoji>
                  <p>: {comment}</p>
                </S.EmojiBox>
              ))}
            </S.CommentBox>
          </S.ContentBox>
        </S.Box>
      </S.Container>
    </ModalLayout>
  );
}
