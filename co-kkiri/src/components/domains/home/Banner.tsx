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
      <AnimatedPicture $isSidebarOpenNarrow={isSidebarOpenNarrow}>
        <picture>
          <source media="(max-width: 767px)" srcSet={image.mobile.src} />
          <source media="(max-width: 1199px)" srcSet={image.tablet.src} />
          {isSidebarOpenNarrow ? (
            <source media="(min-width: 1024px)" srcSet={image.desktopNarrow.src} />
          ) : (
            <source media="(min-width: 1024px)" srcSet={image.desktopWide.src} />
          )}
          <img
            src={image.desktopWide.src}
            alt={image.desktopWide.alt}
            onClick={onClick}
            aria-label={image.desktopWide.alt}
          />
        </picture>
      </AnimatedPicture>
    </Link>
  );
}

const {
  mediaQueries: { mobile },
} = DESIGN_TOKEN;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const AnimatedPicture = styled.div<{ $isSidebarOpenNarrow: boolean }>`
  animation: ${fadeIn} 0.5s ease-in-out;

  ${mobile} {
    max-width: 22.6rem;
    width: 100%;
    img {
      width: 100%;
      height: auto;
    }
  }
`;
