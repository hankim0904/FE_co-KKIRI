import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";

import useResponsiveSidebar from "@/hooks/useResponsiveSideBar";
import { BannerImage } from "@/constants/banners";

interface BannerProps {
  image: BannerImage;
  path: string;
  onClick?: () => void;
}

export default function Banner({ image, path, onClick }: BannerProps) {
  const isSidebarOpenNarrow = useResponsiveSidebar();

  return (
    <Link to={path}>
      <AnimatedBackground $image={image}>
        <Background
          $isSidebarOpenNarrow={isSidebarOpenNarrow}
          onClick={onClick}
          $image={image}
          aria-label={image.desktopWide.alt}></Background>
      </AnimatedBackground>
    </Link>
  );
}

const {
  mediaQueries: { tablet, mobile },
} = DESIGN_TOKEN;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const AnimatedBackground = styled.div<{ $image: BannerImage }>`
  animation: ${fadeIn} 0.5s ease-out;
  background-image: ${({ $image }) => `url(${$image.desktopWide.src})`};
  background-size: cover;
  background-position: center;
  border-radius: 2rem;
`;

const Background = styled.figure<{ $isSidebarOpenNarrow: boolean; $image: BannerImage }>`
  border-radius: 2rem;
  width: ${({ $isSidebarOpenNarrow }) => ($isSidebarOpenNarrow ? 29 : 36)}rem;
  height: 24rem;
  background-image: ${({ $isSidebarOpenNarrow, $image }) =>
    $isSidebarOpenNarrow ? `url(${$image.desktopNarrow.src})` : `url(${$image.desktopWide.src})`};
  background-size: cover;
  background-position: center;

  ${tablet} {
    background-image: url(${({ $image }) => $image.tablet.src});
    width: 22.6rem;
    height: 22.6rem;
  }

  ${mobile} {
    background-image: url(${({ $image }) => $image.mobile.src});
    max-width: 22.6rem;
    width: 100%;
    height: 100%;
    &::after {
      content: "";
      display: block;
      padding-bottom: 100%;
    }
  }
`;
