import DESIGN_TOKEN from "@/styles/tokens";
import DefaultModalLayout from "../ModalLayout";
import EditUserProfileModalLayout from "./EditUserProfileModalLayout";
import styled from "styled-components";
import { useUserInfoMutation } from "@/hooks/useMutation/useUserInfoMutation";

interface EditUserProfileModalProps {
  onClose: () => void;
}

export default function EditUserProfileModal({ onClose }: EditUserProfileModalProps) {
  const userInfoMutation = useUserInfoMutation();

  return (
    <ModalLayout
      desktopWidth={708}
      mobileWidth={320}
      onClose={() => {
        onClose();
      }}>
      <EditUserProfileModalLayout
        onSubmit={(data) => {
          userInfoMutation(data);
          onClose();
        }}
      />
    </ModalLayout>
  );
}

const ModalLayout = styled(DefaultModalLayout)`
  padding: 4rem 3rem 3rem 3rem;
`;
