import styled from "styled-components";
import { ICONS } from "@/constants/icons";
import useOpenToggle from "@/hooks/useOpenToggle";
import { useToast } from "@/hooks/useToast";
import SharePopover from "./SharePopover";
import TOAST from "@/constants/toast";
import copyUrl from "@/utils/copyUrl";
import shareKakao from "@/utils/shareKakao";
import { KakaoShareInfo } from "./ShareAndScrap";

interface ShareProps {
  kakaoShareInfo: KakaoShareInfo;
}

const { copyLink } = TOAST;

export default function Share({ kakaoShareInfo }: ShareProps) {
  const { share } = ICONS;
  const { isOpen, openToggle, ref } = useOpenToggle();
  const pushToast = useToast();

  const { title, name, postType } = kakaoShareInfo;

  const handleShare = (type: string) => {
    switch (type) {
      case "URL":
        copyUrl().then(() => {
          pushToast(copyLink.message, copyLink.type);
        });
        break;
      case "KAKAO":
        shareKakao(title, name, postType);
        break;
    }
  };

  return (
    <Container ref={ref}>
      <Box onClick={openToggle}>
        <Icon src={share.src} alt={share.alt} />
      </Box>
      {isOpen && <SharePopover handleShare={handleShare} />}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const Box = styled.button`
  width: 4.2rem;
  height: 4.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  width: 2.2rem;
  height: 2.5rem;
`;
