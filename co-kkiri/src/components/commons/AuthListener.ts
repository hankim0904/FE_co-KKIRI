import { useEffect } from "react";
import { googleLogin } from "@/lib/api/auth";
import useAuthModalToggleStore from "@/stores/authModalToggle";
import { useUserInfoStore } from "@/stores/userInfoStore";
import { useNavigate } from "react-router-dom";

const AuthListener = () => {
  const setIsAuthModalOpen = useAuthModalToggleStore((state) => state.setIsAuthModalOpen);
  const fetchUserInfo = useUserInfoStore((state) => state.fetchUserInfo);
  const navigate = useNavigate();

  const getAccessToken = async (code: string) => {
    const response = await googleLogin(code);
    // console.log(response); 리스폰스 확인용
  };

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.data && event.data.type === "OAuthSuccess") {
        await getAccessToken(event.data.code);
        await fetchUserInfo();
        setIsAuthModalOpen(false);
        navigate(0);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [fetchUserInfo, setIsAuthModalOpen]);

  return null;
};

export default AuthListener;
function googleLogins() {
  throw new Error("Function not implemented.");
}
