import { useState } from "react";
import UserProfileModal from "@/components/modals/UserProfileModal/";

export default function ModalTestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const userInfo = {
    profileImg: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    position: [{ name: "프론트엔드" }, { name: "백엔드" }],
    nickname: "123",
    career: 2,
    stack: [
      { name: "react", img: "https://simpleicons.org/icons/react.svg" },
      { name: "next.js", img: "https://simpleicons.org/icons/nextdotjs.svg" },
    ],
    introduce: "잘 부탁드립니다.",
    link: ["https://www.youtube.com"],
  };

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      {isModalOpen && (
        <UserProfileModal
          profileImg={userInfo.profileImg}
          position={userInfo.position}
          nickname={userInfo.nickname}
          career={userInfo.career}
          stack={userInfo.stack}
          introduce={userInfo.introduce}
          link={userInfo.link}
        />
      )}
    </>
  );
}