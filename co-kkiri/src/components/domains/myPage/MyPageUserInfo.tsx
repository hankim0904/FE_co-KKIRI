import * as S from "./MyPageUserInfo.styled";
import ToggleButton from "@/components/commons/ToggleButton";
import UserProfileCardLayout from "@/components/commons/UserProfileCard/UserProfileCardLayout";
import ConfirmModal from "@/components/modals/ConfirmModal";
import TOAST from "@/constants/toast";
import useOpenToggle from "@/hooks/useOpenToggle";
import { useToast } from "@/hooks/useToast";
import { deleteUser, editVisibleProfileStatus } from "@/lib/api/myPage";
import { VisibleProfileStatusApiRequestDto } from "@/lib/api/myPage/type";
import { useUserInfoStore } from "@/stores/userInfoStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface MyPageUserInfoProps {
  visibleProfile: VisibleProfileStatusApiRequestDto;
}

export default function MyPageUserInfo({ visibleProfile }: MyPageUserInfoProps) {
  const pushToast = useToast();
  const user = useUserInfoStore();
  const { isOpen: isDeleteUserConfirmModalOpen, openToggle } = useOpenToggle();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const editVisibleProfile = useMutation({
    mutationFn: (data: VisibleProfileStatusApiRequestDto) => editVisibleProfileStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      pushToast(TOAST.severError.message, TOAST.severError.type);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate("/");
      window.location.reload();
      pushToast("회원 탈퇴가 정상적으로 처리되었습니다.", "success");
    },
    onError: () => {
      pushToast(TOAST.severError.message, TOAST.severError.type);
    },
  });

  const handleEditVisibleProfile = () => {
    editVisibleProfile.mutate({ isVisibleProfile: !visibleProfile.isVisibleProfile });
  };

  const handleDeleteUser = () => {
    deleteUserMutation.mutate();
  };

  return (
    <S.Container>
      <S.InfoBox>
        <UserProfileCardLayout
          profileImageUrl={user.userInfo?.profileImageUrl || ""}
          nickname={user.userInfo?.nickname || ""}
          position={user.userInfo?.position}
          career={user.userInfo?.career}
          stack={user.userInfo?.stack || []}
          score={40}
          introduce={user.userInfo?.introduce}
          link={user.userInfo?.link}
          cardType="mypage"
        />
      </S.InfoBox>
      <S.ButtonBox>
        <S.Scout>
          <ToggleButton
            content="스카우트 동의"
            onChange={() => handleEditVisibleProfile()}
            isChecked={visibleProfile.isVisibleProfile}
          />
        </S.Scout>
        <S.DeleteUser onClick={openToggle}>회원 탈퇴하기</S.DeleteUser>
      </S.ButtonBox>
      {isDeleteUserConfirmModalOpen && (
        <ConfirmModal type="deleteUser" onClose={openToggle} onClick={handleDeleteUser} />
      )}
    </S.Container>
  );
}
