import * as S from "./styled";
import MyPageUserInfo from "@/components/domains/myPage/MyPageUserInfo";
import TagList from "@/components/domains/myPage/TagList";
import InvitedTeamList from "@/components/domains/myPage/InvitedTeamList";
import ScrapList from "@/components/domains/myPage/ScrapList";
import { useQuery } from "@tanstack/react-query";
import { getInvitedTeamList, getReviewTagList, getVisibleProfileStatus } from "@/lib/api/myPage";
import { useToast } from "@/hooks/useToast";

export default function MyPage() {
  const pushToast = useToast();
  const { data: tagList, error: tagListError } = useQuery({
    queryKey: ["my-page/review/list"],
    queryFn: () => getReviewTagList(),
    retry: false,
  });

  const { data: invitedTeamList, error: invitedTeamListError } = useQuery({
    queryKey: ["invite/list"],
    queryFn: () => getInvitedTeamList({ page: 1, take: 100 }),
    retry: false,
  });

  const { data: visibleProfile, error: visibleProfileError } = useQuery({
    queryKey: ["my-page/visigle-profile"],
    queryFn: () => getVisibleProfileStatus(),
    retry: false,
  });

  const tagListData = tagList?.reviewList || [];
  const invitedTeamListData = invitedTeamList?.data || [];
  const visibleProfileData = visibleProfile || { isVisibleProfile: false };

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
          <MyPageUserInfo visibleProfile={visibleProfileData} />
          <S.Lists>
            <TagList reviewList={tagListData} />
            <InvitedTeamList count={invitedTeamListData.length} teamList={invitedTeamListData} />
          </S.Lists>
        </S.Wrapper>
        <ScrapList />
      </S.Box>
    </S.Container>
  );
}
