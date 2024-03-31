const shareKakao = (title: string, name: string, postType: string) => {
  const url = window.location.href;

  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.cleanup();
      kakao.init(`${import.meta.env.VITE_KAKAO_JS_KEY}`);
    }
    kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `${title}`,
        description: `${name}님과 ${postType}를 함께 해보세요!`,
        imageUrl: "https://co-kkiri-image.s3.ap-northeast-2.amazonaws.com/8689954.11557396.png",

        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: "자세히 보러 가기",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  }
};

export default shareKakao;
