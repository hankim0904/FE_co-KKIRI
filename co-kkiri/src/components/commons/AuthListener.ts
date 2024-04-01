import { useCallback, useEffect } from "react";
import { githubLogin, googleLogin } from "@/lib/api/auth";
import useAuthModalToggleStore from "@/stores/authModalToggle";
import { useUserInfoStore } from "@/stores/userInfoStore";
import { useQueryClient } from "@tanstack/react-query";

const AuthListener = () => {
  const setIsAuthModalOpen = useAuthModalToggleStore((state) => state.setIsAuthModalOpen);
  const fetchUserInfo = useUserInfoStore((state) => state.fetchUserInfo);
  const queryClient = useQueryClient();

  const getGoogleAccessToken = async (code: string) => {
    await googleLogin(code);
  };

  const getGithubAccessToken = async (code: string) => {
    await githubLogin(code);
  };

  const updateUserInfo = useCallback(async () => {
    await fetchUserInfo();
    setIsAuthModalOpen(false);
    queryClient.invalidateQueries();
  }, [fetchUserInfo, queryClient, setIsAuthModalOpen]);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.data && event.data.type === "googleOAuthSuccess") {
        await getGoogleAccessToken(event.data.code);
        await updateUserInfo();
      } else if (event.data && event.data.type === "githubOAuthSuccess") {
        await getGithubAccessToken(event.data.code);
        await updateUserInfo();
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [fetchUserInfo, setIsAuthModalOpen, updateUserInfo]);

  return null;
};

export default AuthListener;
function googleLogins() {
  throw new Error("Function not implemented.");
}
