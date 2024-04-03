import * as S from "./InviteResponseModal.styled";
import ModalLayout from "../ModalLayout";
import UserInfo from "../../commons/UserInfo";
import Button from "../../commons/Button";
import { ICONS } from "@/constants/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptMember, getInviteInfo, rejectMember } from "@/lib/api/teamMember";
import TOAST from "@/constants/toast";
import { useToast } from "@/hooks/useToast";
import useOpenToggle from "@/hooks/useOpenToggle";

interface InviteResponseModalProps {
  onClose: () => void;
  teamInviteId: number;
}

const { serverError, success } = TOAST;

export default function InviteResponseModal({ onClose, teamInviteId }: InviteResponseModalProps) {
  const queryClient = useQueryClient();
  const pushToast = useToast();
  const navigate = useNavigate();

  //팀 초대 조회
  const { data } = useQuery({
    queryKey: ["inviteInfo", teamInviteId],
    queryFn: () => getInviteInfo(teamInviteId),
  });

  const teamMemberId = data?.teamMemberId ? data.teamMemberId : NaN;

  const handleAccept = useMutation({
    mutationFn: (teamMemberId: number) => acceptMember(teamMemberId),
    onSuccess: () => {
      queryClient.invalidateQueries();
      pushToast(success.message, success.type);

      return;
    },
    onError: (error) => {
      pushToast(serverError.message, serverError.type);
      console.error(error);
      return;
    },
    onSettled: () => {
      navigate("/mypage");
    },
  });

  const handleAcceptMember = (teamMemberId: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    handleAccept.mutate(teamMemberId);
  };

  const handleReject = useMutation({
    mutationFn: (teamMemberId: number) => rejectMember(teamMemberId),
    onSuccess: () => {
      pushToast(success.message, success.type);
      return;
    },
    onError: (error) => {
      pushToast(serverError.message, serverError.type);
      console.error(error);
      return;
    },
    onSettled: () => {
      navigate("/mypage");
    },
  });

  const handleRejectMember = (teamMemberId: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    handleReject.mutate(teamMemberId);
  };

  return (
    <ModalLayout desktopWidth={430} mobileWidth={320} onClose={onClose} isCloseClickOutside>
      <S.Container>
        <S.ContentContainer>
          <h1>초대 메세지</h1>
          <S.SenderInfoBox>
            <h6>초대자</h6>
            <UserInfo
              user={{
                id: data?.sendMemberId,
                nickname: data?.sendMemberNickname,
                profileImageUrl: data?.sendMemberProfileImageUrl,
              }}
            />
          </S.SenderInfoBox>
          <S.ContentBox>
            <h6>
              스터디/프로젝트
              <img src={ICONS.arrowRightGray.src} alt={ICONS.arrowRightGray.alt} />
            </h6>
            <p>{data?.postTitle}</p>
          </S.ContentBox>
          <S.MessageBox>
            <h6>초대 메시지</h6>
            <p>{data?.message}</p>
          </S.MessageBox>
          <S.SubmitButtonBox>
            <Button onClick={(e) => handleRejectMember(teamMemberId, e)} variant="red">
              거절하기
            </Button>
            <Button onClick={(e) => handleAcceptMember(teamMemberId, e)} variant="primary">
              수락하기
            </Button>
          </S.SubmitButtonBox>
        </S.ContentContainer>
      </S.Container>
    </ModalLayout>
  );
}
