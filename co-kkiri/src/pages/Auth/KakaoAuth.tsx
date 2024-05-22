import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function KakaoAuth() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    const message = { type: "kakaoOAuthSuccess", code: code };
    window.opener.postMessage(message, import.meta.env.VITE_APP_URL);
    window.close();
  });

  return null;
}
