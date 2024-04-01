import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import CommentTextarea from "./CommentTextarea";
import Button from "@/components/commons/Button";
import useCommentMutation from "@/hooks/useMutation/useCommentMutation";
import { useToast } from "@/hooks/useToast";
import TOAST from "@/constants/toast";

const { serverError, unauthorized } = TOAST;

export default function CommentForm() {
  const [content, setContent] = useState("");
  const { id } = useParams();
  const postId = Number(id);
  const { uploadMutation } = useCommentMutation(postId);
  const pushToast = useToast();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleCommentSubmit = () => {
    const newComment = { content };
    uploadMutation.mutate(newComment, {
      onSuccess: () => {
        setContent("");
      },
      onError: (error) => {
        if (error.name === "Unauthorized") {
          pushToast(unauthorized.message, unauthorized.type);
          return;
        }
        pushToast(serverError.message, serverError.type);
      },
    });
  };

  return (
    <Container>
      <CommentTextarea value={content} onChange={handleChange} />
      <Button variant="ghost" onClick={handleCommentSubmit} width={120} disabled={uploadMutation.isPending || !content}>
        댓글 작성
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2rem;
`;
