import { BASE_URL } from "./axios";
//get
export const homeAddress = "/main/list";

export const authAddress = {
  google: {
    //get
    login: `${BASE_URL}/auth/google/login`,
    //post
    redirect: (code: string) => `/auth/google/redirect?code=${code}`,
  },
  github: {
    //get
    login: `${BASE_URL}/auth/github/login`,
    //post
    redirect: (code: string) => `/auth/github/redirect?code=${code}`,
  },
  kakao: {
    //get
    login: `${BASE_URL}/auth/kakao/login`,
    //post
    redirect: (code: string) => `/auth/kakao/redirect?code=${code}`,
  },
  logout: `/member/logout`,
};

export const postAddress = {
  //post
  recruit: "/post/recruit",
  //get
  list: "/post/list",
  //get
  scout: "/post/scout",
  //get, delete
  postId: (postId: number) => `/post/${postId}`,
  //get, post
  apply: (postId: number) => `/post/${postId}/apply`,
  //get
  invite: (postId: number) => `/post/${postId}/invite`,
  //delete
  cancel: (postId: number) => `/post/${postId}/apply/cancel`,
  //patch
  modify: (postId: number) => `/post/${postId}/modify`,
  //get
  management: (postId: number) => `/post/${postId}/management`,
  //patch
  studyStart: (postId: number) => `/post/${postId}/start`,
  //patch
  studyEnd: (postId: number) => `/post/${postId}/end`,
  //patch
  reviewEnd: (postId: number) => `/post/${postId}/review-end`,
  //patch ???
  recruitStart: (postId: number) => `/post/${postId}/recruit-start`, // 백엔드 확인 요망
  //post
  viewCountIncrease: (postId: number) => `/post/${postId}/view-count/increase`,
};

export const teamMemberAddress = {
  //get
  teamMember: (postId: number) => `/post/${postId}/team-member`,
  //patch
  accept: (teamMemberId: number) => `/post/team-member/${teamMemberId}/accept`,
  //patch
  reject: (teamMemberId: number) => `/post/team-member/${teamMemberId}/reject`,
  //delete
  out: (teamMemberId: number) => `/post/team-member/${teamMemberId}`,
};

export const commentAddress = {
  //get
  list: (postId: number) => `/post/${postId}/comment/list`,
  //post
  write: (postId: number) => `/post/${postId}/comment/write`,
  //patch, delete
  commentId: (postId: number, commentId: number) => `/post/${postId}/${commentId}`,
};

export const scrapAddress = {
  //post
  scrap: (postId: number) => `/post/${postId}/scrap/create`,
  //delete
  cancel: (postId: number) => `/post/${postId}/scrap/delete`,
};

export const myPageAddress = {
  //get, patch
  userInfo: "/my-page/info",
  //get
  tagList: "/my-page/review/list",
  //get
  inviteList: "/my-page/invite/list",
  //get
  scrapList: "/my-page/scrap/list",
  //patch
  visibleProfile: "/my-page/visible-profile",
  //delete
  myPage: "/my-page/info",
};

export const teamAddress = {
  //patch
  accept: "/team/accept",
  //patch
  reject: "/team/reject",
  //get
  inviteInfo: (teamInviteId: number) => `/team/${teamInviteId}`,
};

export const myPostAddress = {
  //get
  applyList: "/my-post/apply/list",
  //get
  recruitList: "/my-post/recruit/list",
  //get
  waitingList: "/my-post/waiting/list",
  //get
  onGoingList: "/my-post/on-going/list",
  //get
  completedList: "/my-post/complete/list",
  //patch
  onGoingComplete: "/my-post/on-going/complete",
};

export const memberAddress = {
  //get
  userInfoSummary: "/member/info/summary",
  //get
  memberId: (memberId: number) => `/member/${memberId}`,
  //get
  search: "/member/search",
  //get
  reviewList: (memberId: number) => `review/list/${memberId}`,
};

export const scoutAddress = {
  //get
  postsForScout: "/scout/post",
  //post
  inviteScout: "/scout/invite",
};

export const reviewAddress = {
  //get
  memberList: (postId: number) => `/review/${postId}/member`,
  //post
  review: "/review/create",
  //get
  reviewInfo: "/my-post/complete/review/info",
  //get
  teamReview: (postId: number) => `/review/${postId}`,
};

//post
export const imageAddress = "/image";
