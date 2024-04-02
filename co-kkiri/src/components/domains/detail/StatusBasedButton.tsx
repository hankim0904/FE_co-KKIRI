import { useState, useEffect } from "react";
import styled from "styled-components";
import useOpenToggle from "@/hooks/useOpenToggle";
import Button from "@/components/commons/Button";
import ConfirmModal from "@/components/modals/ConfirmModal";
import InviteResponseModal from "@/components/modals/InviteResponseModal";
import { statusButtonConfig, StatusButtonConfig } from "@/constants/statusButtonConfig";
import { ConfirmType } from "@/components/modals/ConfirmModal";
import { PostApplyStatus } from "@/lib/api/post/type";
import usePostMutation from "@/hooks/useMutation/usePostMutation";
import { useToast } from "@/hooks/useToast";
import TOAST from "@/constants/toast";
import { useNavigate } from "react-router-dom";
import { useHandleError } from "@/hooks/useHandleError";
import ButtonSkeleton from "@/components/commons/Skeleton/ButtonSkeleton";
import useSkeleton from "@/hooks/useSkeleton";

interface MappedButtonProps {
  postApplyStatus: PostApplyStatus;
  postId: number;
  teamInviteId: number;
  isLoading: boolean;
  className?: string;
}

const { success } = TOAST;

export default function StatusBasedButton({
  postApplyStatus,
  postId,
  teamInviteId,
  isLoading,
  className,
}: MappedButtonProps) {
  const { isOpen: isConfirmOpen, openToggle: confirmToggle } = useOpenToggle();
  const { isOpen: isInviteResponseOpen, openToggle: inviteResponseToggle } = useOpenToggle();
  const [confirmType, setConfirmType] = useState<ConfirmType>("apply");
  const pushToast = useToast();
  const navigate = useNavigate();
  const handleError = useHandleError();
  const isVisibleSkeleton = useSkeleton(isLoading);

  const { applyMutation, cancelMutation } = usePostMutation();

  const handleConfirmAgreeClick = () => {
    switch (postApplyStatus) {
      case "APPLIED":
        cancelMutation.mutate(postId, {
          onSuccess: () => {
            pushToast(success.message, success.type);
          },
          onError: (error) => handleError(error),
          onSettled: () => {
            confirmToggle();
          },
        });
        break;
      case "NOT_APPLIED":
        applyMutation.mutate(postId, {
          onSuccess: () => {
            pushToast(success.message, success.type);
          },
          onError: (error) => {
            handleError(error);
          },
          onSettled: () => {
            confirmToggle();
          },
        });
        break;
    }
  };

  const handleClick = () => {
    switch (postApplyStatus) {
      case "OWNER":
        navigate(`/mystudy/${postId}`);
        break;
      case "APPLIED":
      case "NOT_APPLIED":
        confirmToggle();
        break;
      case "INVITED":
        inviteResponseToggle();
        break;
    }
  };

  useEffect(() => {
    const currentStatusConfig = statusButtonConfig[postApplyStatus as keyof StatusButtonConfig];
    if (currentStatusConfig && currentStatusConfig.type) {
      setConfirmType(currentStatusConfig.type);
    }
  }, [postApplyStatus]);

  return (
    <div className={className}>
      {isVisibleSkeleton || !postApplyStatus ? (
        <ButtonSkeleton />
      ) : (
        <StyledButton
          onClick={handleClick}
          variant={statusButtonConfig[postApplyStatus].variant}
          disabled={statusButtonConfig[postApplyStatus].disabled || applyMutation.isPending}>
          {statusButtonConfig[postApplyStatus].text}
        </StyledButton>
      )}
      {isConfirmOpen && <ConfirmModal type={confirmType} onClose={confirmToggle} onClick={handleConfirmAgreeClick} />}
      {isInviteResponseOpen && <InviteResponseModal onClose={inviteResponseToggle} teamInviteId={teamInviteId} />}
    </div>
  );
}

const StyledButton = styled(Button)``;
