import * as S from "./InviteResponseModal.styled";
import ModalLayout from "../ModalLayout";
import UserInfo from "../../commons/UserInfo";
import Button from "../../commons/Button";
import { ICONS } from "@/constants/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptMember, getInviteInfo, rejectMember } from "@/lib/api/teamMember";
import useOpenToggle from "@/hooks/useOpenToggle";

interface InviteResponseModalProps {
  onClose: () => void;
  teamInviteId: number;
}

export default function InviteResponseModal({ onClose, teamInviteId }: InviteResponseModalProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isOpen, openToggle, ref } = useOpenToggle();

  //팀 초대 조회
  const { data } = useQuery({
    queryKey: ["inviteInfo", teamInviteId],
    queryFn: () => getInviteInfo(teamInviteId),
  });

  const handleAccept = useMutation({
    mutationFn: (teamMemberId: number) => acceptMember(teamMemberId),
    onSuccess: () => {
      console.log("요청 성공");
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleAcceptMember = (teamMemberId: number) => {
    handleAccept.mutate(teamMemberId);
  };

  const handleReject = useMutation({
    mutationFn: (teamMemberId: number) => rejectMember(teamMemberId),
    onSuccess: () => {
      console.log("요청 성공");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const teamMemberId = data?.teamMemberId ? data.teamMemberId : NaN;

  const handleRejectMember = (teamMemberId: number) => {
    handleReject.mutate(teamMemberId);
  };
  console.log(data?.teamMemberId);
  console.log(teamMemberId);
  return (
    <ModalLayout desktopWidth={430} mobileWidth={320} onClose={onClose}>
      <S.Container>
        <S.ContentContainer>
          <h1>초대 메세지</h1>
          <S.SenderInfoBox>
            <h6>초대자</h6>
            <UserInfo user={{ id: data?.sendMemberId, nickname: data?.sendMemberNickname }} />
          </S.SenderInfoBox>
          <S.ContentBox>
            <Link to="">
              <h6>
                스터디/프로젝트
                <img src={ICONS.arrowRightGray.src} alt={ICONS.arrowRightGray.alt} />
              </h6>
            </Link>
            <p>{data?.postTitle}</p>
          </S.ContentBox>
          <S.MessageBox>
            <h6>초대 메시지</h6>
            <p>{data?.message}</p>
          </S.MessageBox>
          <S.SubmitButtonBox>
            <Button onClick={() => handleRejectMember(teamMemberId)} type="submit" variant="red">
              거절하기
            </Button>
            <Button onClick={() => handleAcceptMember(teamMemberId)} type="submit" variant="primary">
              수락하기
            </Button>
          </S.SubmitButtonBox>
        </S.ContentContainer>
      </S.Container>
    </ModalLayout>
  );
}
