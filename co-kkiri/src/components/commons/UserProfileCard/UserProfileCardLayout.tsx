import * as S from "./UserProfileCardLayout.styled";
import CircularProgressBar from "../CircularProgressBar";
import Stacks from "../Stacks";
import { isEmptyValue } from "@/utils/validationUtils";
import Button from "../Button";
import { useState } from "react";
import EditUserProfileModal from "@/components/modals/EditUserProfileModal";
import { UserInfoApiResponseDto } from "@/lib/api/myPage/type";
import { emptyMessages } from "./constants";

interface UserProfileCardProps extends UserInfoApiResponseDto {
  cardType?: "mypage" | "scout";
}

export default function UserProfileCardLayout({
  profileImageUrl,
  nickname,
  position,
  career,
  stack,
  stacks,
  gauge,
  introduce,
  link,
  cardType,
}: UserProfileCardProps) {
  const [isEditModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleEditModalOpen = () => {
    setIsModalOpen(!isEditModalOpen);
  };
  return (
    <S.Container>
      <S.InfoBox>
        <S.ProgressWrapper>
          <CircularProgressBar size={130} strokeWidth={8} percentage={gauge} animationDuration={1} />
          <S.UserImage profileImgUrl={profileImageUrl} onSelect={() => {}} />
        </S.ProgressWrapper>
        <S.PositionChip label={isEmptyValue(position) ? emptyMessages.position : position!} />
        <S.Nickname>{nickname}</S.Nickname>
        <S.Career>{isEmptyValue(position) ? emptyMessages.career : `경력 ${career}년차`}</S.Career>
        <Stacks stacks={stack || stacks || []} variant="profile" />
      </S.InfoBox>
      {!(cardType === "scout") && (
        <S.IntroduceBox>
          <S.Introduce>{isEmptyValue(introduce) ? emptyMessages.introduce : introduce}</S.Introduce>
          <S.Link href={link || ""} target="_blank" rel="noopener noreferrer">
            <p>{isEmptyValue(link) ? emptyMessages.link : link}</p>
          </S.Link>
        </S.IntroduceBox>
      )}
      {cardType === "mypage" && (
        <S.ButtonBox>
          <Button variant="ghost" onClick={handleEditModalOpen}>
            수정하기
          </Button>
        </S.ButtonBox>
      )}
      {isEditModalOpen && <EditUserProfileModal onClose={handleEditModalOpen} />}
    </S.Container>
  );
}
