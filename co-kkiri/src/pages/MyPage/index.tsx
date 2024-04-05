import * as S from "./styled";
import MyPageUserInfo from "@/components/domains/myPage/MyPageUserInfo";
import TagList from "@/components/domains/myPage/TagList";
import InvitedTeamList from "@/components/domains/myPage/InvitedTeamList";
import ScrapList from "@/components/domains/myPage/ScrapList";
import { useQuery } from "@tanstack/react-query";
import { getInvitedTeamList, getReviewTagList, getVisibleProfileStatus } from "@/lib/api/myPage";
import { useToast } from "@/hooks/useToast";
import UserInfoCardSkeleton from "@/components/commons/Skeleton/UserInfoCardSkeleton";
import useSkeleton from "@/hooks/useSkeleton";

export default function MyPage() {
  const pushToast = useToast();
  const {
    data: tagList,
    error: tagListError,
    isLoading: tagListIsLoading,
  } = useQuery({
    queryKey: ["my-page/review/list"],
    queryFn: () => getReviewTagList(),
    retry: false,
    staleTime: 1000 * 60,
  });

  const {
    data: invitedTeamList,
    error: invitedTeamListError,
    isLoading: invitedTeamListLoading,
  } = useQuery({
    queryKey: ["invite/list"],
    queryFn: () => getInvitedTeamList({ page: 1, take: 500 }),
    retry: false,
  });

  const {
    data: visibleProfile,
    error: visibleProfileError,
    isLoading: visibleProfileLoading,
  } = useQuery({
    queryKey: ["my-page/visible-profile"],
    queryFn: () => getVisibleProfileStatus(),
    retry: false,
  });

  const invitedTeamListData = invitedTeamList?.data || [];
  const visibleProfileData = visibleProfile || { isVisibleProfile: false };

  const isVisibleTagListSkeleton = useSkeleton(tagListIsLoading);
  const isVisibleInvitedTeamListSkeleton = useSkeleton(invitedTeamListLoading);
  const isVisibleVisibleProfileSkeleton = useSkeleton(visibleProfileLoading);

  if (tagListError) {
    pushToast(`${tagListError.message}`, "error");
  }

  if (invitedTeamListError) {
    pushToast(`${invitedTeamListError.message}`, "error");
  }

  if (visibleProfileError) {
    pushToast(`${visibleProfileError.message}`, "error");
  }

  return (
    <S.Container>
      <S.Box>
        <S.Wrapper>
          {isVisibleTagListSkeleton && isVisibleInvitedTeamListSkeleton && isVisibleVisibleProfileSkeleton ? (
            <UserInfoCardSkeleton page={"mypage"} />
          ) : (
            <MyPageUserInfo visibleProfile={visibleProfileData} />
          )}
          <S.Lists>
            <TagList reviewList={tagList || []} />
            <InvitedTeamList count={invitedTeamListData.length} teamList={invitedTeamListData} />
          </S.Lists>
        </S.Wrapper>
        <ScrapList />
      </S.Box>
    </S.Container>
  );
}
