import logo from "@/assets/images/logo.svg";
import profileImg from "@/assets/images/profileImg.svg";
import profileImgBig from "@/assets/images/profileImg_big.svg";
import google from "@/assets/images/google_logo.svg";
import github from "@/assets/images/github_logo.svg";
import logoAnimation from "@/assets/images/logo_animation.svg";
import recruitDesktopWide from "@/assets/images/homeBannerImages/recruit_desktop_wide.svg";
import recruitDesktopNarrow from "@/assets/images/homeBannerImages/recruit_desktop_narrow.svg";
import recruitTablet from "@/assets/images/homeBannerImages/recruit_tablet.svg";
import recruitMobile from "@/assets/images/homeBannerImages/recruit_mobile.png";
import studyListDesktopWide from "@/assets/images/homeBannerImages/studyList_desktop_wide.svg";
import studyListDesktopNarrow from "@/assets/images/homeBannerImages/studyList_desktop_narrow.svg";
import studyListTablet from "@/assets/images/homeBannerImages/studyList_tablet.svg";
import studyListMobile from "@/assets/images/homeBannerImages/studyList_mobile.png";
import scoutDesktopWide from "@/assets/images/homeBannerImages/scout_desktop_wide.svg";
import scoutDesktopNarrow from "@/assets/images/homeBannerImages/scout_desktop_narrow.svg";
import scoutTablet from "@/assets/images/homeBannerImages/scout_tablet.svg";
import scoutMobile from "@/assets/images/homeBannerImages/scout_mobile.png";

export const IMAGES = {
  logo: {
    src: logo,
    alt: "로고",
  },
  profileImg: {
    src: profileImg,
    alt: "프로필 기본 이미지",
  },
  profileImgBig: {
    src: profileImgBig,
    alt: "프로필 기본 이미지",
  },
  googleLogo: {
    src: google,
    alt: "구글 로고",
  },
  githubLogo: {
    src: github,
    alt: "깃허브 로고",
  },
  logoAnimation: {
    src: logoAnimation,
    alt: "NotFound 로고",
  },
  banners: {
    recruit: {
      desktopWide: { src: recruitDesktopWide, alt: "모집하기 배너 이미지" },
      desktopNarrow: { src: recruitDesktopNarrow, alt: "모집하기 배너 이미지" },
      tablet: { src: recruitTablet, alt: "모집하기 배너 이미지" },
      mobile: { src: recruitMobile, alt: "모집하기 배너 이미지" },
    },
    studyList: {
      desktopWide: { src: studyListDesktopWide, alt: "스터디/프로젝트 배너 이미지" },
      desktopNarrow: { src: studyListDesktopNarrow, alt: "스터디/프로젝트 배너 이미지" },
      tablet: { src: studyListTablet, alt: "스터디/프로젝트 배너 이미지" },
      mobile: { src: studyListMobile, alt: "스터디/프로젝트 배너 이미지" },
    },
    scout: {
      desktopWide: { src: scoutDesktopWide, alt: "스카우트 배너 이미지" },
      desktopNarrow: { src: scoutDesktopNarrow, alt: "스카우트 배너 이미지" },
      tablet: { src: scoutTablet, alt: "스카우트 배너 이미지" },
      mobile: { src: scoutMobile, alt: "스카우트 배너 이미지" },
    },
  },
};
