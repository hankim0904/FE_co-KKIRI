import { authAddress, memberAddress } from "../address";
import { apiRequest } from "../axios";
import { UserInfoSummaryResponseDto } from "./type";

const { google, github, kakao } = authAddress;

export const googleLogin = (code: string) => apiRequest("post", google.redirect(code));

export const githubLogin = (code: string) => apiRequest("post", github.redirect(code));

export const kakaoLogin = (code: string) => apiRequest("post", kakao.redirect(code));

export const getUserInfoSummary = (): Promise<UserInfoSummaryResponseDto> =>
  apiRequest("get", memberAddress.userInfoSummary);

export const logout = () => apiRequest("post", authAddress.logout);
