import styled from "styled-components";
import Share from "@/components/domains/detail/Share";
import CardCornerButton from "@/components/commons/CardCornerButton";

export type KakaoShareInfo = {
  [key: string]: string;
};

interface ShareAndScrapProps {
  isScraped: boolean;
  className?: string;
  postId: number;
  kakaoShareInfo: KakaoShareInfo;
}

export default function ShareAndScrap({ isScraped, className, postId, kakaoShareInfo }: ShareAndScrapProps) {
  return (
    <Container className={className}>
      <Share kakaoShareInfo={kakaoShareInfo} />
      <ScrapSection isScraped={isScraped} postId={postId}/>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const ScrapSection = styled(CardCornerButton)`
  img {
    width: 4.2rem;
  }
`;
