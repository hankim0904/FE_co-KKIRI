import { useState, ChangeEvent } from "react";
import * as S from "./Comment.styled";
import UserInfo from "@/components/commons/UserInfo";
import CommentTextarea from "@/components/domains/detail/Comments/CommentTextarea";
import { createTimePassedMessage } from "@/utils/formatDate";
import { CommentInfo } from "@/lib/api/comment/type";
import useCommentMutation from "@/hooks/useMutation/useCommentMutation";
import { useToast } from "@/hooks/useToast";
import TOAST from "@/constants/toast";

interface CommentProps {
  commentInfo: CommentInfo;
  postId: number;
}

const { serverError, unauthorizedComment } = TOAST;

/**
 * 댓글 정보(작성자 정보, 작성날짜, 댓글 본문, 댓글 작성자 확인)객체를 받는 댓글창 컴포넌트
 */
export default function Comment({ commentInfo, postId }: CommentProps) {
  const {
    commentId,
    commentMemberId: id,
    commentProfileImg: profileImageUrl,
    commentNickname: nickname,
    commentCreatedAt,
    commentContent,
    isMine,
  } = commentInfo;
  const commentUser = { profileImageUrl, nickname, id };
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState<string>(commentContent);
  const { editMutation, deleteMutation } = useCommentMutation(postId);
  const pushToast = useToast();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleCommentError = (error: Error) => {
    if (error.name === "Unauthorized") {
      pushToast(unauthorizedComment.message, unauthorizedComment.type);
      return;
    }
    pushToast(serverError.message, serverError.type);
  };

  const handleEditComment = () => {
    const editedComment = { content };
    editMutation.mutate(
      { commentId, content: editedComment },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
        onError: (error) => handleCommentError(error),
      },
    );
  };

  const handleDeleteComment = () => {
    deleteMutation.mutate(commentId, {
      onError: (error) => handleCommentError(error),
    });
  };

  return (
    <S.Container>
      <S.TopBox>
        <S.InfoWrapper>
          <UserInfo user={commentUser} />
          <S.ColumnDivider />
          <S.Date>{createTimePassedMessage(commentCreatedAt, true)}</S.Date>
        </S.InfoWrapper>
        {isMine &&
          (isEditing ? (
            <S.Button onClick={handleEditComment} disabled={editMutation.isPending || !content}>
              완료
            </S.Button>
          ) : (
            <S.ButtonWrapper>
              <S.Button onClick={() => setIsEditing(true)}>수정</S.Button>
              <S.Button onClick={handleDeleteComment} disabled={deleteMutation.isPending}>
                삭제
              </S.Button>
            </S.ButtonWrapper>
          ))}
      </S.TopBox>
      {isEditing ? <CommentTextarea value={content} onChange={handleChange} /> : <S.Text>{content}</S.Text>}
      <S.HorizontalDivider />
    </S.Container>
  );
}
