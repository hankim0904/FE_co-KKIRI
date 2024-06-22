import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StudyList from "@/pages/StudyList";
import Detail from "@/pages/Detail";
import Edit from "@/pages/Edit";
import Recruit from "@/pages/Recruit";
import Review from "@/pages/Review";
import NotFound from "@/pages/NotFound";
import Scout from "@/pages/Scout";
import MyPage from "@/pages/MyPage";
import Manage from "@/pages/Manage";
import MyStudy from "@/pages/MyStudy";
import { ROUTER_PATH } from "@/lib/path";
import Navigation from "./layouts/Navigation";
import GoogleAuth from "./pages/Auth/GoogleAuth";
import AuthListener from "./components/commons/AuthListener";
import GithubAuth from "./pages/Auth/GithubAuth";
import KakaoAuth from "./pages/Auth/KakaoAuth";
import PageScrollTop from "./components/commons/PageScrollTop";
import MetaTag from "./components/commons/MetaTag";

const {
  HOME_PATH,
  STUDY_LIST_PATH,
  DETAIL_PATH,
  EDIT_PATH,
  RECRUIT_PATH,
  REVIEW_PATH,
  SCOUT,
  MY_PAGE,
  MY_STUDY,
  MANAGE,
  GOOGLE_REDIRECT,
  GITHUB_REDIRECT,
  KAKAO_REDIRECT,
} = ROUTER_PATH;

const PageRouter = () => {
  return (
    <>
      <MetaTag title="CO-KKIRI - 스카우트 기반 모집 플랫폼" />
      <Router>
        <AuthListener />
        <PageScrollTop />
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route path={HOME_PATH} element={<Home />} />
            <Route path={STUDY_LIST_PATH} element={<StudyList />} />
            <Route path={DETAIL_PATH} element={<Detail />} />
            <Route path={EDIT_PATH} element={<Edit />} />
            <Route path={RECRUIT_PATH} element={<Recruit />} />
            <Route path={REVIEW_PATH} element={<Review />} />
            <Route path={SCOUT} element={<Scout />} />
            <Route path={MY_PAGE} element={<MyPage />} />
            <Route path={MY_STUDY} element={<MyStudy />} />
            <Route path={MANAGE} element={<Manage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path={GOOGLE_REDIRECT} element={<GoogleAuth />} />
          <Route path={GITHUB_REDIRECT} element={<GithubAuth />} />
          <Route path={KAKAO_REDIRECT} element={<KakaoAuth />} />
        </Routes>
      </Router>
    </>
  );
};
export default PageRouter;
