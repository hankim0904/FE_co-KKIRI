import DefaultModalLayout from "../ModalLayout";
import UserProfileCardLayout from "../../commons/UserProfileCard/UserProfileCardLayout";
import styled from "styled-components";
import Button from "../../commons/Button";
import useOpenToggle from "@/hooks/useOpenToggle";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMemberProfile, getMemberReviewList } from "@/lib/api/member";
import { MemberProfileApiResponseDto, MemberReviewListApiResponseDto } from "@/lib/api/member/type";
import { memberProfile } from "@/constants/initialDatas";
import ScoutModal from "../ScoutModal";
import { useToast } from "@/hooks/useToast";
import { useEffect } from "react";
import DESIGN_TOKEN from "@/styles/tokens";
import Divider from "../../commons/Divider";
import CollapseSection from "../../commons/CollapseSection";
import UserProfileTagList from "./UserProfileTagList";
import { useToggle } from "usehooks-ts";
import { useUserInfoStore } from "@/stores/userInfoStore";
import TOAST from "@/constants/toast";

interface UserProfileModalProps {
  userId: number;
  onClose: () => void;
}

const { unauthorized } = TOAST;

export default function UserProfileModal({ userId, onClose }: UserProfileModalProps) {
  const pushToast = useToast();
  const { isOpen: isInvitedModalOpen, setIsOpen: setIsInvitedModalOpen } = useOpenToggle();
  const [isToggled, _, setIsToggled] = useToggle(false);
  const queryClient = useQueryClient();
  const { userInfo } = useUserInfoStore();

  const { data: MemberProfileData, isError: isMemberProfileError } = useQuery<MemberProfileApiResponseDto>({
    queryKey: ["memberProfile", userId],
    queryFn: ({ queryKey }) => getMemberProfile(queryKey[1] as number),
    placeholderData: () => {
      const data = queryClient.getQueryData<MemberProfileApiResponseDto>(["memberProfile", userId]);
      return data || memberProfile;
    },
    staleTime: 1000 * 60,
    enabled: !!userInfo,
  });

  const { data: TagsData, isError: isTagsError } = useQuery<MemberReviewListApiResponseDto>({
    queryKey: ["review", "list", userId],
    queryFn: ({ queryKey }) => getMemberReviewList(queryKey[2] as number),
    placeholderData: () => {
      const data = queryClient.getQueryData<MemberReviewListApiResponseDto>(["review", "list", userId]);
      return data || [];
    },
    staleTime: 1000 * 60,
    enabled: !!userInfo,
  });

  const onScoutClickHandler = () => {
    setIsInvitedModalOpen(true);
  };

  useEffect(() => {
    if (!userInfo) {
      pushToast(unauthorized.message, unauthorized.type);
    }

    if (userInfo && (isMemberProfileError || isTagsError)) {
      pushToast("유저 정보를 불러오는 중 오류가 발생했습니다", "error");
    }
  }, [isMemberProfileError, isTagsError, pushToast, userInfo]);

  if (!userInfo) return null;

  if (!MemberProfileData) {
    return null;
  }

  return (
    <>
      {!isInvitedModalOpen && (
        <ModalLayout desktopWidth={430} tabletWidth={430} mobileWidth={320} onClose={onClose} isCloseClickOutside>
          <UserProfileCardLayout {...MemberProfileData} gauge={MemberProfileData.gauge} />
          <Divider />
          <CollapseSection title="유저가 받은 태그" isOpen={isToggled} onClick={() => setIsToggled(!isToggled)}>
            <UserProfileTagList reviewList={TagsData || []} />
          </CollapseSection>
          {!MemberProfileData.isMine && MemberProfileData.isVisibleProfile && (
            <Button variant="primary" onClick={onScoutClickHandler}>
              스카우트
            </Button>
          )}
        </ModalLayout>
      )}

      {isInvitedModalOpen && (
        <ScoutModal
          memberInfo={{ ...MemberProfileData }}
          onClose={() => {
            setIsInvitedModalOpen(false);
          }}
        />
      )}
    </>
  );
}

const { mediaQueries } = DESIGN_TOKEN;

const ModalLayout = styled(DefaultModalLayout)`
  padding: 4rem 3rem 3rem;

  min-height: 52.2rem;

  ${mediaQueries.mobile} {
    min-height: 51.2rem;
  }
`;
