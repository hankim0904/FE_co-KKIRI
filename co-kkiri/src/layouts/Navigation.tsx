import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { useWindowSize } from "usehooks-ts";
import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";

import Gnb from "@/components/commons/Gnb";
import SideBar from "@/components/commons/SideBar";
import useSideBarStore from "@/stores/sideBarStore";
import { slideIn, slideOut } from "@/utils/animation";

export default function Navigation() {
  const isSideBarOpen = useSideBarStore((state) => state.isSideBarOpen);
  const toggleSideBar = useSideBarStore((state) => state.toggleSideBar);
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);

  const { width: screenWidth } = useWindowSize();
  const isTabletOrMobile = screenWidth < 1200;

  const handleSideBar = () => {
    if (!isSideBarOpen) setIsSideBarVisible(true);
    toggleSideBar();
  };

  useEffect(() => {
    if (!isSideBarOpen && !isTabletOrMobile) {
      const timer = setTimeout(() => {
        setIsSideBarVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    } else if (!isSideBarOpen && isTabletOrMobile) {
      setIsSideBarVisible(false);
    }
  }, [isSideBarOpen, isTabletOrMobile]);

  return (
    <>
      <Gnb onSideBarClick={handleSideBar} />
      {isSideBarVisible && (
        <SideBarWrapper $isOpen={isSideBarOpen}>
          {isTabletOrMobile && <SideBar onClick={handleSideBar} onClose={handleSideBar} />}
          {!isTabletOrMobile && <SideBar onClose={() => {}} />}
        </SideBarWrapper>
      )}
      <OutletWrapper $isOpen={isSideBarOpen}>
        <Outlet />
      </OutletWrapper>
    </>
  );
}

const { mediaQueries, zIndex } = DESIGN_TOKEN;

interface SideBarWrapperProps {
  $isOpen: boolean;
}

const SideBarWrapper = styled.div<SideBarWrapperProps>`
  ${zIndex.modal}
  position: fixed;
  animation: ${(props) => (props.$isOpen ? slideIn : slideOut)} 0.5s forwards;
  height: 100%;
`;

const OutletWrapper = styled.div<{ $isOpen: boolean }>`
  padding-left: ${(props) => (props.$isOpen ? "21rem" : 0)};

  ${mediaQueries.tablet} {
    padding-left: 0;
  }
`;
