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

interface MappedButtonProps {
  postApplyStatus: PostApplyStatus;
  postId: number;
  teamInviteId: number;
  className?: string;
}

const { serverError, unauthorized, success } = TOAST;

export default function StatusBasedButton({ postApplyStatus, postId, teamInviteId, className }: MappedButtonProps) {
  const { isOpen: isConfirmOpen, openToggle: confirmToggle } = useOpenToggle();
  const { isOpen: isInviteResponseOpen, openToggle: inviteResponseToggle } = useOpenToggle();
  const [confirmType, setConfirmType] = useState<ConfirmType>("apply");
  const pushToast = useToast();

  const { applyMutation, cancelMutation } = usePostMutation();

  const handleConfirmAgreeClick = () => {
    switch (postApplyStatus) {
      case "APPLIED":
        cancelMutation.mutate(postId, {
          onSuccess: () => {
            pushToast(success.message, success.type);
          },
          onError: () => pushToast(serverError.message, serverError.type),
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
            if (error.name === "Unauthorized") {
              pushToast(unauthorized.message, unauthorized.type);
              return;
            }
            pushToast(serverError.message, serverError.type);
          },
          onSettled: () => {
            confirmToggle();
          },
        });
        break;
    }
  };

  const handleModal = () => {
    switch (postApplyStatus) {
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

  if (postApplyStatus === "OWNER") return null;

  return (
    <div className={className}>
      <StyledButton
        onClick={handleModal}
        variant={statusButtonConfig[postApplyStatus].variant}
        disabled={statusButtonConfig[postApplyStatus].disabled || applyMutation.isPending}>
        {statusButtonConfig[postApplyStatus].text}
      </StyledButton>
      {isConfirmOpen && <ConfirmModal type={confirmType} onClose={confirmToggle} onClick={handleConfirmAgreeClick} />}
      {isInviteResponseOpen && <InviteResponseModal onClose={inviteResponseToggle} teamInviteId={teamInviteId} />}
    </div>
  );
}

const StyledButton = styled(Button)``;
