import { IMAGES } from "@/constants/images";
import DESIGN_TOKEN from "@/styles/tokens";
import { styled } from "styled-components";
import UserProfileModal from "../modals/UserProfileModal";
import useOpenToggle from "@/hooks/useOpenToggle";

interface UserInfoProps {
  user: {
    id?: number;
    nickname?: string;
    profileImageUrl?: string;
  };
  nicknameBold?: boolean;
  type?: "review";
}

export default function UserInfo({ user, nicknameBold, type }: UserInfoProps) {
  const { isOpen: isUserProfileModalOpen, openToggle } = useOpenToggle();

  const handleToggle = () => {
    if (type !== "review") {
      openToggle();
    }
  };

  return (
    <>
      {isUserProfileModalOpen && user.id && <UserProfileModal userId={user.id} onClose={openToggle} />}
      <UserInfoWrapper onClick={handleToggle}>
        {user.profileImageUrl ? (
          <ProfileImg src={user.profileImageUrl} alt="프로필 사진" />
        ) : (
          <img src={IMAGES.profileImg.src} alt={IMAGES.profileImg.alt} />
        )}
        <Nickname $bold={nicknameBold}>{user.nickname}</Nickname>
      </UserInfoWrapper>
    </>
  );
}

const {
  typography: { font14Medium, font14Semibold },
} = DESIGN_TOKEN;

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;

  img {
    border-radius: 50%;
  }
`;

const ProfileImg = styled.img`
  width: 3.6rem;
  height: 3.6rem;
  object-fit: cover;
`;

const Nickname = styled.div<{ $bold?: boolean }>`
  ${({ $bold }) => ($bold ? `${font14Semibold}` : `${font14Medium}`)}
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex-shrink: 1;
`;
