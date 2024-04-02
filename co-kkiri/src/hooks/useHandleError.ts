import { useToast } from "@/hooks/useToast";
import TOAST from "@/constants/toast";
import { useNavigate } from "react-router-dom";

const { serverError, unauthorized, deletePost, notFoundPost, notFoundUser } = TOAST;

export const useHandleError = () => {
  const pushToast = useToast();
  const navigate = useNavigate();

  return (error: Error) => {
    if (error.name === "Unauthorized") {
      pushToast(unauthorized.message, unauthorized.type);
      return;
    }
    if (error.name === "Gone") {
      switch (error.message) {
        case "해당 포스트는 삭제되었습니다.":
          pushToast(deletePost.message, deletePost.type);
          navigate("/list");
          break;
        case "해당 포스트의 작성자가 존재하지 않습니다.":
          pushToast(notFoundUser.message, notFoundUser.type);
          navigate("/list");
          break;
      }

      return;
    }
    if (error.name === "Not Found") {
      pushToast(notFoundPost.message, notFoundPost.type);
      navigate("/list");
      return;
    }

    pushToast(serverError.message, serverError.type);
  };
};
